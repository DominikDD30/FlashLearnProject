export interface QuestionBuilder{
    id:number;
    question:string;
    answers:Answear[];
}

export interface Answear{
    id:number
    value:string;
    isCorrect:boolean;
}