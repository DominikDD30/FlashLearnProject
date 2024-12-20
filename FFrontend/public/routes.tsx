import { createBrowserRouter } from "react-router-dom";
import App from "../src/pages/App";
import Creator from "../src/pages/Creator";
import Flashcards from "../src/pages/Flashcards";
import LoginForm from "../src/components/auth/LoginForm";
import RegisterForm from "../src/components/auth/RegisterForm";
import GameCreator from "../src/pages/gamePage/GameCreator";
import Game from "../src/pages/gamePage/Game";
import EditQuiz from "../src/pages/EditQuiz";
import EditFlashcards from "../src/pages/EditFlashcards";
import FlashcardLearn from "../src/pages/FlashcardLearn";
import SoloGame from "../src/pages/gamePage/SoloGame";
import QuizLearn from "../src/pages/QuizLearn";
import ShareComponent from "../src/components/ShareComponent";
import MainPage from "../src/pages/MainPage";
import JoinGamePanel from "../src/components/game/JoinGamePanel";


const router =createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {path:'',element:<MainPage/>},
            {path:'create',element:<Creator/>},
            {path:'flashcards',element:<Flashcards/>},
            {path:'editQuiz/:setId',element:<EditQuiz/>},
            {path:'editFlashcards/:setId',element:<EditFlashcards/>},
            {path:'login',element:<LoginForm/>},
            {path:'register',element:<RegisterForm/>},
            {path:'share/:shareCode',element:<ShareComponent/>},
            {path:'quiz-learn',element:<QuizLearn/>},
        ]
    },
    {
        path:'/learn',
        children:[
            {path:'flashcard/:setId',element:<FlashcardLearn/>},
           
        ]
    },
    {
        path:'game/creator/:setId/:setSize',
        element:<GameCreator/>
    },
    {
        path:'game/solo',
        element:<SoloGame/>
    },
    
    {
        path:'game/join/:uid',
        element:<JoinGamePanel/>
    },
    {
        path:'game/:uid',
        element:<Game/>
    }
]);

export default router;