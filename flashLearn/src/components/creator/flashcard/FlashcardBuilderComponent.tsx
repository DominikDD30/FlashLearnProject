import { HStack, Input,Icon,Text, Stack, Center,Image } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react';
import { MdOutlineImage } from "react-icons/md";
import useCreatorStore from '../../../creatorStore';

interface Props{
    id:number;
    index:number;
    concept?:string;
    definition?:string;
    image?:string;
    handleImageClick:(url:string)=>void;
    saveChanges:(index:number,concept:string,definition:string)=>void;
    handleDeleteCard:()=>void;
}
const FlashcardBuilderComponent = ({id,index,concept,definition,image,handleImageClick,saveChanges,handleDeleteCard}:Props) => {
const [currentConcept,setConcept]=useState(concept);
const [currentDefinition,setDefinition]=useState(definition);
const conceptRef=useRef<HTMLInputElement>(null);
const definitionRef=useRef<HTMLInputElement>(null);
const creatorStore=useCreatorStore();

useEffect(()=>{
  // if(creatorStore.isUpdating)return;
  var inputElement = document.getElementById(`flashcard-input${creatorStore.flashcards.length-1}`);
  inputElement?.focus();
},[]);

    const handleConceptChange=()=>{
        if(conceptRef.current) setConcept(conceptRef.current.value);
    }

    const handleDefinitionChange=()=>{
        if(definitionRef.current) setDefinition(definitionRef.current.value);
    }

    const handleSaveChanges=()=>{
        const concept=conceptRef.current;
        const definition=definitionRef.current;
        if(concept&&definition&&concept.value&&definition.value){
        saveChanges(index,concept.value,definition.value);
        }
    }
    
    // const handleDeleteCard=()=>{
    //   creatorStore.deleteFlashcard(id,concept!);
    //   console.log('delete card with id:',id);
    //   console.log(creatorStore.flashcards);
    // }

    
  return (
    <Stack key={id} id={`flashcard${id}`} mt={10} position='relative' justifyContent='space-between' color='black' 
    pt='5px' pr='15px' pl='15px' pb='30px' borderRadius='5px' width='100%' height='250px' bg='white'>
      <Stack>
      <Input ref={conceptRef}  id={`flashcard-input${index}`}  mt={1} value={currentConcept} variant='flushed' bg='white' size='lg'
       _focus={{boxShadow:'none',borderBottom:'2px solid black'}}  borderBottom='2px solid black'  
        _placeholder={{color:'black'}}   onChange={handleConceptChange} onBlur={handleSaveChanges}/>
      <Text color='gray.500' fontWeight='semibold'>Concept</Text>    
      </Stack>
      
      <HStack >
      <Stack  width='80%'>
      <Input ref={definitionRef} value={currentDefinition}  variant='flushed'
       _focus={{boxShadow:'none',borderBottom:'2px solid black'}} borderBottom='2px solid black'   bg='white' 
       _placeholder={{color:'black'}} size='lg' onChange={handleDefinitionChange} onBlur={handleSaveChanges}/>
      <Text color='gray.500' fontWeight='semibold'>Definition</Text>   
      </Stack>
      <Center boxSize='60px' ml='10px' cursor={image?'pointer':'default'}  mb='60px' border={image?'2px solid gray':'2px dashed gray'}>
        {image?<Image src={image} objectFit='cover' width='100%' height='100%' onClick={() => handleImageClick(image!)}/>
         :<Stack alignItems='center' spacing={0}><Icon as={MdOutlineImage}  boxSize={6}/><Text fontSize='14px'>Picture</Text></Stack>}
      </Center>

      <Text  color='red.600' fontWeight='semibold' fontSize='lg' cursor='pointer'
      position='absolute' bottom='10px' onClick={handleDeleteCard}>
        delete
      </Text>
      <Text position='absolute' bottom='10px' color='gray.400' right='20px' fontSize='lg'
       fontWeight='semibold'>{index+1}</Text>
      
      </HStack>
    </Stack>
  )
}

export default FlashcardBuilderComponent