import React from 'react'
import { Stack,Text,HStack, Icon, AlertIcon, Alert } from '@chakra-ui/react';
import useCreatorStore from '../creatorStore';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, EditIcon, LinkIcon } from '@chakra-ui/icons';
import { MdOutlineQuiz  } from "react-icons/md";
import ConfirmationModal from './utils/ConfirmationModal';
import ApiClient from '../services/ApiClient';
import useUserStore from '../userStore';
import Quiz from '../entities/Quiz';


interface Props{
  setShowMenu:(show:boolean)=>void;
  handlePlayQuiz:(quizId:number)=>void;
  showMenu:boolean;
  quiz:Quiz;
}

const apiClient = new ApiClient('/quiz');
const QuizMenu = ({showMenu,setShowMenu,quiz,handlePlayQuiz}:Props) => {
    const createStore=useCreatorStore();
    const userStore=useUserStore();
    const [showCopiedAlert,setShowCopiedAlert]=React.useState(false);
    const [showConfirmation,setShowConfirmation]=React.useState(false);
    const navigate=useNavigate();

    const handleEditSet=()=>{
        createStore.setQuestions(quiz.questionDTOS);
        createStore.setSetName(quiz.setName);
        createStore.setisUpdating(true);
        navigate('/editQuiz/'+quiz.quizId);
        console.log('edit set')
    }  

    const handleDelete= async ()=>{
        await apiClient.deleteQuizSet(quiz.quizId);
         userStore.triggerRefetch();
         window.location.reload();
     }
    
    const handleCopiedLink=()=>{
        navigator.clipboard.writeText(`http://localhost:5174/share/${quiz.shareCode}`);
        setShowMenu(false);
        setShowCopiedAlert(true);
        setTimeout(()=>setShowCopiedAlert(false),2000);
    }

  return (
    <>
     <ConfirmationModal open={showConfirmation} close={()=>{setShowConfirmation(false);setShowMenu(false)}} confirmed={()=>handleDelete()}/>
    {showCopiedAlert&&<Alert variant='solid' zIndex={3} status='success' color='white' position='fixed' top='20%' left='0%'>
        <AlertIcon />
          Link copied to clipboard
        </Alert>}
    <Stack justifyContent='space-evenly' color='gray.600'  left={showMenu?'0':'100%'} transition='0.7s' position='absolute' margin='-20px 0px' height='100%'
    border='2px solid gray' bg='gray.200' borderRadius='15px' padding='10px' width='100%' cursor='pointer' >
     <HStack onClick={()=>handlePlayQuiz(quiz.quizId)}>
        <Icon boxSize={5} as={MdOutlineQuiz }/><Text ml={1} fontSize='lg'>learn</Text>
     </HStack>
     <HStack onClick={handleCopiedLink}> 
       <Icon boxSize={5} as={LinkIcon}/><Text ml={1}  fontSize='lg'>share</Text>
     </HStack>
     <HStack onClick={handleEditSet}>
        <Icon boxSize={5} as={EditIcon}/><Text ml={1}  fontSize='lg'>edit</Text>
     </HStack>
     <HStack onClick={()=>setShowConfirmation(true)}>
        <Icon boxSize={5} as={DeleteIcon}/><Text ml={1}  fontSize='lg'>delete</Text>
     </HStack>
   </Stack>
   </>
  )
}

export default QuizMenu