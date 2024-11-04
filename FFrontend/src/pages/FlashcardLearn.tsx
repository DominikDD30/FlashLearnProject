import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../services/ApiClient';
import { Button, Center, Flex, HStack, Icon,Stack,Text, useMediaQuery } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import FlashcardsResult from '../components/learn/FlashcardsResult';
import { Flashcard } from '../entities/Flashcard';
import Card from '../components/learn/Card';

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
    const [isRoundEnd,setIsRoundEnd]=useState(false);
    const [showDefinition,setShowDefinition]=useState(false);
    const [opacity,setOpacity]=useState(false);
    const accuratePercent=Math.floor(positive/(positive+negative)*100);
    const [nextCards,setNextCards]=useState<Flashcard[]>([]);
    const activeFlashcard=flashcards[activeFlashcardIndex];

    useEffect(()=>{
      apiClient.getFlashcardSet(parseInt(setId!)).then(set1=>{
        const shuffledCards = set1.flashcards.sort(() => Math.random() - 0.5);
        setFlashcards(shuffledCards);
        setDefaultCards(shuffledCards);
      })
  },[]);


  if(flashcards.length<1){
    return;
  }

  const handleMove=(isPositive:boolean)=>{
    if(showDefinition) setShowDefinition(false);

    if(isPositive)setPositive(positive+1);
    else setNegative(negative+1);

    if(activeFlashcardIndex+1==flashcards.length){
      setIsRoundEnd(true); 
      return;
    }
    setActiveFlashcardIndex(activeFlashcardIndex+1);
  }

  const handleContinueLearning=()=>{
    const shuffledCards = [...nextCards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffledCards);
    reset();
  }

  const handleSetDefault=()=>{
    setFlashcards(defaultCards.sort(() => Math.random() - 0.5));
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

  if(isRoundEnd){
  return <FlashcardsResult accuratePercent={accuratePercent} positive={positive} negative={negative} 
  continueLearning={handleContinueLearning} setDefault={handleSetDefault}/>;
  }

  return (
<Flex flexDirection='column'  alignItems='center'  p={`20px ${isLargerThan1200?'50px':'0px'}`} height='100vh' width='100%' bg='gray.100' color='gray.600'>
  <Icon position='absolute'  top='20px' left='25px' boxSize={5} as={CloseIcon} cursor='pointer' onClick={handleExit}/>
  <Text textAlign='center' fontSize={{base:'xl',xl:'2xl'}} fontWeight='500'>
    {`${activeFlashcardIndex+1}/${flashcards.length}`}
  </Text>
  <hr style={{width:'99vw',marginTop:'15px',border:'2px solid var(--chakra-colors-gray-300)'}}/>

  <Stack height='100%' justifyContent='space-between' pb='25px'>
    <HStack w='100%' p='0 20px' mt='20px' justifyContent='space-between' fontSize='2xl'>
        <Center border='2px solid orange' boxSize={{base:'40px',xl:'50px'}} borderRadius='40%'><Text color='orange'>{negative}</Text></Center>
        <Center border='2px solid green' boxSize={{base:'40px',xl:'50px'}}borderRadius='40%'><Text color='green'>{positive}</Text></Center>
    </HStack>
   
    <Card activeFlashcard={activeFlashcard} opacity={opacity}  
    showDefinition={showDefinition} flipCard={handleFlip}/>
  
    <HStack w='100%' mt='30px'  pb='20px' justifyContent='space-between' fontSize='2xl'>
        <Button w='150px' p='20px' border="3px solid orange" color='var(--chakra-colors-gray-700)' onClick={()=>handleMove(false)}>Still Learning</Button>
        <Button w='150px' p='20px' border="3px solid green"  color='var(--chakra-colors-gray-700)'  onClick={()=>handleMove(true)}>Know this</Button>
    </HStack>
  </Stack>
</Flex>
  )
}

export default FlashcardLearn