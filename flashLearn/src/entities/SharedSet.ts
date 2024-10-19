import FlashcardsSet from "./FlashcardsSet";
import Quiz from "./Quiz";

export interface SharedSet {
    flashcardsSet:boolean;
    owner:string;
    flashcardsSetDTO:FlashcardsSet;
    quizSetDTO:Quiz;
}