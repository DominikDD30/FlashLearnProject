import { Flex, Textarea,Text, Button, Icon, HStack, Stack, RadioGroup, Radio, useToast, ToastId } from '@chakra-ui/react'
import React, { ChangeEvent, useRef, useState } from 'react'
import { MdOutlineUploadFile } from "react-icons/md";
import ApiClient from '../../../services/ApiClient';
import ProcessingSpinner from '../../utils/ProcessingSpinner';
import useCreatorStore from '../../../creatorStore';


const apiClient = new ApiClient("/generate");
const Generator = () => {
    const creatorStore=useCreatorStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [inputText, setInputText] = React.useState<string>("");
    const [showSpinner,setShowSpinner]=useState(false);
    const [conceptDefinitionSeparator, setConceptDefinitionSeparator] = useState<string>("not");
    const [flashcardSeparator, setFlashcardSeparator] = useState<string>("newLine");
    const toast = useToast()
    const toastIdRef = useRef<ToastId | undefined>();
    

    const generate = () => {
        setShowSpinner(true);
        apiClient.generateFlashcards(inputText,conceptDefinitionSeparator,flashcardSeparator)
        .then(res=>{console.log(res);creatorStore.setFlashcards(res)})
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

    const handleImportDataAndOcr = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setShowSpinner(true);
        apiClient.ocrFile(file!)
        .then(res=>{console.log(res);setInputText(res)})
        .catch(err=>console.log(err))
        .finally(()=>setShowSpinner(false));
    };
    
    const openFileInput = () => {
        fileInputRef.current!.click();
    };

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(event.target.value);
      };

    const importButton= <Button width='140px' height='50px'  mt={3}
      bg='gray.300' border='2px solid black' onClick={openFileInput}>
      <Text  color='black'>import</Text>
      <Icon as={MdOutlineUploadFile} color='black' boxSize={6} />
  </Button>

  const generateButton= <Button width='140px' height='50px'  mt={3}
      bg='gray.300' border='2px solid black' onClick={generate}>
        <Text  color='black'>generate</Text>
    </Button>
            
  if(showSpinner){return <ProcessingSpinner/>}
  return (
    <>
    <input
          type="file"
          accept=".pdf"
          onChange={handleImportDataAndOcr}
          ref={fileInputRef}
          style={{ display: "none" }} />

          <Flex flexDirection='column'>
              <Text mb={2}>paste your date below or import it from your image</Text>
              <Textarea value={inputText} onChange={handleInputChange}  border='2px solid gold' width='100%' height='300px'
                  _focus={{ border: '2px solid gold', boxShadow: 'none' }} _hover={{ border: '2px solid gold' }}>
              </Textarea>

              <Flex flexDirection={{base:'column',lg:'row'}} width='100%' justifyContent='space-between' mb={'100px'}>
            <Stack spacing={10}>
              <Stack mt={3}>
                <Text  whiteSpace='nowrap'>Between concept and definition</Text>
                
                <RadioGroup onChange={(value)=>setConceptDefinitionSeparator(value)} value={conceptDefinitionSeparator}>
                    <Stack direction='row'>
                        <Radio border='2px solid gold' value='not'>None</Radio>
                        <Radio border='2px solid gold' value='space'>Space</Radio>
                        <Radio border='2px solid gold' value=','>Comma</Radio>
                    </Stack>
                </RadioGroup>
              </Stack>
              <hr style={{borderBottom:'2px dotted gray',width:'100%'}}/>
              <Stack>
              <Text whiteSpace='nowrap'>Between flashcards</Text>
              <RadioGroup onChange={(value)=>setFlashcardSeparator(value)} value={flashcardSeparator}>
                    <Stack direction='row'>
                        <Radio border='2px solid gold' value='newLine'>New line</Radio>
                        <Radio border='2px solid gold' value=';'>semicolon</Radio>
                    </Stack>
                </RadioGroup>
              </Stack>
              </Stack>
              <HStack justifyContent='space-between' w={{base:'100%',lg:'auto'}} mt={{base:3,lg:1}} spacing={5} alignSelf='flex-start'>
              {importButton}
              {generateButton}
              </HStack>
              </Flex>

          </Flex></>
  )
}

export default Generator