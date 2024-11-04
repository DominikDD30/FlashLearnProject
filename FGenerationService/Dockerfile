# Użycie oficjalnego obrazu Python 3.9 jako bazowego
FROM python:3.9

# Ustawienie katalogu roboczego w kontenerze
WORKDIR /app

# Kopiowanie pliku requirements.txt i instalacja zależności
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopiowanie całej aplikacji do katalogu roboczego
COPY . .


ENV GENAI_API_KEY=AIzaSyALVQ7UyhVw74mA1gIRz0Cfi2D_XaoURtE
# Otwarcie portu 8000 (domyślny dla FastAPI)
EXPOSE 8000

# Komenda uruchamiająca aplikację
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
