import { Checkbox, HStack, Stack ,Text} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Answear } from '../../entities/QuizItemBuilder'

interface Props{
  answers:{checked:boolean,answer:Answear}[];
  showCorrect?:boolean;
  handleCheckboxChange:(id:number)=>void;
}

const QuizAnswers= ({answers,showCorrect,handleCheckboxChange}:Props) => {
  // const [currentAnswers,setCurrentAnswers]=useState<{checked:boolean,answer:Answear}[]>(answers);

  // useEffect(()=>{
  //   setCurrentAnswers(answers);
  //   console.log('answers changed '+answers)
  // },[answers]); 
 
  return (
    <Stack>
    {answers.map((answer,index)=>
    <HStack key={index} bg={showCorrect?answer.answer.isCorrect?'green.200':'red.200':'auto'}>
    {/* <HStack key={index} bg={showCorrect?answer.checked&&answer.answer.isCorrect?'green.200':!answer.checked&&!answer.answer.isCorrect?'green.200':'red.200':'auto'}> */}
      <Checkbox borderColor='var(--chakra-colors-gray-500)' colorScheme='blue'  bg='white'
       isChecked={answer.checked}  onChange={() => handleCheckboxChange(index)}/>
      <Text key={index}>{answer.answer.value}</Text></HStack>)}
  </Stack>
  )
}

export default QuizAnswers