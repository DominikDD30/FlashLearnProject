import { Box, Button, Flex, HStack, Input, ToastId, useMediaQuery, useToast} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import FlashcardsCreator from '../components/creator/flashcard/FlashcardsCreator';
import QuizCreator from '../components/creator/quiz/QuizCreator';
import ApiClient from '../services/ApiClient';
import useCreatorStore from '../creatorStore';
import useUserStore from '../userStore';
import { useNavigate } from 'react-router-dom';




const apiClient=new ApiClient("");
const Creator = () => {
    const [option,setOption]=useState(-1);
    const setNameRef=useRef<HTMLInputElement>(null);
    const creatorStore=useCreatorStore();
    const userStore=useUserStore();
    const toast = useToast()
    const toastIdRef = useRef<ToastId | undefined>();
    const navigate=useNavigate();
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');


    useEffect(()=>{
      creatorStore.reset();
    },[]);
    const handleCreate= ()=>{
      if(creatorStore.setName&&(creatorStore.flashcards.length>2||creatorStore.quizItems.length>2)){
        console.log("asfsaf")
      if(option==1&&creatorStore.flashcards.length>2){
        console.log("flashcards")
        apiClient.createFlashcards(userStore.userId!,creatorStore.setName,creatorStore.flashcards);
      }
      else if(option==2&&creatorStore.quizItems.length>2){
       console.log("quiz")
        apiClient.createQuiz(userStore.userId!,creatorStore.setName,creatorStore.quizItems);
      }
      creatorStore.reset();
      userStore.triggerRefetch();
      navigate('/');
    }else{
      showToast();
    }
    }

    const changeSetName=()=>{
      if(setNameRef.current&&setNameRef.current.value){
      creatorStore.setSetName(setNameRef.current.value);
      }
    }

  function showToast() {
    toastIdRef.current = toast({
      description: 'your set should contain at least 3 items and has title',
      status: 'warning',
      duration: 2000,
      position:'bottom',
      containerStyle: {
        marginBottom: '100px',
      }
     })
  }

  return (
    <Flex minHeight='100vh' mr='auto' ml='auto' width={isLargerThan1200?'60%':'100%'} color='black' flexDirection='column' mb='100px' padding='0 15px'>
    {/* <Flex minHeight='100vh' width='100%' color='black' flexDirection='column' mb='100px' padding='0 15px'> */}
        <Box  fontSize='2xl' margin='20px auto'  fontWeight='semibold'>Create new Set</Box>
    <HStack justifyContent='space-around'>
        <Button width='120px' color='black'  bg={option==1?'gray.300':'gray.100'}  onClick={()=>setOption(1)}
        border={option==1?'2px solid var(--chakra-colors-gray-400)':'2px solid var(--chakra-colors-gray-300)'}
         >Flashcards</Button>
        <Button width='120px' color='black' bg={option==2?'gray.300':'gray.100'} onClick={()=>setOption(2)}
         border={option==2?'2px solid var(--chakra-colors-gray-400)':'2px solid var(--chakra-colors-gray-300)'}
         >Quiz</Button>
    </HStack>
    <Input mt={5} ref={setNameRef} _focus={{boxShadow:'none',border:'none',borderBottom:'1px solid black'}} 
    placeholder='title..' bg='white' _placeholder={{color:'black'}} size='lg' onBlur={changeSetName}/>
    {option==1&&<FlashcardsCreator/>}
    {option==2&&<QuizCreator/>}
    {(option==1||option==2)&&
    <Button width='100%' height='40px' mt={10} bg='gray.300' color='black' 
    border='2px solid black'onClick={handleCreate}>
      create
    </Button>}
    </Flex>
  )
}

export default Creator