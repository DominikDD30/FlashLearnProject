import React from 'react'
import Quiz from '../entities/Quiz';
import { Stack,Text,Flex, HStack, Box, Icon, AlertIcon, Alert } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import useCreatorStore from '../creatorStore';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, EditIcon, HamburgerIcon, LinkIcon } from '@chakra-ui/icons';
import ApiClient from '../services/ApiClient';
import ConfirmationModal from './ConfirmationModal';
import useUserStore from '../userStore';
import { MdOutlineQuiz  } from "react-icons/md";

interface Props{
        quiz:Quiz;
        owner:string;
        handlePlayQuiz:(quizId:number)=>void;
}

const apiClient = new ApiClient('/quiz');
const QuizSetComponent = ({quiz: quiz,owner,handlePlayQuiz}:Props) => {
    const createStore=useCreatorStore();
    const userStore=useUserStore();
    const [showMenu, setShowMenu] = React.useState(false);
  const [showConfirmation,setShowConfirmation]=React.useState(false);
  const [showCopiedAlert,setShowCopiedAlert]=React.useState(false);
    const navigate=useNavigate();


    const handleEditSet=()=>{
        createStore.setQuizItems(quiz.questions);
        createStore.setSetName(quiz.setName);
        createStore.setisUpdating(true);
        navigate('/editQuiz/'+quiz.quizId);
        console.log('edit set')
    }  

    
 const handleCopiedLink=()=>{
    navigator.clipboard.writeText(`http://localhost:5174/share/${quiz.shareCode}`);
    setShowMenu(false);
    setShowCopiedAlert(true);
    setTimeout(()=>setShowCopiedAlert(false),2000);
  }

    const handleDelete=()=>{
    
        apiClient.deleteQuizSet(quiz.quizId);
        userStore.triggerRefetch();
    }

    const menu= <Stack justifyContent='space-evenly' color='gray.600'  left={showMenu?'0':'100%'} transition='0.7s' position='absolute' margin='-20px 0px' height='100%'
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
    return (
        <>
        {showCopiedAlert&&<Alert variant='solid' zIndex={3} status='success' color='white' position='fixed' top='20%' left='0%'>
        <AlertIcon />
        Link copied to clipboard
        </Alert>}
        <ConfirmationModal open={showConfirmation} close={()=>{setShowConfirmation(false);setShowMenu(false)}} confirmed={()=>handleDelete()}/>
        <Stack position='relative' height='200px' border='2px solid gray' overflow='hidden' borderRadius='15px' padding='20px' width='100%'> 
         {menu}
            <Text fontWeight='500' width='80%' color='gray.600'>{quiz.setName}</Text>
            <Icon position='absolute' top='10px' right='10px' as={HamburgerIcon} boxSize={6} color='gray.600'
             cursor='pointer' onClick={()=>setShowMenu(!showMenu)}/>
            <Flex mt={1}> <Box bg='gray.200' border='2px solid var(--chakra-colors-gray-300)' height='30px' p='0 10px' color='gray.600'
             lineHeight='25px' borderRadius='10px'>{quiz.questionsAmount} cards</Box></Flex>
            <HStack mt='auto'><Icon as={FaUserCircle} boxSize={10} color='gray.600'/><Text color='gray.600'>{owner}</Text></HStack>
          </Stack>
          </>
      )
   
}

export default QuizSetComponent