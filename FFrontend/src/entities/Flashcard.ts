export interface Flashcard{
    id:number;
    concept:string;
    definition:string;
    image?:string;
    sound?:Uint8Array;
}