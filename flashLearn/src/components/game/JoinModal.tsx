import React from 'react'
import { Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react';
import GameClient from './GameClient';
import useGameStore from '../../gameStore';
import { useNavigate } from 'react-router-dom';

interface Props{
    open:boolean;
    close:()=>void;
    joinCode:string;
}
const JoinModal = ({open,close,joinCode}:Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef<HTMLInputElement>(null);
    const navigate=useNavigate();
    // const joinCodeRef = React.useRef<HTMLInputElement>(null);
    const { joinGame } = GameClient();
    const gameStore=useGameStore();

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'&&initialRef.current?.value) {
          gameStore.setPlayerName(initialRef.current.value);
          joinGame(joinCode,initialRef.current.value);
          close();
          
        }
      };
    const handleJoinGame=()=>{
        if(initialRef.current?.value){
          gameStore.setPlayerId("second");
          gameStore.setPlayerName(initialRef.current.value);
          joinGame(joinCode,initialRef.current.value);
          close();
          
      };
    }
  return (
    <Modal size='md' onClose={()=>{onClose();close()}} isOpen={open}    initialFocusRef={initialRef}
         closeOnOverlayClick={true}>
        <ModalOverlay />
        <ModalContent margin='auto auto' width='300px' height='200px'  pt='20px' borderRadius='10px' 
        border='1px solid gray' bg='gray.800'>
        <ModalBody>
        <Stack> 
        <ModalCloseButton _focus={{boxShadow:'none'}} />

        {/* <Text>Nick</Text> */}
        <Input ref={initialRef} mb={3} mt={5} placeholder='Nick..'  onKeyDown={handleKeyPress}
        _focus={{border:'1px solid var(--chakra-colors-gray-400)',boxShadow:'none'}}  border='1px solid gray'/>

        {/* <Text>Join Code</Text> */}
        {/* <HStack spacing={4}> */}
        {/* <Input ref={joinCodeRef} placeholder='gh43e..'  onKeyDown={handleKeyPress}
        _focus={{border:'1px solid var(--chakra-colors-gray-400)',boxShadow:'none'}}  border='1px solid gray'/> */}
        <Button border='1px solid gray' width='100%' onClick={handleJoinGame}>join</Button>
        {/* </HStack> */}
        </Stack>
        </ModalBody>
        </ModalContent>
        </Modal>
  )
}

export default JoinModal