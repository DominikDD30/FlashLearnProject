import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import Creator from "./pages/Creator";
import Flashcards from "./pages/Flashcards";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import GameCreator from "./pages/GameCreator";
import Game from "./pages/Game";
import EditQuiz from "./pages/EditQuiz";
import EditFlashcards from "./pages/EditFlashcards";
import FlashcardLearn from "./pages/FlashcardLearn";
import QuizLearn from "./pages/QuizLearn";
import SoloGame from "./pages/SoloGame";
import QuizList from "./pages/QuizList";
import ShareComponent from "./components/ShareComponent";
import MainPage from "./pages/MainPage";
import JoinGamePanel from "./components/game/JoinGamePanel";


const router =createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {path:'',element:<MainPage/>},
            {path:'create',element:<Creator/>},
            {path:'flashcards',element:<Flashcards/>},
            {path:'quiz-list',element:<QuizList/>},
            {path:'editQuiz/:setId',element:<EditQuiz/>},
            {path:'editFlashcards/:setId',element:<EditFlashcards/>},
            {path:'login',element:<LoginForm/>},
            {path:'register',element:<RegisterForm/>},
            {path:'share/:shareCode',element:<ShareComponent/>}
        ]
    },
    {
        path:'/learn',
        // element:<App/>,
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