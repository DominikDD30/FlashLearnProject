import axios, { AxiosResponse } from "axios";
import { FlashcardBuilder } from "../entities/FlashcardBuilder";
import { QuizItemBuilder } from "../entities/QuizItemBuilder";
import FlashcardsSet from "../entities/FlashcardsSet";
import { FlashcardSetGroupedByDate } from "../entities/FlashcardSetGroupedByDate";
import QuizSet from "../entities/QuizSet";
import { SharedSet } from "../entities/SharedSet";
import TranslateResponse from "../entities/TranslateResponse";

export const axiosInstance= axios.create({
     baseURL: "http://localhost:8190/flash-learn",
  });

  class ApiClient{
    endpoint:string;

    constructor(endpoint:string){
        this.endpoint=endpoint;
      }



    createFlashcards=(ownerId:number,setName:string,flashcards:FlashcardBuilder[])=>{
      const token=localStorage.getItem('token');
        axiosInstance.post(this.endpoint+'/flashcards',{
       ownerId:ownerId,setName:setName,flashcards:flashcards},
       {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        }
      })
    }

    createQuiz=(ownerId:number,setName:string,quizItems:QuizItemBuilder[])=>{
      const token=localStorage.getItem('token');
        axiosInstance.post(this.endpoint+'/quiz',{
          ownerId:ownerId,setName:setName,quizItems:quizItems
        },{
          headers: {
            Authorization: `Bearer $n{token}`, 
            'Content-Type': 'application/json',
          }
      })
    }
    getImagesForFlashcards = async (flashcards: string[], n: number): Promise<AxiosResponse<FlashcardBuilder[]>> => {
      const token = localStorage.getItem('token');
      try {
        return await axiosInstance.post<FlashcardBuilder[]>(this.endpoint, { flashcards: flashcards }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
      } catch (err) {
        if (n === 1) throw err;
        return await this.getImagesForFlashcards(flashcards, n - 1);
      }
    };
    getSetsForUser=(userId:number)=>{
      const token=localStorage.getItem('token');
      return axiosInstance.get<FlashcardSetGroupedByDate[]>(this.endpoint+`/user/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        }
      })
      .then(res=>res.data);
    }
    getQuizListForUser=(userId:number)=>{
      const token=localStorage.getItem('token');
      return axiosInstance.get<QuizSet[]>(this.endpoint+`/user/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        }
      })
      .then(res=>res.data);
    }

    getFlashcardSet=(setId:number)=>{
      const token=localStorage.getItem('token');
      return axiosInstance.get<FlashcardsSet>(this.endpoint+`/${setId}`,{
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        }
      })
      .then(res=>res.data);
    }

    findSetByShareCode=(shareCode:string)=>{
      const token=localStorage.getItem('token');
      return axiosInstance.get<SharedSet>(this.endpoint+`/${shareCode}`,{
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        }
      })
      .then(res=>res.data);
    }

    generateQuizzes=(file:File)=>{
      const token=localStorage.getItem('token');
      const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post<QuizItemBuilder[]>(this.endpoint+'/quiz', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>res.data);
    }

    ocrFile=(file:File)=>{
      const token=localStorage.getItem('token');
      const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post<string>(this.endpoint+'/ocr', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(res=>res.data);
    } 
    
    generateFlashcards=(text:string,conceptDefinitionSeparator:string,flashcardSeparator:string)=>{
      const token=localStorage.getItem('token');
      return axiosInstance.get<FlashcardBuilder[]>(this.endpoint+'/flashcard',{
      params:{text:text,xSep:conceptDefinitionSeparator,ySep:flashcardSeparator},
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        }}
)
      .then(res=>res.data);
    }

    deleteFlashcardsSet=(setId:number)=>{
      const token=localStorage.getItem('token');
      axiosInstance.delete(this.endpoint+`/${setId}`,{
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        }
      });
    }

    deleteQuizSet=(setId:number)=>{
      const token=localStorage.getItem('token');
      axiosInstance.delete(this.endpoint+`/${setId}`,{
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        }
      });
    }

    updateFlashcardsSet=(setId:number,setName:string,flashcards:FlashcardBuilder[])=>{
      const token=localStorage.getItem('token');
      return axiosInstance.put(this.endpoint+`/${setId}`,{
        setName:setName,flashcards:flashcards
      },
        {
          headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        }}
      )
    }

    updateSet=(setId:number,ownerId:number,setName:string,quizItems:QuizItemBuilder[])=>{
      const token=localStorage.getItem('token');
      return axiosInstance.put(this.endpoint+`/${setId}`,{
        setName:setName,ownerId:ownerId,quizItems:quizItems},
        {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        }
      })
    }


    updateLastTimeUsed=(setId:number)=>{
      const token=localStorage.getItem('token');
      axiosInstance.patch(this.endpoint+`/${setId}/updateLastTimeUsed`,{},
        {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        }
    })
  }


  }



  export default ApiClient;