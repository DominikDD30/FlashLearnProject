import axios from "axios";
import { FlashcardSetGroupedByDate } from "../entities/FlashcardSetGroupedByDate";
import { CardWithPosition } from "../components/game/GameEntity";

export interface CreateRoomResponse {
  gameId:string;
joinCode:string;
playerId:string;
secondPlayerId:string;
}

export const axiosInstance= axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL+'/game',
  });

  class ApiGameClient{
    endpoint:string;

    constructor(){
        this.endpoint='';
      }

    createRoom=(setId:number,pairs:number)=>{
      console.log(setId,pairs)
       return axiosInstance.post<CreateRoomResponse>(this.endpoint,{setId:setId,pairs:pairs},{})
       .then(res=>res.data);
    }
   
    getSetsForUser=(userId:number)=>{
      return axiosInstance.get<FlashcardSetGroupedByDate[]>(this.endpoint+`/${userId}`,{})
      .then(res=>res.data);
    }

    createSoloGame=(setId:number,dificulity:number)=>{
      return axiosInstance.get<CardWithPosition[]>(this.endpoint+'/solo',{
        params:{
        setId:setId,
        dificulity:dificulity
        }
      })
      .then(res=>res.data);
    }

   
   

  }

  export default ApiGameClient;