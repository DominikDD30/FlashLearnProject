import React, { useEffect } from 'react'
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react';
import socket from '../../../socket';
import { useNavigate } from 'react-router-dom';
import useGameStore from '../../gameStore';

interface Props{
    open:boolean;
    close:()=>void;
    roomName:string;
}
const JoinModal = ({open,close,roomName: roomName}:Props) => {
    const { onClose } = useDisclosure();
    const initialRef = React.useRef<HTMLInputElement>(null);
    const gameStore=useGameStore();
    const navigate=useNavigate();


    useEffect(() => {
      socket.on('init_game', (_roomName:string,setId:number,pairs:number,players:string[]) => {
        navigate("/game/"+_roomName); 
        gameStore.setSetId(setId);
        gameStore.setRoomName(_roomName);
        gameStore.setPairs(pairs);
        gameStore.setplayers(players);
        gameStore.setplayerName(initialRef.current!.value);
        gameStore.setSecondPlayerName('owner');
      });
    }, []);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'&&initialRef.current?.value) {
          joinGame(roomName,initialRef.current.value);
          close();
        }
      };
    const handleJoinGame=()=>{
        if(initialRef.current?.value){
          joinGame(roomName,initialRef.current.value);
          close();
      }
    }

    const joinGame=(roomName:string,nick:string)=>{
      socket.emit('join_room', roomName,nick, (isSuccess:boolean) => {
        if (!isSuccess) {
          alert('Room does not exist');
        }
      });
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

          <Input ref={initialRef} mb={3} mt={5} placeholder='Nick..'  onKeyDown={handleKeyPress}
          _focus={{border:'1px solid var(--chakra-colors-gray-400)',boxShadow:'none'}}  border='1px solid gray'/>

          <Button border='1px solid gray' width='100%' onClick={handleJoinGame}>join</Button>
        </Stack>
      </ModalBody>
     </ModalContent>
    </Modal>
  )
}

export default JoinModal