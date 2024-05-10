import { Button, Center, Icon, Text } from '@chakra-ui/react'
import FlashcardBuilderComponent from './FlashcardBuilderComponent'
import { IoMdImages } from 'react-icons/io'
import {  useEffect, useState } from 'react'
import ApiClient from '../../../services/ApiClient';
import { FlashcardBuilder } from '../../../entities/FlashcardBuilder';
import ImageZoomModal from '../../ImageZoomModal';
import useCreatorStore from '../../../creatorStore';
import AudioPlayer from '../../AudioPlayer';
import { set } from 'react-hook-form';

const apiClient=new ApiClient("/pexel");



const FlashcardsCreator = () => {
    const creatorStore=useCreatorStore();
    const [selectedPhoto, setSelectedPhoto] = useState<string|null>(null);
    const flashcards=creatorStore.flashcards;

  

    const generateImages=()=>{
     
      const isSomeUncompletedCard=flashcards.filter(card=>!card.concept||!card.definition).length>0;
      console.log(flashcards);
      if(isSomeUncompletedCard) return;
      console.log(flashcards);
      const conceptsWithoutImage = flashcards
      .filter(card => !card.image)
      .map(card => card.concept)
      .filter(concept => concept !== undefined) as string[];
    
      apiClient.getImagesForFlashcards(conceptsWithoutImage)
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




      // const handleUpdateCard=(_index:number,concept:string,definition:string)=>{
      //   const card=flashcards.find((card,index)=>card.concept==concept);
      //   const cards=flashcards.filter((card,index)=>card.concept!=concept);
      //   cards.push({concept:concept.toLowerCase(),definition:definition.toLowerCase(),image:card?.image});
      //   creatorStore.setFlashcards(cards);
      // }
      const handleUpdateCard = (_index: number, concept: string, definition: string) => {
        console.log("index " + _index, " concept " + concept, " definition " + definition);
        
        const updatedCard = flashcards[_index];
        updatedCard.concept = concept.toLowerCase();
        updatedCard.definition = definition.toLowerCase();
        
        const updatedFlashcards = [...flashcards];
        updatedFlashcards[_index] = updatedCard;
        const sorted=updatedFlashcards.sort((a,b)=>a.tempId!-b.tempId!);
        creatorStore.setFlashcards(sorted);
    }
    
  
    

      const handleAddNew=()=>{
        creatorStore.addNewEmptyFlashcard();
      }

      const handleDelete=(id:number)=>{
        console.log(flashcards);
        console.log('delete card with id:',id);
        creatorStore.setFlashcards([...flashcards.filter(flashcard=>flashcard.tempId!=id).sort((a,b)=>a.tempId!-b.tempId!)]);
        // creatorStore.deleteFlashcard(concept);
      }
      
  return (
    <>
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
    <FlashcardBuilderComponent key={index}  saveChanges={(index,concept,definition)=>handleUpdateCard(card.tempId!,concept,definition)} 
    id={card.id||0} index={index} concept={card.concept} image={card.image} definition={card.definition} 
    handleDeleteCard={()=>handleDelete(card.tempId!)}
      handleImageClick={(url)=>setSelectedPhoto(url)}/>)}
      </>
  )
}

export default FlashcardsCreator