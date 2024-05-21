import { HStack, Input,Icon,Text, Stack, Center,Image } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react';
import { MdOutlineImage } from "react-icons/md";
import useCreatorStore from '../../../creatorStore';
import DeeplClient from '../../../services/DeeplClient';

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
const deeplClient=new DeeplClient(); 

const FlashcardBuilderComponent = ({id,index,concept,definition,image,handleImageClick,saveChanges,handleDeleteCard}:Props) => {
const [currentConcept,setConcept]=useState(concept);
const [currentDefinition,setDefinition]=useState(definition);
const [showTranslations,setShowTranslations]=useState(false);
const [translations,setTranslations]=useState<string[]>();
const conceptRef=useRef<HTMLInputElement>(null);
const definitionRef=useRef<HTMLInputElement>(null);
const creatorStore=useCreatorStore();
const isTranslatorEnabled=creatorStore.firstLanguage
&&creatorStore.secondLanguage
&&creatorStore.firstLanguage!==creatorStore.secondLanguage;


useEffect(()=>{
  // if(creatorStore.isUpdating)return;
  var inputElement = document.getElementById(`flashcard-input${creatorStore.flashcards.length-1}`);
  inputElement?.focus();
},[]);

  useEffect(()=>{
    setTranslations(undefined);
  },[creatorStore.firstLanguage,creatorStore.secondLanguage]);

    const handleConceptChange=()=>{
        if(conceptRef.current) setConcept(conceptRef.current.value);
        setTranslations(undefined);
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

    const handleShowTranslations=()=>{
      if(isTranslatorEnabled && currentConcept){
        if(!translations) {
          deeplClient.translateText(currentConcept,creatorStore.firstLanguage||'',creatorStore.secondLanguage||'EN-US')
          .then(res=>res.data)
          .then(data=>setTranslations([data.text]));
        }

        setShowTranslations(true);
      }
    }

    const handleSetFromTranslation=(index:number)=>{
     setDefinition(translations![index]);
      handleSaveChanges();
      setShowTranslations(false);
    }
  

    
  return (
    <Stack key={id} id={`flashcard${id}`} mt={10} position='relative' justifyContent='space-between' color='black' 
    pt='5px' pr='15px' pl='15px' pb='30px' borderRadius='5px' width='100%' minHeight='250px' bg='white'>
      <Stack>
      <Input ref={conceptRef}  id={`flashcard-input${index}`}  mt={1} value={currentConcept} variant='flushed' bg='white' size='lg'
       _focus={{boxShadow:'none',borderBottom:'2px solid black'}}  borderBottom='2px solid black'  
        _placeholder={{color:'black'}}   onChange={handleConceptChange} onBlur={handleSaveChanges}/>
      <Text color='gray.500' fontWeight='semibold'>Concept</Text>    
      </Stack>
      
      <HStack alignItems='flex-end' mb={showTranslations?0:5}>
      <Stack  width='80%'>
      <Input ref={definitionRef} value={currentDefinition}  variant='flushed'
       _focus={{boxShadow:'none',borderBottom:'2px solid black'}} borderBottom='2px solid black'   bg='white' 
       _placeholder={{color:'black'}} size='lg' onClick={handleShowTranslations}
        onChange={handleDefinitionChange} onBlur={()=>{handleSaveChanges();setTimeout(()=>setShowTranslations(false),400)}}/>
      <Text color='gray.500' fontWeight='semibold'>Definition</Text>
      </Stack>

      <Center boxSize='60px' ml='10px' cursor={image?'pointer':'default'}  mb='40px' border={image?'2px solid gray':'2px dashed gray'}>
        {image?<Image src={image} objectFit='cover' width='100%' height='100%' onClick={() => handleImageClick(image!)}/>
         :<Stack alignItems='center' spacing={0}><Icon as={MdOutlineImage}  boxSize={6}/><Text fontSize='14px'>Picture</Text></Stack>}
      </Center>

      </HStack>

       {showTranslations&&
      <Stack spacing={2} mb={5}>
      {translations?.map((translation,index)=>
      <Text key={index} bg='gray.400' cursor='pointer' pl='5px' 
        lineHeight='40px' height='40px' color='black' mt={2}
          fontSize='sm' _hover={{bg:'gray.500'}}
          onClick={()=>handleSetFromTranslation(index)}>
        {translation}
        </Text>)}
      </Stack>
      }

      <Text  color='red.600' fontWeight='semibold' fontSize='lg' cursor='pointer'
      position='absolute' bottom='10px' onClick={handleDeleteCard}>
        delete
      </Text>
      <Text position='absolute' bottom='10px' color='gray.400' right='20px' fontSize='lg'
       fontWeight='semibold'>{index+1}</Text>

     

    </Stack>
  )
}

export default FlashcardBuilderComponent