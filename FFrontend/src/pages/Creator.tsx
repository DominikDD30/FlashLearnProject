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
    const navigate=useNavigate();
    const toast = useToast()
    const toastIdRef = useRef<ToastId | undefined>();
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

    useEffect(()=>{
      creatorStore.reset();
    },[]);

    const handleCreate= ()=>{
      if(!creatorStore.setName){ showToast("Please enter a title"); return;}
      if((creatorStore.flashcards.length<3&&creatorStore.questions.length<3)){
        showToast("Your set should contain at least 3 elements"); return;
      }

      if(option==1){
        apiClient.createFlashcards(userStore.userId!,creatorStore.setName,creatorStore.flashcards);
      }
      else {
        apiClient.createQuiz(userStore.userId!,creatorStore.setName,creatorStore.questions);
      }
      creatorStore.reset();
      userStore.triggerRefetch();
      navigate('/');
    }

    const changeSetName=()=>{
      if(setNameRef.current&&setNameRef.current.value){
      creatorStore.setSetName(setNameRef.current.value);
      }
    }

    function showToast(message:string) {
      toastIdRef.current = toast({
        description: message,
        status: 'warning',
        duration: 2000,
        position:'bottom',
        containerStyle: {
          marginBottom: '100px',
        }
       })
    }

  return (
  <Flex minHeight='100vh'  mr='auto' ml='auto' width={isLargerThan1200?'60%':'100%'} color='black' flexDirection='column' mb='100px' padding='0 15px'>
    <Box  fontSize='2xl' margin='20px auto'  fontWeight='semibold'>
      Create new Set
    </Box>


    <HStack justifyContent='space-around'>
        <Button width='120px' color='black'  bg={option==1?'gray.300':'gray.100'}  onClick={()=>setOption(1)}
        border={option==1?'2px solid var(--chakra-colors-gray-400)':'2px solid var(--chakra-colors-gray-300)'}>
          Flashcards
        </Button>
        <Button width='120px' color='black' bg={option==2?'gray.300':'gray.100'} onClick={()=>setOption(2)}
         border={option==2?'2px solid var(--chakra-colors-gray-400)':'2px solid var(--chakra-colors-gray-300)'}>
          Quiz
         </Button>
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