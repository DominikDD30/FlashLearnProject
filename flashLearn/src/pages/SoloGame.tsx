import React, { useEffect, useState } from 'react'
import FlashcardsSet from '../entities/FlashcardsSet'
import { Center, Flex, HStack, SimpleGrid, Stack,Text,Image, useMediaQuery, Button} from '@chakra-ui/react';
import FlipCardAnimationWrapper from '../components/game/FlipCardAnimationWrapper';
import { CardWithPosition } from '../components/game/GameEntity';
import useSoloGameStore from '../soloGameStore';
import ApiGameClient from '../services/ApiGameClient';
import smallWenus from '../assets/wenus_small.jpg'
import bigWenus from '../assets/wenus.jpg'
import { useNavigate } from 'react-router-dom';

const gameApiClient=new ApiGameClient();
const SoloGame = () => {
    const {setId,dificulity,reset} =useSoloGameStore();
    const [isFirstPick,setIsFirstPick]=useState(false);
    const [isSecondPick,setIsSecondPick]=useState(false);
    const navigate=useNavigate();
    const [firstItemFlipedPosition,setFirstItemFlipedPosition]=useState(-1);
    const [secondItemFlipedPosition,setSecondItemFlipedPosition]=useState(-1);
    const [firstPick,setFirstPick]=useState<{position:number,concept:string}>();
    const [yourTurn,setYourTurn]=useState(true);
    const [scored,setScored]=useState(0);
    const [moves,setMoves]=useState(0);
    const [cards,setCards]=useState<CardWithPosition[]>();
    const [showFinalResult,setShowFinalResult]=useState(false);
    const deckSize=dificulity*2;
    const [isLessWidthThan565] = useMediaQuery('(max-width: 565px)');
    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');

    useEffect(() => {
      gameApiClient.createSoloGame(setId,dificulity).then(data=>setCards(data));
    }, []);

    if(!cards||cards.length<1)return;

    const handleFlip=(position:number,concept:string,visible:boolean)=>{
        if(position==firstItemFlipedPosition||position==secondItemFlipedPosition||!visible||!yourTurn) return;
        if(!isFirstPick){
            setFirstItemFlipedPosition(position);
            setFirstPick({position:position,concept:concept});
            setTimeout(()=>{setIsFirstPick(true);},300);
          }else{
            setYourTurn(false);
            setSecondItemFlipedPosition(position);
            setTimeout(()=>{setIsSecondPick(true);},300);
             setTimeout(()=>{setIsSecondPick(false);setSecondItemFlipedPosition(-1);},1800);
             setTimeout(()=>{
              setIsFirstPick(false);
              setFirstItemFlipedPosition(-1);
              setYourTurn(true);
             },2800);
             processCheckMove(concept);
          }
    }

    const  processCheckMove=(secondPick:string)=>{
        if(firstPick?.concept==secondPick){
          setTimeout(()=>{setCards(cards.map(item => {
              if (item.concept === firstPick?.concept) {
                return { ...item, visible: false };
              } else {
                return item;
              }
            }));},1000);
            setScored(scored+1);
            if(scored+1==dificulity)setShowFinalResult(true);
        }
          else{
            setTimeout(()=>setMoves(moves+1),3000);
          }
          setFirstPick(undefined);
    }


    const handleExit=()=>{
      reset();
     navigate('/');
    }
    

    if(isLessWidthThan565){
      return <Center w='300px' position='fixed' fontSize='xl'  textAlign='center' top='50%' left='50%' transform='translate(-50%,-50%)' height='200px'>
        Please turn your device to landscape view
        </Center>
    }

  return (
    <>
      {showFinalResult&&<Stack position='fixed' spacing={1} zIndex={2}  borderRadius='5px'  top='60%' left='50%'
     transform='translate(-50%,-50%)'>
    <Text fontSize='2xl' mb={2}>Finish</Text>
    <Button w='200px' margin='0 auto' h='50px' mt={2} onClick={handleExit}>Back</Button>
    </Stack>}
     <Flex width='100vw' flexDirection='column' overflowY='hidden' height='100vh' bgImage={isLargerThan1000?bigWenus:smallWenus} bgPosition='center' bgSize='cover'  p='10px 0px 0px 0px'> 
    <HStack width='100%' justifyContent='space-around'>
    <Text  textAlign='center' fontSize='2xl' >Collected Pairs {scored}</Text>
    <Text  textAlign='center' fontSize='2xl' color='skyblue' >Moves {moves}</Text>
    </HStack>
    <SimpleGrid mt='20px' p={{base:'10px',lg:'50px'}} alignItems='center'  flexGrow={1}  
      spacing={isLargerThan1000?
        (deckSize==12? '70px' : deckSize==20? '50' : '35px')
      :(deckSize==12? '25px' : deckSize==20? '15px' : '15px')}
      columns={deckSize==12? 4 : deckSize==20? 5 : 6}>
            {cards?.map((card,index)=><FlipCardAnimationWrapper key={index} isBlocked={false}
           flip={(card.position==firstItemFlipedPosition)||(card.position==secondItemFlipedPosition)}> 
                 <Center 
                  height={isLargerThan1000?
                    (deckSize == 12 ? '170px' : deckSize == 20 ? '140' : '120px')
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

export default SoloGame