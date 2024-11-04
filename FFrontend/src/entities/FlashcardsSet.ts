import { Flashcard } from "./Flashcard";

export default interface FlashcardsSet{
    id:number;
    ownerId:number;
    setName:string;
    shareCode:string;
    flashcards:Flashcard[];
    flashcardsAmount:number;
    lastTimeUsed:string;
}