import { Icon,Button,Text, Center, useMediaQuery, Spinner, Stack } from '@chakra-ui/react'
import { FiUpload } from 'react-icons/fi'
import QuizItemBuilderComponent from './QuizItemBuilderComponent';
import useCreatorStore from '../../../creatorStore';
import { useEffect, useState } from 'react';
import PdfDropBox from './PdfDropBox';
import PdfUpload from './PdfUpload';
import ProcessingSpinner from '../ProcessingSpinner';

const QuizCreator = () => {
  const creatorStore=useCreatorStore();
  const quizItems=creatorStore.quizItems;
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
    <PdfUpload startLoading={()=>setShowSpinner(true)} stopLoading={()=>setShowSpinner(false)}/>
    {quizItems.map(quiz=><QuizItemBuilderComponent quizItem={quiz}/>)}
    </>
  )
}

export default QuizCreator