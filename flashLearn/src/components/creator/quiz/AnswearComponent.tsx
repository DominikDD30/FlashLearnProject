import { Center, HStack,Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { Answear } from '../../../entities/QuizItemBuilder'

interface Props{
    answear:Answear;
    index:number;
    updateAnswear:(answear:Answear)=>void;
}
const AnswearComponent = ({answear,index,updateAnswear}:Props) => {
    const [text,setText]=useState(answear.value);
    const [isCorrect,setIsCorrect]=useState(answear.isCorrect);
    const textAreaRef=useRef<HTMLTextAreaElement>(null);
    
    const handleChange=()=>{
        if(textAreaRef.current){
        setText(textAreaRef.current.value);
        }
    }

    const handleCheckBox=()=>{
        updateAnswear({id:answear.id,value:answear.value,isCorrect:!answear.isCorrect});
        setIsCorrect(!isCorrect);
    }

    const handleUpdate=()=>{
        updateAnswear({id:answear.id,value:text,isCorrect:answear.isCorrect});
    }

  return (
    <HStack>
      <Text color='gray.500' width='15px'  fontWeight='semibold' fontSize='xl' onClick={handleCheckBox}>{index}</Text>
      <textarea  ref={textAreaRef} id={'answear'+answear.id} value={text} 
      style={{height:'60px',width:'100%', background:'white',border:`${isCorrect?'1px solid gray':'1px solid red'}`}}
      onChange={handleChange} onBlur={handleUpdate}/>
      </HStack>
  )
}

export default AnswearComponent