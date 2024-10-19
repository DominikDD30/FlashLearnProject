import { QuestionBuilder } from "./QuestionBuilder";

export default interface Quiz{
    quizId:number;
    ownerId:number;
    setName:string;
    shareCode:string;
    questions:QuestionBuilder[];
    questionsAmount:number;
}