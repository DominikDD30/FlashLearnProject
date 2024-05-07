import { Box, Button, Center, Flex, SimpleGrid,Stack,Text,Image, useMediaQuery } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import smallWenus from '../assets/wenus_small.jpg'
import bigWenus from '../assets/wenus.jpg'
import FlipCardAnimationWrapper from '../components/game/FlipCardAnimationWrapper'
import GameNav from '../components/game/GameNav'
import { useNavigate, useParams } from 'react-router-dom'
import useGameStore from '../gameStore'
import GameClient from '../components/game/GameClient'



const Game = () => {
   const [isLessWidthThan565] = useMediaQuery('(max-width: 565px)');
   const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');
  const { processMove,processCheckMove } = GameClient();
  const {uid}=useParams();
  const gameStore=useGameStore();
  const navigate=useNavigate();
    const [isFirstPick,setIsFirstPick]=useState(false);
    const [isSecondPick,setIsSecondPick]=useState(false);
    const [firstItemFlipedPosition,setFirstItemFlipedPosition]=useState(-1);
    const [secondItemFlipedPosition,setSecondItemFlipedPosition]=useState(-1);
    const [firstPick,setFirstPick]=useState<{position:number,concept:string}>();
    const [yourTurn,setYourTurn]=useState(false);
    const [animation,setAnimation]=useState(false);
    const [showFinalResult,setShowFinalResult]=useState(false);
    const [showQueueText,setShowQueueText]=useState(false);
    const deckSize=gameStore.cards?.length;


    useEffect(()=>{
      if(!isFirstPick&&gameStore.enemyMove){
        setFirstItemFlipedPosition(parseInt(gameStore.enemyMove));
        setTimeout(()=>{setIsFirstPick(true);},300);
      }else if(gameStore.enemyMove){
        setSecondItemFlipedPosition(parseInt(gameStore.enemyMove));
        setTimeout(()=>{setIsSecondPick(true);},300);
        setTimeout(()=>{setIsSecondPick(false);setSecondItemFlipedPosition(-1);},1800);
        setTimeout(()=>{
          setIsFirstPick(false);
          setFirstItemFlipedPosition(-1);
        },2800);
      }
    },[gameStore.enemyMove])

    useEffect(()=>{
      if(gameStore.isEnd)setShowFinalResult(true);
    },[gameStore.isEnd]);

    const handleExit=()=>{
      gameStore.reset();
     navigate('/');
    }

    useEffect(()=>{
      if(gameStore.animation){
      setAnimation(true);
      setTimeout(()=>{setAnimation(false)},1000);
      }
    },[gameStore.animation]);

    useEffect(()=>{
      if(gameStore.isEnd)return;
        
        setShowQueueText(true);
        setTimeout(()=>{setShowQueueText(false)},800);
        setTimeout(()=>{setYourTurn(gameStore.firstPlayerId==gameStore.playerTurn);},800);
    },[gameStore.playerTurn]);
    
    const handleFlip=(position:number,concept:string,visible:boolean)=>{
          if(position==firstItemFlipedPosition||position==secondItemFlipedPosition) return;
          if(!yourTurn || !visible){
            console.log("nie mozna kliknac");
            return
          }

          
          if(!isFirstPick){
            setFirstItemFlipedPosition(position);
            processMove(position.toString());
            setFirstPick({position:position,concept:concept});
            setTimeout(()=>{setIsFirstPick(true);},300);
          }else{
            setSecondItemFlipedPosition(position);
            processMove(position.toString());
            setTimeout(()=>{setIsSecondPick(true);},300);
             setTimeout(()=>{setIsSecondPick(false);setSecondItemFlipedPosition(-1);},1800);
             setTimeout(()=>{
              setIsFirstPick(false);
              setFirstItemFlipedPosition(-1);
              if(firstPick?.concept !== concept)setYourTurn(false);
           
              processCheckMove(gameStore.gameId!,gameStore.firstPlayerId!,firstPick?.concept!,concept);
             },2800);
          }
        }



  if(isLessWidthThan565){
    return <Center w='300px' position='fixed' fontSize='xl'  textAlign='center' top='50%' left='50%' transform='translate(-50%,-50%)' height='200px'>
      Please turn your device to landscape view
      </Center>
  }
  return (
    <>
    <Box width='200px' height='90px' bg='gray.200' borderRadius='10px' opacity={animation?1:0} 
    transform={animation?'translate(-50%,-50%) scale(1)': 'translate(-50%,-50%) scale(0.5)'}
    transition='top 2s 0.3s, left 2s 0.3s, opacity 0.1s ,transform 1s 0.3s'
    position='fixed' top={animation?'-30%':'50%'} left={animation?yourTurn?'-10%':'110%':'50%'} zIndex={animation?4:0}>
    </Box>

    <Flex width='100vw' flexDirection='column' overflowY='hidden' height='100vh'  bgImage={isLargerThan1000?bigWenus:smallWenus} bgPosition='center' bgSize='cover'  p='0px 0px'> 
    {showFinalResult&&<Stack position='fixed' spacing={1} zIndex={2}  borderRadius='5px'  top='60%' left='50%'
     transform='translate(-50%,-50%)'>
    <Text fontSize='2xl' mb={2}>Final Score!!</Text>
    <Text fontSize='xl'>You score {gameStore.playerPoints} points</Text>
    <Text fontSize='xl'>{gameStore.secondPlayerName} score {gameStore.secondPlayerPoints} points</Text>
    <Button w='200px' margin='0 auto' h='50px' mt={2} onClick={handleExit}>Back</Button>
    </Stack>}
        <GameNav/>
         <Text position='fixed' fontSize='50px' transition='0.1s' zIndex={showQueueText?2:-1} top='50%' left='50%' 
        transform='translate(-50%,-50%)' color='blue' opacity={showQueueText?'1':'0'} fontWeight='semibold'>
          {gameStore.playerTurn==gameStore.firstPlayerId?'Your Play':`${gameStore.secondPlayerName} Play`}
         </Text>
        <SimpleGrid mt='60px' p={{base:'10px',lg:'50px'}} alignItems='center'  flexGrow={1}  
        spacing={isLargerThan1000?
          (deckSize==12? '70px' : deckSize==20? '40px' : '35px')
        :(deckSize==12? '25px' : deckSize==20? '15px' : '15px')}
          columns={deckSize==12? 4 : deckSize==20? 5 : 6}>
                {gameStore.cards?.map((card,index)=><FlipCardAnimationWrapper key={index} isBlocked={false}
               flip={(card.position==firstItemFlipedPosition)||(card.position==secondItemFlipedPosition)}> 
                     <Center 
                      height={isLargerThan1000?
                        (deckSize == 12 ? '140px' : deckSize == 20 ? '110px' : '90px')
                      :(deckSize == 12 ? '80px' : deckSize == 20 ? '60px' : '60px')}  
                      transition='1s'
                      opacity={card.visible ? 1 : 0}
                       borderRadius={10} 
                       onClick={() => handleFlip(card.position, card.concept, card.visible)} 
                       bg={(card.position == firstItemFlipedPosition && isFirstPick) || 
                     (card.position == secondItemFlipedPosition && isSecondPick) ? 'none' : 'gray.200'} 
                    border='1.5px solid var(--chakra-colors-gray-300)'>

                     {(card.position==firstItemFlipedPosition&&isFirstPick)||(card.position==secondItemFlipedPosition&&isSecondPick) ?
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