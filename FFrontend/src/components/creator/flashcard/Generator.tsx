import { Flex, Textarea,Text, Button, Icon, HStack, Stack, useToast, ToastId } from '@chakra-ui/react'
import React, { ChangeEvent, useRef, useState } from 'react'
import { MdOutlineUploadFile } from "react-icons/md";
import ProcessingSpinner from '../../utils/ProcessingSpinner';
import useCreatorStore from '../../../creatorStore';
import GenerationService from '../../../services/GenerationService';


const apiClient = new GenerationService("/generate");
const Generator = () => {
    const creatorStore=useCreatorStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [inputText, setInputText] = React.useState<string>("");
    const [showSpinner,setShowSpinner]=useState(false);
    const toast = useToast()
    const toastIdRef = useRef<ToastId | undefined>();
    

    const generateFromText = () => {
      creatorStore.setFlashcards([]);
        setShowSpinner(true);
        apiClient.generateFlashcardsFromText(inputText,creatorStore.firstLanguage||'English',creatorStore.secondLanguage||'English')
        .then(res=>{creatorStore.setFlashcards(res.data)})
        .catch(()=>showToast("automatic generation failed, please try input text manually"))
        .finally(()=>setShowSpinner(false));
    };

    function showToast(message:string) {
        toastIdRef.current = toast({
          description: message,
          status: 'warning',
          duration: 2000,
          position:'bottom',
          containerStyle: {
            marginBottom: '100px',
          }
         })
      }

    const handleGenerateFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      creatorStore.setFlashcards([]);
        const file = event.target.files?.[0];
        setShowSpinner(true);
        apiClient.generateFlashcardsFromFile(file!,creatorStore.firstLanguage||'English',creatorStore.secondLanguage||'English')
        .then(res=>{console.log(res);creatorStore.setFlashcards(res.data)})
        .catch(err=>console.log(err))
        .finally(()=>setShowSpinner(false));
    };
    
    const openFileInput = () => {
        fileInputRef.current!.click();
    };

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(event.target.value);
      };

    const importButton= <Button width='200px' height='50px'  mt={3}
      bg='gray.300' border='2px solid black' onClick={openFileInput}>
      <Text  color='black'>generate from PDF</Text>
      <Icon as={MdOutlineUploadFile} color='black' boxSize={6} />
  </Button>

  const generateButton= <Button width='200px' height='50px'  mt={3}
      bg='gray.300' border='2px solid black' onClick={generateFromText}>
        <Text  color='black'>generate from text</Text>
    </Button>
            
  if(showSpinner){return <ProcessingSpinner/>}
  return (
    <>
    <input
          type="file"
          accept=".pdf"
          onChange={handleGenerateFromFile}
          ref={fileInputRef}
          style={{ display: "none" }} />

          <Flex flexDirection='column'>
              <Text mb={2}>paste your data below</Text>
              <Textarea value={inputText} onChange={handleInputChange}  border='2px solid gold' width='100%' height='300px'
                  _focus={{ border: '2px solid gold', boxShadow: 'none' }} _hover={{ border: '2px solid gold' }}>
              </Textarea>

              <Flex flexDirection={{base:'column',lg:'row'}} width='100%' justifyContent='space-between' mb={'100px'}>
            <Stack spacing={10}>
              
              </Stack>
              <HStack justifyContent='space-between' w={{base:'100%',lg:'auto'}} mt={{base:3,lg:1}} spacing={5} alignSelf='flex-start'>
              {generateButton}
              {importButton}
              </HStack>
              </Flex>

          </Flex></>
  )
}

export default Generator