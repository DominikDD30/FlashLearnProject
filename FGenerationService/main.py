import json
import os
import re
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from PyPDF2 import PdfReader
from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:5174",  # Dodaj tutaj swoje dozwolone domeny
    "http://flashlearn.127.0.0.1.nip.io",
    # Dodaj inne pochodzenia, z których chcesz zezwolić na żądania
]

# Konfiguracja CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Pozwala na żądania z określonych pochodzeń
    allow_credentials=True,
    allow_methods=["*"],  # Pozwala na wszystkie metody (GET, POST itp.)
    allow_headers=["*"],  # Pozwala na wszystkie nagłówki
)


genai.configure(api_key=os.getenv("GENAI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")


class TextInput(BaseModel):
    text: str


@app.get("/")
async def root():
    return {"status": "running"}


@app.post("/generate/quiz/plain-text")
async def generate_quiz_from_plain_text(input: TextInput):
    text = input.text
    quiz_data = await generate_model_content(text, prompt_type="quiz")
    return {"data": quiz_data}


@app.post("/generate/flashcards/plain-text")
async def generate_flashcards_from_plain_text(
        input: TextInput,
        lang_source: str = Query(..., description="Source language code"),
        lang_target: str = Query(..., description="Target language code")
):
    text = input.text
    flashcards_data = await generate_model_content(
        text, prompt_type="flashcard",lang_source=lang_source,lang_target=lang_target)
    return {"data": flashcards_data}


@app.post("/generate/quiz")
async def generate_quiz(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF file.")

    try:
        full_text = extract_text_from_pdf(file)
        if not full_text.strip():
            raise HTTPException(status_code=400, detail="No text found in the PDF. It may be an image-based file.")

        quiz_data = await generate_model_content(full_text, prompt_type="quiz")
        return {"data": quiz_data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")


@app.post("/generate/flashcards")
async def generate_flashcards(
        file: UploadFile = File(...),
        lang_source: str = Query(..., description="Source language code"),
        lang_target: str = Query(..., description="Target language code")
):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF file.")

    try:
        full_text = extract_text_from_pdf(file)
        if not full_text.strip():
            raise HTTPException(status_code=400, detail="No text found in the PDF. It may be an image-based file.")

        flashcards_data = await generate_model_content(full_text, prompt_type="flashcard", lang_source=lang_source,
                                                       lang_target=lang_target)
        return {"data": flashcards_data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")


def extract_text_from_pdf(file: UploadFile) -> str:
    pdf_content = file.file.read()
    pdf_path = BytesIO(pdf_content)
    reader = PdfReader(pdf_path)
    return "".join(page.extract_text() or "" for page in reader.pages)


def parse_json_from_model_response(response_text: str) -> list:
    match = re.search(r'(\[.*\])', response_text, re.DOTALL)
    if match:
        return json.loads(match.group(1))
    raise ValueError("No valid JSON found in model response.")


async def generate_model_content(full_text: str, prompt_type: str, lang_source: str = None,
                                 lang_target: str = None) -> list:
    """Generate content using the AI model based on the prompt type and language."""
    if prompt_type == "quiz":
        prompt = (
            f"{full_text} Based on this text, create an array of quizzes (try to adjust bool values to your opinion) in the following JSON format: "
            """[
                {
                    "id": 1,
                    "question": "Example question?",
                    "answers": [
                        {"id": 1, value": "Answer 1", "isCorrect": true},
                        {"id": 2, "value": "Answer 2", "isCorrect": false}
                    ]
                },
                {
                    "id": 2,
                    "question": "Another question?",
                    "answers": [
                        {"id": 1, "value": "Answer A", "isCorrect": false},
                        {"id": 2,  "value": "Answer B", "isCorrect": true}
                    ]
                }
            ]"""
        )
    elif prompt_type == "flashcard" and lang_source and lang_target:
        prompt = (
            f"{full_text} Based on this text, create flashcards with concepts in language: {lang_source} and definitions in language: {lang_target} in the following JSON format: "
            """[
                {
                    "id": 1,
                    "concept": "fish",
                    "definition": "ryba"
                },
                {
                    "id": 2,
                    "concept": "another concept",
                    "definition": "translated definition"
                }
            ]"""
        )
    else:
        raise ValueError("Invalid prompt type or missing language parameters for flashcard generation.")

    result = await model.generate_content_async(prompt)
    return parse_json_from_model_response(result.candidates[0].content.parts[0].text)
