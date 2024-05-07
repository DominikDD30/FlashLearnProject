import { Icon,Button,Text, Center, useMediaQuery, Spinner, Stack } from '@chakra-ui/react'
import { FiUpload } from 'react-icons/fi'
import QuizItemBuilderComponent from './QuizItemBuilderComponent';
import useCreatorStore from '../../../creatorStore';
import { useEffect, useState } from 'react';
import PdfDropBox from './PdfDropBox';
import PdfUpload from './PdfUpload';

const QuizCreator = () => {
  const creatorStore=useCreatorStore();
  const quizItems=creatorStore.quizItems;
  const [showSpinner,setShowSpinner]=useState(false);

    const handleAddNew=()=>{
        creatorStore.addNewEmptyQuizItem();
      }


        if(showSpinner){
      return (
        <Stack alignItems='center' margin='100px auto'>
        <Text fontSize='lg' color='gray.600' textAlign='center'>Processing</Text>
        <Spinner
          transform='translate(-50%,-50%)'
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl' />
        </Stack>
      );
        }
      
  
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