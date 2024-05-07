import { create } from "zustand";
import { CardWithPosition } from "./components/game/GameEntity";
interface GameStore{ 
    gameId?:string;
    enemyMove?:string;
    cards?:CardWithPosition[];
    firstPlayerId:string;
    secondPlayerId:string;
    playerName:string;
    secondPlayerName:string;
    playerPoints:number;
    secondPlayerPoints:number;
    gameStarted:boolean;
    animation:boolean;
    isEnd:boolean;
    playerTurn:string;
    setGameId:(gameId:string)=>void;
    setEnemyMove:(enemyMove:string)=>void;
    removeCardPair:(card:string)=>void;
    triggerAnimation:()=>void;
    setPlayerName:(name:string)=>void;
    setPlayerPoints:(points:number)=>void;
    setSecondPlayerPoints:(points:number)=>void;
    setGameEnd:()=>void;
    setPlayerTurn:(playerId:string)=>void;
    startGame:(cards:CardWithPosition[])=>void;
    setPlayerId:(playerId:string)=>void;
    setSecondPlayerId:(secondPlayerId:string)=>void;
    setSecondPlayerName:(secondPlayerName:string)=>void;
    reset:()=>void;
  }


  const useGameStore=create<GameStore>(set=>({
    gameStarted:false,
    firstPlayerId:"default",
    secondPlayerId:"default",
    playerTurn:'',
    playerName:'You',
    secondPlayerName:'Enemy',
    animation:false,
    isEnd:false,
    playerPoints:0,
    secondPlayerPoints:0,
    setGameId:(gameId)=>set(()=>({gameId:gameId})),
    setEnemyMove:(enemyMove)=>set(()=>({enemyMove:enemyMove})),
    removeCardPair: (card) => set((state) => {
      if (state.cards) {
        const updatedCards = state.cards.map(item => {
          if (item.concept === card) {
            return { ...item, visible: false };
          } else {
            return item;
          }
        });
        return { cards: updatedCards };
      } else {  
        return { cards: [] };
      }
    }),    
    setPlayerName:(name)=>set(()=>({playerName:name})),
    triggerAnimation:()=>set((state)=>({animation:!state.animation})),
    setGameEnd:()=>set(()=>({isEnd:true})),
    startGame:(cards)=>set(()=>({gameStarted:true,cards:cards})),
    setPlayerPoints:(points)=>set(()=>({playerPoints:points})),
    setSecondPlayerPoints:(points)=>set(()=>({secondPlayerPoints:points})),
    setPlayerTurn:(playerId)=>set(()=>({playerTurn:playerId})),
    setPlayerId:(playerId)=>set(()=>({firstPlayerId:playerId})),
    setSecondPlayerId:(secondPlayerId)=>set(()=>({secondPlayerId:secondPlayerId})),
    setSecondPlayerName:(secondPlayerName)=>set(()=>({secondPlayerName:secondPlayerName})),
    reset:()=>set(()=>({gameId:undefined,gameStarted:false,firstPlayerId:undefined,secondPlayerId:undefined,playerTurn:'',isEnd:false,playerPoints:0,
    secondPlayerPoints:0,cards:undefined,secondPlayerName:undefined,enemyMove:undefined}))
}));

export default useGameStore;