import axios, { AxiosResponse } from "axios";
import { FlashcardBuilder } from "../entities/FlashcardBuilder";
import { QuestionBuilder } from "../entities/QuestionBuilder";
import FlashcardsSet from "../entities/FlashcardsSet";
import { FlashcardSetGroupedByDate } from "../entities/FlashcardSetGroupedByDate";
import Quiz from "../entities/Quiz";
import { SharedSet } from "../entities/SharedSet";

export const axiosInstance= axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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

    createQuiz=(ownerId:number,setName:string,questions:QuestionBuilder[])=>{
      const token=localStorage.getItem('token');
        axiosInstance.post(this.endpoint+'/quiz',{
          ownerId:ownerId,setName:setName,questionDTOS:questions
        },{
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          }
      })
    }
   
    getImagesForFlashcards = async (flashcards: string[],language:string, n: number): Promise<AxiosResponse<FlashcardBuilder[]>> => {
      const token = localStorage.getItem('token');
      try {
        return await axiosInstance.post<FlashcardBuilder[]>(this.endpoint, { flashcards: flashcards,language:language }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
      } catch (err) {
        if (n === 1) throw err;
        return await this.getImagesForFlashcards(flashcards,language, n - 1);
      }
    };

    getImagesForFlashcardsPredictLang = async (flashcards: string[], n: number): Promise<AxiosResponse<FlashcardBuilder[]>> => {
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
        return await this.getImagesForFlashcardsPredictLang(flashcards, n - 1);
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
      return axiosInstance.get<Quiz[]>(this.endpoint+`/user/${userId}`,{
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

    getQuiz=(setId:number)=>{
      const token=localStorage.getItem('token');
      return axiosInstance.get<Quiz>(this.endpoint+`/${setId}`,{
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

    updateSet=(setId:number,ownerId:number,setName:string,questions:QuestionBuilder[])=>{
      const token=localStorage.getItem('token');
      return axiosInstance.put(this.endpoint+`/${setId}`,{
        setName:setName,ownerId:ownerId,questionDTOS:questions},
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