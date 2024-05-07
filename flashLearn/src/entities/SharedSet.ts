import FlashcardsSet from "./FlashcardsSet";
import QuizSet from "./QuizSet";

export interface SharedSet {
    flashcardsSet:boolean;
    owner:string;
    flashcardsSetDTO:FlashcardsSet;
    quizSetDTO:QuizSet;
}