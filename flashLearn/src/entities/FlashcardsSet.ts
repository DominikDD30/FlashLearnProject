import { Flashcard } from "./Flashcard";
import { FlashcardBuilder } from "./FlashcardBuilder";

export default interface FlashcardsSet{
    id:number;
    ownerId:number;
    setName:string;
    shareCode:string;
    flashcards:Flashcard[];
    flashcardsAmount:number;
    lastTimeUsed:string;
}