import axios from "axios";
import { FlashcardBuilder } from "../entities/FlashcardBuilder";
import { QuestionBuilder } from "../entities/QuestionBuilder";
import { QuizItemBuilder } from "../entities/QuizItemBuilder";

export const axiosInstance= axios.create({
  baseURL: import.meta.env.VITE_GENERATION_SERVICE_URL,
  });

  class GenerationService{
    endpoint:string;

    constructor(endpoint:string){
        this.endpoint=endpoint;
      }

    
    generateQuizzesFromFile=(file:File)=>{
      const token=localStorage.getItem('token');
      const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post<{data:QuestionBuilder[]}>(this.endpoint+'/quiz', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>res.data);
    }

    generateFlashcardsFromFile=(file:File,lang_source:string,lang_target:string)=>{
      const token=localStorage.getItem('token');
      const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post<{data:FlashcardBuilder[]}>(this.endpoint+'/flashcards', formData, {
      params:{lang_source:lang_source,lang_target:lang_target},
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>res.data);
    }
    
    generateFlashcardsFromText = (text: string, lang_source: string, lang_target: string) => {
      const token = localStorage.getItem('token');
      return axiosInstance.post<{data:FlashcardBuilder[]}>(
        this.endpoint + '/flashcards/plain-text',
        { text: text }, 
        {
          params: { lang_source, lang_target },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      ).then(res => res.data);
    };
    

   

  }



  export default GenerationService;