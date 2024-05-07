import FlashcardsSet from "./FlashcardsSet";

export interface FlashcardSetGroupedByDate{
    date:string;
    setsList:FlashcardsSet[];
}