import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../services/ApiClient';
import { FlashcardBuilder } from '../entities/FlashcardBuilder';
import { Button, Center, Icon,Text, Input, Box, useMediaQuery } from '@chakra-ui/react';
import ImageZoomModal from '../components/ImageZoomModal';
import FlashcardBuilderComponent from '../components/creator/flashcard/FlashcardBuilderComponent';
import { IoMdImages } from 'react-icons/io';
import useFlashcardSet from '../hooks/useFlashcardSet';
import useCreatorStore from '../creatorStore';
import { set } from 'react-hook-form';


const apiClient = new ApiClient('/flashcards');
const pexelClient = new ApiClient('/pexel');
const EditFlashcards = () => {
    const {setId}=useParams();
    const creatorStore=useCreatorStore();
    const [setName,setSetName]=React.useState('');
    const [selectedPhoto, setSelectedPhoto] = useState<string|null>(null);
    // const set= useFlashcardSet(parseInt(setId!));
    const setNameRef=useRef<HTMLInputElement>(null);
    const flashcards=creatorStore.flashcards;
    const navigate=useNavigate();
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');



  useEffect(()=>{
      apiClient.getFlashcardSet(parseInt(setId!)).then(set1=>{
        creatorStore.setSetName(set1.setName);
        setSetName(set1.setName);
        creatorStore.setFlashcards(set1.flashcards.sort((c1,c2)=>c1.id-c2.id));
        creatorStore.setisUpdating(true);
      })
  },[]);
 

    const changeSetName=()=>{
      if(setNameRef.current&&setNameRef.current.value){
        creatorStore.setSetName(setNameRef.current.value);
      }
    }

    const generateImages=()=>{
      const isSomeUncompletedCard=flashcards.filter(card=>!card.concept||!card.definition).length>0;
      if(isSomeUncompletedCard) return;
      const conceptsWithoutImage = flashcards
      .filter(card => !card.image)
      .map(card => card.concept)
      .filter(concept => concept !== undefined) as string[];
      console.log(conceptsWithoutImage);
    
      pexelClient.getImagesForFlashcards(conceptsWithoutImage)
      .then(data => {
        const updatedFlashcards = flashcards.map(card => {
          const imageData = data.find(item => item.concept === card.concept);
          if (imageData) {
            return { ...card, image: imageData.image };
          } else {
            return card;
          }
        });
        creatorStore.setFlashcards(updatedFlashcards);
      })
      .catch(error => {
        console.error("Error whiel fethcing pictures:", error);
      });
    }

    const handleUpdate= ()=>{
    
      if(flashcards.length>2&&setName){
         apiClient.updateFlashcardsSet(parseInt(setId!),setName,flashcards).then(()=>{
          navigate("/flashcards");
          creatorStore.reset();
         });
      }
    else{
      //toast
      }
    }


    const handleSetNameChange=()=>{
      if(setNameRef.current) setSetName(setNameRef.current.value);
  }
  const handleUpdateCard = (_index: number, concept: string, definition: string) => {
    console.log("index " + _index, " concept " + concept, " definition " + definition);
    
    const updatedCard = flashcards[_index];
    updatedCard.concept = concept.toLowerCase();
    updatedCard.definition = definition.toLowerCase();
    
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[_index] = updatedCard;
    
    creatorStore.setFlashcards(updatedFlashcards);
}

  const handleAddNew=()=>{
    creatorStore.addNewEmptyFlashcard();
  }

    const handleDeleteCard=(id:number)=>{
      creatorStore.setFlashcards([...flashcards.filter(flashcard=>flashcard.id!=id)]);
    }
  return (
    <Box mr='auto' ml='auto' width={isLargerThan1200?'60%':'100%'}>
    <Input mt={5} ref={setNameRef} value={setName} onChange={handleSetNameChange} _focus={{boxShadow:'none',border:'none',borderBottom:'1px solid black'}} 
    placeholder='title..' bg='white' _placeholder={{color:'black'}} color='black' size='lg' onBlur={changeSetName}/>

    <Center  position='fixed' bg='orange.400' zIndex={1} bottom='20px' right='5px' color='white'
    boxSize='50px' borderRadius='50%' fontSize='35px' cursor='pointer' onClick={handleAddNew}>
      +
    </Center>
    <ImageZoomModal selectedPhoto={selectedPhoto} closeModal={() =>setSelectedPhoto(null)}/>
    <Button width='60%' height='40px' mt={5} bg='gray.300' border='2px solid black'>
        <Text mr={2} color='black' onClick={generateImages}>generate images</Text>
        <Icon as={IoMdImages} color='black' boxSize={6}/>
    </Button>
    {flashcards.map((card,index)=>
    <FlashcardBuilderComponent key={card.id}  saveChanges={(index,concept,definition)=>handleUpdateCard(index,concept,definition)} 
    id={card.id} index={index} concept={card.concept} image={card.image} definition={card.definition} handleDeleteCard={()=>handleDeleteCard(card.id)}
      handleImageClick={(url)=>setSelectedPhoto(url)}/>)}
      <Button width='100%' height='40px' mt={10} mb={5} bg='gray.300' color='black' 
    border='2px solid black'onClick={handleUpdate}>
      update set
    </Button>
    </Box>
  )
}

export default EditFlashcards