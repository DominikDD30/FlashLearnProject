import { Center } from '@chakra-ui/react'
import QuizItemBuilderComponent from './QuizItemBuilderComponent';
import useCreatorStore from '../../../creatorStore';
import { useState } from 'react';
import PdfUpload from './PdfUpload';
import ProcessingSpinner from '../../utils/ProcessingSpinner';

const QuizCreator = () => {
  const creatorStore=useCreatorStore();
  const quizItems=creatorStore.questions;
  const [showSpinner,setShowSpinner]=useState(false);

    const handleAddNew=()=>{
        creatorStore.addNewEmptyQuizItem();
      }


  if(showSpinner){return <ProcessingSpinner/>}
      
  
  return (
    <>
    <Center  position='fixed' bg='orange.400' zIndex={1} bottom='20px' right='5px' color='white'
    boxSize='50px' borderRadius='50%' fontSize='35px' cursor='pointer' onClick={handleAddNew}>
      +
    </Center>
    <PdfUpload startLoading={()=>setShowSpinner(true)} stopLoading={()=>{setShowSpinner(false);console.log(quizItems)}}/>
    {quizItems.map(quiz=><QuizItemBuilderComponent quizItem={quiz}/>)}
    </>
  )
}

export default QuizCreator