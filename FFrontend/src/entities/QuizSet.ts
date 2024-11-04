import { QuizItemBuilder } from "./QuizItemBuilder";

export default interface QuizSet{
    setId:number;
    ownerId:number;
    setName:string;
    shareCode:string;
    quizItems:QuizItemBuilder[];
    questionsAmount:number;
}