import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../services/ApiClient';
import { FlashcardBuilder } from '../entities/FlashcardBuilder';
import { Center, Flex, HStack, Icon,Image,Text, useMediaQuery } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { TbTriangleFilled } from "react-icons/tb";
import { AiOutlineSound } from "react-icons/ai";
import FlipCardAnimationWrapper from '../components/game/FlipCardAnimationWrapper';
import FlashcardsResult from '../components/learn/FlashcardsResult';
import { Flashcard } from '../entities/Flashcard';
import AudioPlayer from '../components/AudioPlayer';

const apiClient = new ApiClient('/flashcards');
const FlashcardLearn = () => {
    const {setId}=useParams();
    const navigate=useNavigate();
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');
    const [defaultCards,setDefaultCards]=useState<Flashcard[]>([]);
    const [flashcards,setFlashcards]=useState<Flashcard[]>([]);
    const [activeFlashcardIndex,setActiveFlashcardIndex]=useState<number>(0);
    const [positive,setPositive]=useState<number>(0);
    const [negative,setNegative]=useState<number>(0);
    const [isAnimationBlocked,setAnimationBlocked]=useState(false);
    const [isRoundEnd,setIsRoundEnd]=useState(false);
    const [showDefinition,setShowDefinition]=useState(false);
    const [opacity,setOpacity]=useState(false);
    const [runSound, setRunSound] = useState(false);
    const accuratePercent=Math.floor(positive/(positive+negative)*100);
    const [nextCards,setNextCards]=useState<Flashcard[]>([]);
    const activeFlashcard=flashcards[activeFlashcardIndex];


    useEffect(()=>{
      apiClient.getFlashcardSet(parseInt(setId!)).then(set1=>{
        setFlashcards(set1.flashcards.sort((c1,c2)=>c1.id-c2.id));
        setDefaultCards(set1.flashcards.sort((c1,c2)=>c1.id-c2.id));
      })
  },[]);


  if(flashcards.length<1){
    return;
  }

  const handleNegative=()=>{
    setAnimationBlocked(true);
    if(showDefinition)setShowDefinition(false);
    setTimeout(()=>setAnimationBlocked(false),1100);
    setNegative(negative+1);
    setNextCards([...nextCards, flashcards[activeFlashcardIndex]]);
    if(activeFlashcardIndex+1==flashcards.length){
      setIsRoundEnd(true); 
      return;
    }
    setActiveFlashcardIndex(activeFlashcardIndex+1);
  }

  const handlePositive=()=>{
    setAnimationBlocked(true);
    if(showDefinition)setShowDefinition(false);
    setTimeout(()=>setAnimationBlocked(false),1100);
    setPositive(positive+1);
    if(activeFlashcardIndex+1==flashcards.length){
      setIsRoundEnd(true); 
      return;
    }
    setActiveFlashcardIndex(activeFlashcardIndex+1);
  }

  const handleContinueLearning=()=>{
    setFlashcards(nextCards);
    reset();
  }

  const handleSetDefault=()=>{
    setFlashcards(defaultCards);
    reset();
  }

  const reset=()=>{
    setNextCards([]);
    setPositive(0);
    setNegative(0);
    setActiveFlashcardIndex(0);
    setIsRoundEnd(false);
  }

  const handleExit=()=>{
    apiClient.updateLastTimeUsed(parseInt(setId!));
   navigate("/flashcards");
  }

  const handleFlip=()=>{
    setShowDefinition(!showDefinition);
    setOpacity(true);
    setTimeout(()=>{
      setOpacity(false);
    },300)
  }

  const handlePlaySound=(event)=>{
    setRunSound(!runSound);
    event.stopPropagation(); 
  }
  
  if(isRoundEnd){
  return <FlashcardsResult accuratePercent={accuratePercent} positive={positive} negative={negative} 
  continueLearning={handleContinueLearning} setDefault={handleSetDefault}/>;
  }

  return (
   <Flex flexDirection='column'  alignItems='center'  p={`30px ${isLargerThan1200?'50px':'0px'}`} minHeight='100vh'  width='100vw' bg='gray.100' color='gray.600'>
    <Icon position='absolute'  top='25px' left='25px' boxSize={5} as={CloseIcon} cursor='pointer' onClick={handleExit}/>
    <Text textAlign='center' fontSize={{base:'xl',xl:'2xl'}} fontWeight='500'>{`${activeFlashcardIndex+1}/${flashcards.length}`}</Text>
    <hr style={{width:'99vw',marginTop:'15px',border:'2px solid var(--chakra-colors-gray-300)'}}/>
    <HStack w='100%' p='0 20px' mt='30px' justifyContent='space-between' fontSize='2xl'>
      <Center border='2px solid red' boxSize={{base:'40px',xl:'50px'}} borderRadius='40%'><Text color='red'>{negative}</Text></Center>
      <Center border='2px solid green' boxSize={{base:'40px',xl:'50px'}}borderRadius='40%'><Text color='green'>{positive}</Text></Center>
    </HStack>
   
    <FlipCardAnimationWrapper  flip={showDefinition} isBlocked={isAnimationBlocked}>
    <Flex mt='40px' position='relative' flexDirection='column' ml='auto' mr='auto'  height='65vh'  width={isLargerThan1200?'30vw':'calc(100vw - 80px)'}
      justifyContent='center' bg='gray.400' alignItems='center' borderRadius='10px' onClick={handleFlip}>

    {!showDefinition &&<Icon as={AiOutlineSound} cursor='pointer' opacity={opacity?0:1} position='absolute' top='20px' left='5%' boxSize={{base:8,xl:10}}
    onClick={handlePlaySound}/>}
    <AudioPlayer run={runSound} newConcept={activeFlashcard.concept}/>

    {showDefinition&&activeFlashcard.image&&
    <Image w='100%' src={activeFlashcard.image} mb='50px' opacity={opacity?0:1} objectFit='cover'/>}

    <Text fontSize={{base:'27px',xl:'34px'}} opacity={opacity?0:1}  w='100vw'  textAlign='center' color='white' transform={showDefinition?'rotateY(180deg)':''}>
      {`${showDefinition? activeFlashcard.definition : activeFlashcard.concept}`}
      </Text>
   </Flex>
   </FlipCardAnimationWrapper>
  

   <HStack w='100%' mt='50px'  p='0 40px' justifyContent='space-between' fontSize='2xl'>
   <Icon as={TbTriangleFilled} cursor='pointer' boxSize={{base:7,xl:9}} transform='rotate(270deg)' onClick={handleNegative}/>
    <Icon as={TbTriangleFilled} cursor='pointer' boxSize={{base:7,xl:9}} transform='rotate(90deg)' onClick={handlePositive}/>
   </HStack>
   </Flex>
  )
}

export default FlashcardLearn