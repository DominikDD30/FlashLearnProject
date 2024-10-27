import React from 'react'
import FlashcardsSet from '../entities/FlashcardsSet'
import { Box, Flex, HStack, Icon,Text, Stack, Alert, AlertIcon } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, EditIcon, HamburgerIcon, LinkIcon } from '@chakra-ui/icons';
import { FaGamepad } from "react-icons/fa";
import { TbCards } from "react-icons/tb";
import ConfirmationModal from './utils/ConfirmationModal';
import ApiClient from '../services/ApiClient';
import useUserStore from '../userStore';

interface Props{
    set:FlashcardsSet;
    owner:string;
}
const apiClient=new ApiClient("/flashcards");
const FlashcardsSetComponent = ({set,owner}:Props) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [showConfirmation,setShowConfirmation]=React.useState(false);
  const [showCopiedAlert,setShowCopiedAlert]=React.useState(false);
  const userStore=useUserStore();
  const navigate=useNavigate();

  const handleCopiedLink=()=>{
    navigator.clipboard.writeText('http://localhost:5174/share/'+set.shareCode);
    setShowMenu(false);
    setShowCopiedAlert(true);
    setTimeout(()=>setShowCopiedAlert(false),2000);
  }

  const handleDelete=()=>{
    apiClient.deleteFlashcardsSet(set.id);
    userStore.triggerRefetch();
}
  

  const menu= <Stack justifyContent='space-evenly'  left={showMenu?'0':'100%'} transition='0.7s' position='absolute' margin='-20px 0px' height='100%'
   border='2px solid gray' bg='gray.200' borderRadius='15px' padding='10px' width='100%' cursor='pointer' >
    <HStack onClick={()=>navigate('/learn/flashcard/'+set.id)}>
       <Icon boxSize={5} as={TbCards}/><Text ml={1} fontSize='lg'>flashcards</Text>
    </HStack>
    {set.flashcardsAmount > 5&&<HStack onClick={()=>navigate(`/game/creator/${set.id}/${set.flashcardsAmount}`)}>
       <Icon boxSize={5} as={FaGamepad}/> <Text ml={1}  fontSize='lg'> memory game</Text>
    </HStack>}
    <HStack onClick={handleCopiedLink}> 
      <Icon boxSize={5} as={LinkIcon}/><Text ml={1}  fontSize='lg'>share</Text>
    </HStack>
    <HStack onClick={()=>navigate('/editFlashcards/'+set.id)}>
       <Icon boxSize={5} as={EditIcon}/><Text ml={1}  fontSize='lg'>edit</Text>
    </HStack>
    <HStack onClick={()=>setShowConfirmation(true)}>
       <Icon boxSize={5} as={DeleteIcon}/><Text ml={1}  fontSize='lg'>delete</Text>
    </HStack>
  </Stack>
  return (
    <>
    {showCopiedAlert&&<Alert variant='solid' zIndex={3} status='success' color='white' position='fixed' top='20%' left='0%'>
    <AlertIcon />
    Link copied to clipboard
    </Alert>}
    <ConfirmationModal open={showConfirmation} close={()=>{setShowConfirmation(false);setShowMenu(false)}} confirmed={handleDelete}/>
    <Stack position='relative' height='200px' border='2px solid gray' overflow='hidden' borderRadius='15px' padding='20px' width='100%'> 
     {menu}
        <Text fontWeight='500' width='80%'>{set.setName}</Text>
        <Icon position='absolute' top='10px' right='10px' as={HamburgerIcon} boxSize={6} color='gray.600'
         cursor='pointer' onClick={()=>setShowMenu(!showMenu)}/>
        <Flex mt={1}> <Box bg='gray.200' border='2px solid var(--chakra-colors-gray-300)' height='30px' p='0 10px' color='gray.600'
         lineHeight='25px' borderRadius='10px'>{set.flashcardsAmount} cards</Box></Flex>
        <HStack mt='auto'><Icon as={FaUserCircle} boxSize={10} color='gray.600'/><Text>{owner}</Text></HStack>
      </Stack>
      </>
  )
}

export default FlashcardsSetComponent