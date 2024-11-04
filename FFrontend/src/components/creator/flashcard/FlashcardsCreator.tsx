import { Button, Center, Icon, Stack, Text, ToastId, useToast } from '@chakra-ui/react'
import FlashcardBuilderComponent from './FlashcardBuilderComponent'
import { IoMdImages } from 'react-icons/io'
import { FaCogs } from "react-icons/fa";
import {  useRef, useState } from 'react'
import ApiClient from '../../../services/ApiClient';
import ImageZoomModal from '../../utils/ImageZoomModal';
import useCreatorStore from '../../../creatorStore';
import Generator from './Generator';
import LanguagePicker from './LanguagePicker';
import { languages } from '../../../entities/Languages';

const apiClient=new ApiClient("/pexel");



const FlashcardsCreator = () => {
    const creatorStore=useCreatorStore();
    const [selectedPhoto, setSelectedPhoto] = useState<string|null>(null);
    const [showFlashcardGenerator, setShowFlashcardGenerator] = useState<boolean>(false);
    const toast = useToast()
    const toastIdRef = useRef<ToastId | undefined>();
    const flashcards=creatorStore.flashcards;

  

    
    const generateImages=()=>{
      const language=languages.find(l=>l.code==creatorStore.firstLanguage)?.pexelCode;
      if(!language){
        
        showToast();
        return;
      }
      const isSomeUncompletedCard=flashcards.filter(card=>!card.concept||!card.definition).length>0;
      console.log(flashcards);
      if(isSomeUncompletedCard) return;
      console.log(flashcards);
      const conceptsWithoutImage = flashcards
      .filter(card => !card.image)
      .map(card => card.concept)
      .filter(concept => concept !== undefined) as string[];
    
      apiClient.getImagesForFlashcards(conceptsWithoutImage,language,3)
      .then(res=>res.data)
      .then(data=>{
          const updatedFlashcards = flashcards.map(card => {
            const imageData = data.find(item => item.concept === card.concept);
            if (imageData) {
              return { ...card, image: imageData.image };
            } else {
              return card;
            }
          });
          creatorStore.setFlashcards(updatedFlashcards);
        }
      ).catch(error => {
        console.error("Error while fetching pictures:", error);
      });
    }
      
      

      const handleUpdateCard = (id: number, concept: string, definition: string) => {
        const updatedCard = flashcards[id];
        updatedCard.concept = concept.toLowerCase();
        updatedCard.definition = definition.toLowerCase();
        
        const updatedFlashcards = [...flashcards];
        updatedFlashcards[id] = updatedCard;
        const sorted=updatedFlashcards.sort((a,b)=>a.tempId!-b.tempId!);
        creatorStore.setFlashcards(sorted);
    }
    
  
      const handleAddNew=()=>{
        creatorStore.addNewEmptyFlashcard();
      }

      const handleDelete=(id:number)=>{
        creatorStore.setFlashcards([...flashcards.filter(flashcard=>flashcard.tempId!=id).sort((a,b)=>a.tempId!-b.tempId!)]);
      }
    
      function showToast() {
        toastIdRef.current = toast({
          description: 'Language is either not selected or wrong, generating images currently supports: English, German, French, Italian, Polish, Spanish Please select one of them in the language picker',
          status: 'warning',
          duration: 6000,
          position:'bottom',
          containerStyle: {
            marginBottom: '100px',
          }
         })
      }
      

  return (
    <>
    <Center  position='fixed' bg='orange.400' zIndex={1} bottom='20px' right='5px' color='white'
    boxSize='50px' borderRadius='50%' fontSize='35px' cursor='pointer' onClick={handleAddNew}>
      +
    </Center>
    <ImageZoomModal selectedPhoto={selectedPhoto} closeModal={() =>setSelectedPhoto(null)}/>
    <Stack mb={10}>
    <Button width={{base:'auto',lg:'40%'}} height='40px' mt={5} bg='gray.300' border='2px solid black' onClick={generateImages}>
        <Text mr={2} color='black' >generate images</Text>
        <Icon as={IoMdImages} color='black' boxSize={6}/>
    </Button>
    <Button  width={{base:'auto',lg:'40%'}} height='40px' mt={5} bg='gray.300' border='2px solid black'
    onClick={()=>setShowFlashcardGenerator(!showFlashcardGenerator)}>
        <Text mr={2} color='black' >{showFlashcardGenerator?'hide generator':'show flashcards generator'}</Text>
        {!showFlashcardGenerator&&<Icon as={FaCogs} color='black' boxSize={6}/>}
    </Button>
    </Stack>
    {showFlashcardGenerator&&<Generator/>}

    <LanguagePicker/>

    {flashcards.map((card,index)=>
    <FlashcardBuilderComponent key={index}  saveChanges={(id,concept,definition)=>handleUpdateCard(card.id!,concept,definition)} 
    id={card.id||0} index={index} concept={card.concept} image={card.image} definition={card.definition} 
    handleDeleteCard={()=>handleDelete(card.tempId!)}
      handleImageClick={(url)=>setSelectedPhoto(url)}/>)}
      </>
  )
}

export default FlashcardsCreator