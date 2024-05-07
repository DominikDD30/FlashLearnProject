import { create } from "zustand";
import { FlashcardBuilder } from "./entities/FlashcardBuilder";
import { QuizItemBuilder } from "./entities/QuizItemBuilder";
interface CreatorStore{
    flashcards:FlashcardBuilder[];
    quizItems:QuizItemBuilder[];
    setName?:string;
    isUpdating:boolean;
    _tempId:number;
    addNewEmptyFlashcard:()=>void;
    deleteFlashcard:(concept:string)=>void;
    addNewEmptyQuizItem:()=>void;
    removeQuizItem:(quizId:number)=>void;
    setSetName:(setName:string)=>void;
    updateQuizItem:(updatedQuizItem:QuizItemBuilder)=>void;
    setFlashcards:(flashcards:FlashcardBuilder[])=>void;
    setQuizItems:(quizItems:QuizItemBuilder[])=>void;
    setisUpdating:(isUpdating:boolean)=>void;
    reset:()=>void;
  }


  const useCreatorStore=create<CreatorStore>(set=>({
    flashcards:[],
    isUpdating:false,
    _tempId:0,
    // flashcards:[{id:1,concept:"",definition:"",image:""},{id:2,concept:"",definition:"",image:""}],
    quizItems:[{id:1,question:'',answers:[{id:1,value:'',isCorrect:false},{id:2,value:'',isCorrect:false}]},
    {id:2,question:'',answers:[{id:1,value:'',isCorrect:false},{id:2,value:'',isCorrect:false}]}],
    addNewEmptyFlashcard:()=>
      set((store)=>({
        // flashcards: store.flashcards.length === 0
        // ? [{ concept: "", definition: "", image: "" }]
        // : [...store.flashcards, { concept: "", definition: "", image: "" }]
      flashcards:[...store.flashcards, { concept: "",tempId:store._tempId, definition: "", image: "" }],
      _tempId:store._tempId+=1
      })),
        setSetName:(setName)=>set(()=>({setName:setName})),
    setFlashcards:(flashcards)=>set(()=>({flashcards:flashcards})),
    setisUpdating:(isUpdating)=>set(()=>({isUpdating:isUpdating})),
    setQuizItems:(quizItems)=>set(()=>({quizItems:quizItems})),
    addNewEmptyQuizItem:()=>set((store)=>({quizItems:[...store.quizItems,
          {id:store.quizItems.length+1,question:'',
          answers:[{id:1,value:'',isCorrect:false},{id:2,value:'',isCorrect:false}]}]})),
    removeQuizItem:(quizId)=>set((store)=>({quizItems:[...store.quizItems.filter(quiz=>quiz.id!=quizId)]})),
    deleteFlashcard:(concept)=>set((store)=>({flashcards:[...store.flashcards.filter(flashcard=>flashcard.concept!=concept)]})),
    // deleteFlashcard:(id,concept)=>set((store)=>({flashcards:[...store.flashcards.filter(flashcard=>flashcard.id!=id&&flashcard.concept!=concept)]})),
    updateQuizItem: (updatedQuizItem) => set((store) => {
          const updatedQuizItems = store.quizItems.map((quiz) => (quiz.id !== updatedQuizItem.id ? quiz : updatedQuizItem));
          return {
            ...store,
            quizItems: updatedQuizItems,
          };
        }),
      reset:()=>set(()=>({flashcards:[],quizItems:[],_tempId:0,setName:undefined,isUpdating:false}))
}));

export default useCreatorStore;