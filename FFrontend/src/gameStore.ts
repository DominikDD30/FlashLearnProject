import { create } from "zustand";
interface GameStore{ 
    roomName:string;
    setId:number;
    pairs:number;
    players:string[];
    playerName:string;
    secondPlayerName:string;
    setRoomName:(roomName:string)=>void;
    setSetId:(setId:number)=>void;
    setPairs:(pairs:number)=>void;
    setplayers:(players:string[])=>void;
    setplayerName:(player:string)=>void;
    setSecondPlayerName:(secondPlayerName:string)=>void;
    reset:()=>void;
  }


  const useGameStore=create<GameStore>(set=>({
    roomName:'',
    setId:0,
    pairs:0,
    players:[],
    playerName:'',
    secondPlayerName:'',
    setRoomName:(roomName)=>set(()=>({roomName:roomName})),
    setSetId:(setId)=>set(()=>({setId:setId})),
    setPairs:(pairs)=>set(()=>({pairs:pairs})),
    setplayers:(players)=>set(()=>({players:players})),
    setplayerName:(playerName)=>set(()=>({playerName:playerName})),
    setSecondPlayerName:(secondPlayerName)=>set(()=>({secondPlayerName:secondPlayerName})),
    reset:()=>set(()=>({setId:0,players:[],playerName:'',pairs:0}))
}));

export default useGameStore;