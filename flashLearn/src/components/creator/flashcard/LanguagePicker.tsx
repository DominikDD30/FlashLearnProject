import { HStack,Text, Select, Stack } from '@chakra-ui/react'
import React from 'react'
import useCreatorStore from '../../../creatorStore';
import { languages } from '../../../entities/Languages';


const LanguagePicker = () => {
    const creatorStore=useCreatorStore();
    const languagesMap = languages;
    
    const handleFirstLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        creatorStore.setFirstLanguage(languagesMap.find(l=>l.name==event.target.value)!.code);
    }

    const handleSecondLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      creatorStore.setSecondLanguage(languagesMap.find(l=>l.name==event.target.value)!.code);
    }

  return (
    <Stack spacing={3} flexDirection={{base:'column',lg:'row'}}>
    <HStack  alignItems='center'>
    <Text  fontSize='xl' textAlign='left'>first language:</Text>
    <Select  onChange={handleFirstLanguageChange} width='150px'  border='1px solid gray' _hover={{cursor: 'default'}} _focus={{borderColor: 'gray'}} >
        <option value='' style={{background: 'white'}}>Select language</option>
      {languagesMap.map((language, index) => (
        <option key={index} style={{background: 'white'}}>{language.name}</option>
      ))}
    </Select>
    </HStack >
    <HStack ml={{base:0,lg:5}} alignItems='center'>
    <Text   fontSize='xl' textAlign='left' >second language:</Text>
    <Select onChange={handleSecondLanguageChange}  width='150px'  border='1px solid gray' _hover={{cursor: 'default'}} _focus={{borderColor: 'gray'}} maxHeight='200px'>
    <option value='' style={{background: 'white'}}>Select language</option>
      {languagesMap.map((language, index) => (
        
        <option key={index} style={{background: 'white'}}>{language.name}</option>
      ))}
    </Select>
    </HStack>
    </Stack>
  )
}

export default LanguagePicker