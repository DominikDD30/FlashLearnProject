import { useEffect, useRef, useState } from 'react'
import { Answear, QuizItemBuilder } from '../../../entities/QuizItemBuilder';
import { Stack,Text,Input, HStack, Textarea } from '@chakra-ui/react';
import FloatingText from '../../FloatingText';
import useCreatorStore from '../../../creatorStore';
import AnswearComponent from './AnswearComponent';

interface Props{
    quizItem:QuizItemBuilder;
}
const QuizItemBuilderComponent = ({quizItem}:Props) => {
    const creatorStore=useCreatorStore();
    const [floatingText,setFloatingText]=useState(-1);
      const questionRef=useRef<HTMLTextAreaElement>(null);


      useEffect(()=>{
        if(creatorStore.isUpdating)return;
        var inputElement = document.getElementById(`quiz-input${creatorStore.quizItems.length}`);
        inputElement?.focus();
      },[]);
      
      useEffect(()=>{
        console.log('quizItem',quizItem);
        if(quizItem.question){
          setFloatingText(1);
        }
      },[])

      const handleQuestionChange=()=>{
        if(questionRef.current){
          const newQuestion=questionRef.current.value;
          creatorStore.updateQuizItem({id:quizItem.id,question:newQuestion,answers:quizItem.answers});
        }
    }

        const handleSaveChanges=()=>{
            if(questionRef.current&&!questionRef.current.value){
              setFloatingText(-1);
            }
        }

    const updateAnswear=(updatedAnswear:Answear)=>{
          const tempAnswears=quizItem.answers.filter(answear=>answear.id!=updatedAnswear.id);
          tempAnswears.push(updatedAnswear);
          // tempAnswears.sort((a1,a2)=>a1.id-a2.id);
          creatorStore.updateQuizItem({id:quizItem.id,question:quizItem.question,answers:tempAnswears});
        }

  const handleAddNewAnswear=()=>{
    const tempAnswears=quizItem.answers;
    tempAnswears.push({value:'',isCorrect:true});
    // tempAnswears.push({id:quizItem.answers.length+1,value:'',isCorrect:true});
    creatorStore.updateQuizItem({id:quizItem.id,question:quizItem.question,answers:tempAnswears});
  }


  const handleRemoveLastAnswear=()=>{
    if(quizItem.answers.length==1){
      creatorStore.removeQuizItem(quizItem.id);
    }
    else{
    creatorStore.updateQuizItem({id:quizItem.id,question:quizItem.question,
      answers:quizItem.answers.filter((answear,index)=>index!=quizItem.answers.length-1)});
    }
  }


  return (
    <Stack id={`quiz${quizItem.id}`} mt={10} overflowY='hidden' position='relative' justifyContent='space-between' pt='0px' pb='5px' pl='15px' pr='15px' 
    borderRadius='5px' width='100%'   bg='white' color='black'>
     <Stack spacing={0}   height='100%'>
     <FloatingText toggle={floatingText}/>
      <Textarea position='absolute' top='-15px' width='calc(100% - 30px)' ref={questionRef} id={`quiz-input${quizItem.id}`} value={quizItem.question} variant='flushed'  bg='white' size='lg'
       _focus={{boxShadow:'none',borderBottom:'2px solid black'}}  borderBottom='2px solid black' 
        _placeholder={{color:'black'}} onFocus={()=>setFloatingText(1)} 
          pt='45px' 
         onChange={handleQuestionChange} onBlur={handleSaveChanges}/>
     <HStack justifyContent='space-between' mt={'60px'}>
     {/* <Text color='gray.600' mt={5}  fontWeight='semibold' fontSize='lg'>Answears</Text>  */}
     <Text color='gray.600' mt={10}  fontWeight='semibold' fontSize='lg'>Mark good answers by click on id</Text> 
     </HStack>
     <Stack flexGrow={1} spacing={3} pt='15px' pb='10px'>
      {quizItem.answers.map((answear,index)=><AnswearComponent index={index+1} answear={answear} updateAnswear={updateAnswear}/>)}
      <HStack justifyContent='space-between' width='100%'>
     <Text  color='gray.600' fontWeight='semibold' fontSize='lg' cursor='pointer' onClick={handleAddNewAnswear}>
      Add next
      </Text>
      <Text  color='gray.600' fontWeight='semibold' fontSize='lg' cursor='pointer' onClick={handleRemoveLastAnswear}>
      {quizItem.answers.length==1?'delete':'Remove last '} 
      </Text>
      </HStack>
     </Stack>
      </Stack>
    </Stack>
  )
}

export default QuizItemBuilderComponent