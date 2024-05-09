# Flashcard ![Flashcard Logo](logo.png)

part of an engineering project

Flashcard is an application that allows users to create and learn flashcards and quizzes in an efficient way.


## Visit Website  https://flashlearnproject.netlify.app/
you can use predefined user to sign in

login: testowy

password: testowy

#### ! i am using free tier so first request to backend might take  longer because application sleep when innactive , generating quizzes from pdf work wery slowly so i recommend  to process very small files





## Features

- **Flashcard Creation:** Ability to create custom flashcards with images.
- **Flashcard Learning:** Study mode allowing users to browse flashcards.
- **Entertaiment**  Play memory games based on user sets. (set must contain at least 6 flashcards)
- **Quizzes:** Ability to create and solve quizzes 
- **Generating:** Ability to
  
  -> generating images for flashcards
  
  -> generating sounds for flashcards
  
  -> generating complete Quizes from provided pdf file
  
  currently support numerated questions and false,true answers or numerated questions and a,b,c,d answers

## Installation

1. Clone the repository
2. create database flash_learn
3. run backend server
4. Navigate to frontend project directory 
5. Install required dependencies: `npm install`
6. Start frontend application: `npm run dev`
7. go to http://localhost:5174
   
## Docker Installation

1. open FlashLearn folder in cmd
2. type 'docker compose up'
3. go to http://localhost:5174

## Important
application use external api providers. 

  -pexel for generating images
  
  -elevenlabs for generating sound
  
Complete apikeys in application.yml to use this generating features,

Generating quizes won't work without Tesseract engine (included in dockerfile)
- https://github.com/tesseract-ocr/tesseract
  

## Technologies Used

- **Java and Spring:**  used for backend REST server development.
- **React:** JavaScript library used for frontend development.
- **Postgres:** Database used for storing  users data.
- **Tesseract :** OCR engine


## Contribution

If you want to contribute to the project, feel free to do so! You can report bugs, suggest new features, or fix existing issues. All contributions are welcome.



## License

This project is licensed under the Apache License, Version 2.0. Note that the current ownership of this project lies with the Silesian University of Technology as part of an engineering project.


