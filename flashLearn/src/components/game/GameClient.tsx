import { useState, useEffect } from 'react';
import Stomp, { Client } from 'stompjs';
import SockJS from 'sockjs-client';
import useGameStore from '../../gameStore';
import GameWrapper from './GameEntity';
import { MoveView } from '../../entities/MoveView';

const GameClient = () => {
  const gameStore=useGameStore();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  

  useEffect(() => {
    const initializeWebSocket = () => {
      const Sock = new SockJS('http://localhost:8190/flash-learn/game');
      const stomp = Stomp.over(Sock);
      stomp.connect({}, () => {
        console.log('Connected to WebSocket');

        


        setStompClient(stomp);

        stomp.subscribe('/room/moveView', (message) => {
          const moveView:MoveView=JSON.parse(message.body);
            gameStore.setEnemyMove(moveView.enemyMove);
        });

        stomp.subscribe('/room/move', (message) => {
          const moveResponse:{isEnd:boolean,firstPlayerPoints:number,secondPlayerPoints:number,playerId:string,wasFirstPlayer:boolean,
            nextPlayerMove:string,isSuccess:boolean,toRemoval:string} = JSON.parse(message.body);
             if(moveResponse.isSuccess){
              gameStore.triggerAnimation();
             }
            
             gameStore.setPlayerTurn(moveResponse.nextPlayerMove);
             
            
            gameStore.removeCardPair(moveResponse.toRemoval);
       
        
            if(moveResponse.wasFirstPlayer){
              if(gameStore.firstPlayerId==moveResponse.playerId){
                gameStore.setPlayerPoints(moveResponse.firstPlayerPoints);
                gameStore.setSecondPlayerPoints(moveResponse.secondPlayerPoints);
              }else{
                gameStore.setPlayerPoints(moveResponse.secondPlayerPoints);
                gameStore.setSecondPlayerPoints(moveResponse.firstPlayerPoints);
              }
            }
            else{
              if(gameStore.firstPlayerId==moveResponse.playerId){
                gameStore.setPlayerPoints(moveResponse.secondPlayerPoints);
                gameStore.setSecondPlayerPoints(moveResponse.firstPlayerPoints);
              }
              else{
                gameStore.setPlayerPoints(moveResponse.firstPlayerPoints);
                gameStore.setSecondPlayerPoints(moveResponse.secondPlayerPoints);
              } 
            }
            if(moveResponse.isEnd){
              gameStore.setGameEnd();
            }
       
            console.log("zmieniam kolejke "+moveResponse.nextPlayerMove);
            gameStore.setPlayerTurn(moveResponse.nextPlayerMove);
        });

       

        stomp.subscribe('/room/join', (message) => {
          const gameWrapper:GameWrapper = JSON.parse(message.body);
          const game=gameWrapper.game;
          const cards=gameWrapper.cards;
          console.log("pierwszy "+"drugi "+gameStore.secondPlayerId);
          gameStore.setPlayerTurn("first");
          if(gameStore.firstPlayerId=='first'){
          gameStore.setSecondPlayerName(game.secondPlayerName);
          }
          gameStore.setGameId(game.gameId!);
          gameStore.startGame(cards);
        });
      });
    };
      initializeWebSocket();

    return () => {
      if (stompClient) {
        stompClient.disconnect(() => {});
      }
    };
  }, [gameStore.firstPlayerId,gameStore.secondPlayerId,gameStore.playerTurn]);

  const joinGame = (joinCode: string,playerName:string) => {
    if (stompClient) {
      const joinRequest = JSON.stringify({ joinCode: joinCode, playerName: playerName });
      stompClient.send('/app/join', {}, joinRequest);
    }
  };

  const processCheckMove = (gameId:string,playerId:string,firstPick:string,secondPick:string) => {
    if (stompClient) {
      const move = JSON.stringify({gameId:parseInt(gameId),playerId:playerId,firstPick:firstPick,secondPick:secondPick});
      stompClient.send('/app/move', {}, move);
    }
  };

  const processMove = (position:string) => {
    if (stompClient) {
      stompClient.send('/app/moveView', {}, position);
    }
  };

  return {  joinGame,processCheckMove,processMove};
};

export default GameClient;
