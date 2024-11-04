import { Box, Button, Center, Input, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useCreatorStore from '../creatorStore';
import QuizItemBuilderComponent from '../components/creator/quiz/QuizItemBuilderComponent';
import ApiClient from '../services/ApiClient';
import useUserStore from '../userStore';

const apiClient = new ApiClient('/quiz');
const EditQuiz = () => {
  const creatorStore=useCreatorStore();
  const userStore=useUserStore();
  const [setName,setSetName]=React.useState('');
  const {setId}=useParams();
  const navigate=useNavigate();
  const setNameRef=useRef<HTMLInputElement>(null);
  const quizItems=creatorStore.questions;
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');


  useEffect(()=>{
    apiClient.getQuiz(parseInt(setId!)).then(set1=>{
      creatorStore.setSetName(set1.setName);
      setSetName(set1.setName);
      creatorStore.setQuestions(set1.questionDTOS);
      creatorStore.setisUpdating(true);
    })
    setSetName(creatorStore.setName!);
  },[]);
  
  const handleSetNameChange=()=>{
    if(setNameRef.current) setSetName(setNameRef.current.value);
  }
  
     const handleAddNew=()=>{
        creatorStore.addNewEmptyQuizItem();
      }
      const changeSetName=()=>{
        if(setNameRef.current&&setNameRef.current.value){
          creatorStore.setSetName(setNameRef.current.value);
        }
      }

      const handleUpdate= ()=>{
        if(creatorStore.questions.length>2&&setName){
           apiClient.updateSet(parseInt(setId!),userStore.userId!,setName,quizItems).then(()=>{
            navigate("/quiz-learn");
            creatorStore.reset();
           });
        }
      }

    
  return (
    <Box mr='auto' ml='auto' width={isLargerThan1200?'80%':'100%'} >
      <Input mt={5} ref={setNameRef} value={setName} onChange={handleSetNameChange} _focus={{boxShadow:'none',border:'none',borderBottom:'1px solid black'}} 
      placeholder='title..' bg='white' _placeholder={{color:'black'}} color='black' size='lg' onBlur={changeSetName}/>

      <Center  position='fixed' bg='orange.400' zIndex={1} bottom='20px' right='5px' color='white'
      boxSize='50px' borderRadius='50%' fontSize='35px' cursor='pointer' onClick={handleAddNew}>
        +
      </Center>
      {quizItems.map(quiz=><QuizItemBuilderComponent quizItem={quiz}/>)}
      <Button width='100%' height='40px' mt={10} mb={5} bg='gray.300' color='black' 
      border='2px solid black'onClick={handleUpdate}>
        update set
      </Button>
    </Box>
  )
}

export default EditQuiz