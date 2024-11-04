# Flashcard ![Flashcard Logo](logo.png)

part of an engineering project

Flashcard is an application that allows users to create and learn flashcards and quizzes in an efficient way.


## Visit Website  https://flashlearnproject.netlify.app/
i recommend to sign in as predefined user but you can create new account as well 

login: user

password: user

## IMPORTANT!
. Backend server currently not deployed ,only memory games are available




## Features

- **Flashcard Creation:** Ability to create custom flashcards with images.
- **Flashcard Learning:** Study mode allowing users to browse flashcards.
- **Entertaiment**  Play memory games based on user sets. (set must contain at least 6 flashcards)
- **Quizzes:** Ability to create and solve quizzes 
- **Generating:** Ability to

  -> generating flashcards from files or from plain text
  
  -> generating images for flashcards
  
  -> generating complete Quizes from provided pdf file
  

## Installation

1. Clone the repository
2. create database flash_learn
3. run backend server
4. run python generating server 
5. Navigate to frontend project directory 
6. Install required dependencies: `npm install`
7. Start frontend application: `npm run dev`
8. go to http://localhost:5174
   
## Docker Installation

1. open FlashLearnproject folder in cmd
2. type 'docker compose up'
3. go to http://localhost:5174

## API Keys
application use external api providers. 

  -pexel for generating images
  -deepl for auto translating
  
Complete apikeys in application.yml to use this generating features,

## Technologies Used

- **Java with Spring:**  used for backend REST server development.
- **Python with FastApi:**  backend server based on Ai LLM.
- **React:** JavaScript library used for frontend development.
- **Postgres:** Database used for storing  users data.




## License

This project is licensed under the Apache License, Version 2.0. Note that the current ownership of this project lies with the Silesian University of Technology as part of an engineering project.


