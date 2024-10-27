import { QuestionBuilder } from "./QuestionBuilder";

export default interface Quiz{
    quizId:number;
    ownerId:number;
    setName:string;
    shareCode:string;
    questionDTOS:QuestionBuilder[];
    questionsAmount:number;
}