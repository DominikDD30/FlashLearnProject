import { Box, Button, Center, Flex, SimpleGrid,Stack,Text,Image, useMediaQuery } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import smallWenus from '../assets/wenus_small.jpg'
import bigWenus from '../assets/wenus.jpg'
import FlipCardAnimationWrapper from '../components/game/FlipCardAnimationWrapper'
import GameNav from '../components/game/GameNav'
import { useNavigate, useParams } from 'react-router-dom'
import useGameStore from '../gameStore'
import { CardWithPosition } from '../components/game/GameEntity'
import { createCardsSet } from '../services/utils'
import socket from '../../socket';
import ApiClient from '../services/ApiClient'
import DefaultCards from '../components/game/defaultCards'

interface Player{
  socketId:string;
  name:string;
  score:number;
}


const apiClient = new ApiClient('/flashcards');
const Game = () => {
   const [isLessWidthThan565] = useMediaQuery('(max-width: 565px)');
   const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');
  useParams();
    const gameStore=useGameStore();
    const navigate=useNavigate();
    const [cards,setCards]=useState<CardWithPosition[]>([]);
    const [firstPlayerPoints,setFirstPlayerPoints]=useState(0);
    const [secondPlayerPoints,setSecondPlayerPoints]=useState(0);
    const [isFirstItemSelected,setIsFirstItemSelected]=useState(false);
    const [isSecondPick,setIsSecondItemSelected]=useState(false);
    const [firstItemFlipedPosition,setFirstItemFlipedPosition]=useState(-1);
    const [secondItemFlipedPosition,setSecondItemFlipedPosition]=useState(-1);
    const [firstPick,setFirstPick]=useState<{position:number,concept:string}>();
    const [yourTurn,setYourTurn]=useState(false);
    const [playerTurn,setPlayerTurn]=useState('');
    const [animation,setAnimation]=useState(false);
    const [showFinalResult,setShowFinalResult]=useState(false);
    const [showQueueText,setShowQueueText]=useState(false);
    const deckSize=cards?.length;
   

    useEffect(()=>{
      console.log("asfsf"+gameStore.secondPlayerName);
      if(gameStore.playerName=='owner') {
        if(gameStore.setId!=0){
        apiClient.getFlashcardSet(gameStore.setId!).then(set=>{
          const initialCards = createCardsSet(gameStore.pairs, set.flashcards);
          socket.emit('start_game',gameStore.roomName,initialCards);
        })}
        else{
          const randomIndex = Math.floor(Math.random() * 2); 
          const initialCards = createCardsSet(gameStore.pairs,DefaultCards[randomIndex].cards.slice(0, gameStore.pairs));
          socket.emit('start_game',gameStore.roomName,initialCards);
        } 
      }
    },[]);

    useEffect(()=>{
        socket.on('game_started', () => {
         setYourTurn(true);
         setShowQueueText(true);
        setTimeout(()=>{setShowQueueText(false)},800);
        });

        socket.on('changeTurn', (player:string) => {
          setPlayerTurn(player);
          console.log(player+' turn');
          if(player==gameStore.playerName){
            setYourTurn(true);
         }
         else{
          setYourTurn(false); 
         }
         if(!showFinalResult){
        setShowQueueText(true);
        setTimeout(()=>{setShowQueueText(false)},800);
         }
        });

        socket.on('set_cards', (cards:CardWithPosition[]) => {
          setCards(cards.map((card) => ({ ...card,visible: true })));
         });

         socket.on('show_first_flip', (position:number) => {
          setFirstItemFlipedPosition(position);
          setTimeout(()=>{setIsFirstItemSelected(true);},300);
         });

         socket.on('show_second_flip', (position:number) => {
          setSecondItemFlipedPosition(position);
          setTimeout(()=>{setIsFirstItemSelected(true);},300);
          setTimeout(()=>{setIsSecondItemSelected(true);},300);
          setTimeout(()=>{setIsSecondItemSelected(false);setSecondItemFlipedPosition(-1);},1800);
          setTimeout(()=>{
            setIsFirstItemSelected(false);
            setFirstItemFlipedPosition(-1);
          },2800);
         });

         socket.on('update_score', (players:Player[],cards:CardWithPosition[]) => {
          setCards(cards);
              setAnimation(true);
              setTimeout(()=>{
                setAnimation(false)
              },1000);

              players.forEach(player=>{
                if(player.name=='owner'){
                  setFirstPlayerPoints(player.score);
                }
                else {
                  setSecondPlayerPoints(player.score);
                }
             });
            }
           );

            socket.on('game_end', () => {
              gameStore.reset();
              socket.emit('kill_room',gameStore.roomName);
              setShowFinalResult(true);
            });
    },[]);

    const handleExit=()=>{
     gameStore.reset();
     socket.emit('kill_room',gameStore.roomName);
     navigate('/');
    }


    
    const handleFlip=(position:number,concept:string,visible:boolean)=>{
          if(position==firstItemFlipedPosition||position==secondItemFlipedPosition) return;
          if(!yourTurn || !visible){
            console.log("nie mozna kliknac");
            return
          }

          
          if(!isFirstItemSelected){
            setFirstPick({position:position,concept:concept});
            socket.emit('request_flip',gameStore.roomName,position);
          }else{
            socket.emit('request_second_flip',gameStore.roomName,position);
            
             setTimeout(()=>{
              const isPoint=firstPick?.concept==concept;
              const updatedCards = cards.map(card =>
                card.concept === concept ? { ...card, visible: false } : card
              );
              socket.emit('process_move',gameStore.roomName,gameStore.playerName,isPoint,updatedCards
              );
             },2800);
          }
        }



  if(isLessWidthThan565){
    return <Center w='300px' position='fixed' fontSize='xl'  textAlign='center' top='50%' left='50%' transform='translate(-50%,-50%)' height='200px'>
      <Text color='gray.700'>Please turn your device to landscape view</Text>
      </Center>
  }
  return (
    <>
    <Box width='200px' height='90px' bg='gray.200' borderRadius='10px' opacity={animation?1:0} 
    transform={animation?'translate(-50%,-50%) scale(1)': 'translate(-50%,-50%) scale(0.5)'}
    transition='top 2s 0.3s, left 2s 0.3s, opacity 0.1s ,transform 1s 0.3s'
    position='fixed' top={animation?'-30%':'50%'} left={animation?(playerTurn=='owner'?'-10%':'110%'):'50%'} zIndex={animation?4:0}>
    </Box>

    <Flex width='100vw' flexDirection='column' overflowY='hidden' height='100vh'  bgImage={isLargerThan1000?bigWenus:smallWenus} bgPosition='center' bgSize='cover'  p='0px 0px'> 
    {showFinalResult&&<Stack position='fixed' spacing={1} zIndex={2}  borderRadius='5px'  top='60%' left='50%'
     transform='translate(-50%,-50%)'>
    <Text fontSize='2xl' mb={2}>Final Score!!</Text>
    <Text fontSize='xl'>You score {firstPlayerPoints} points</Text>
    <Text fontSize='xl'>{gameStore.secondPlayerName} score {secondPlayerPoints} points</Text>
    <Button w='200px' margin='0 auto' h='50px' mt={2} onClick={handleExit}>back</Button>
    </Stack>}
        <GameNav firstPlayerPoints={firstPlayerPoints} secondPlayerPoints={secondPlayerPoints} endGame={handleExit}/>
         <Text position='fixed' fontSize='50px' transition='0.1s' zIndex={showQueueText?2:-1} top='50%' left='50%' 
        transform='translate(-50%,-50%)' color='blue' opacity={showQueueText?'1':'0'} fontWeight='semibold'>
          {yourTurn?'Your Play':`${gameStore.secondPlayerName} Play`}
         </Text>
        <SimpleGrid mt='60px' p={{base:'10px 10px 25px 10px',lg:'50px'}} alignItems='center'  flexGrow={1}  
        spacing={isLargerThan1000?
          (deckSize==12? '70px' : deckSize==20? '40px' : '35px')
        :(deckSize==12? '10px' : deckSize==20? '7px' : '6px')}
          columns={deckSize==12? 4 : deckSize==20? 5 : 6}>
                {cards?.map((card,index)=><FlipCardAnimationWrapper key={index} isBlocked={false}
               flip={(card.position==firstItemFlipedPosition)||(card.position==secondItemFlipedPosition)}> 
                     <Center 
                      height={isLargerThan1000?
                        (deckSize == 12 ? '140px' : deckSize == 20 ? '110px' : '90px')
                      :(deckSize == 12 ? '80px' : deckSize == 20 ? '50px' : '50px')}  
                      transition='1s'
                      opacity={card.visible ? 1 : 0}
                       borderRadius={10} 
                       onClick={() => handleFlip(card.position, card.concept, card.visible)} 
                       bg={(card.position == firstItemFlipedPosition && isFirstItemSelected) || 
                     (card.position == secondItemFlipedPosition && isSecondPick) ? 'none' : 'gray.200'} 
                    border='1.5px solid var(--chakra-colors-gray-300)'>

                     {(card.position==firstItemFlipedPosition&&isFirstItemSelected)||(card.position==secondItemFlipedPosition&&isSecondPick) ?
                     <Stack height='100%' width='100%' borderRadius={10}>
                    <Text position='absolute' right='10px' fontSize='lg' transform='rotateY(180deg)' textAlign='center'>{card.concept}</Text>
                    <Image src={card.image} backgroundSize='cover' borderRadius={10} height='100%' />
                    </Stack>
                     :'' 
                     } 
              </Center> 
              </FlipCardAnimationWrapper>
              )}
              </SimpleGrid>
          </Flex>
          </>
  )
}

export default Game