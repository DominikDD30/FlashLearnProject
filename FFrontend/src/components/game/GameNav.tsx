import { Center, Flex, Icon,Text } from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa'
import useGameStore from '../../gameStore'

interface Props{
    firstPlayerPoints:number;
    secondPlayerPoints:number;
    endGame:()=>void;
}

const GameNav = ({firstPlayerPoints,secondPlayerPoints,endGame}:Props) => {
    const gameStore=useGameStore();
   
  return (
    <Flex position='fixed' top='0' left='1%' right='1%' width='98%'  height='60px'
    borderRadius='0px 0px 20px 20px' bg='#ff5f00' justifyContent='space-between' >
   <Flex alignItems='center' pl='10px'  w='50%' borderRadius='0px 0px 0px 20px'>
       <Icon mr={3} as={FaUserCircle} boxSize={10} color='gray.300'/>
       <Center height='80%' w='100px' bg='blue.500' borderRadius='10px' boxShadow='dark-lg'>
           <Text>Owner<Text as='span' ml={2} fontSize='xl' fontWeight='600'>{firstPlayerPoints}</Text></Text>
       </Center>
   </Flex>

   <Center width='200px' height='60%' margin='auto' bg='#ffbb99' borderRadius='20px'  cursor='pointer' 
   _hover={{fontSize:'17px',bg:'#ff7f00'}} onClick={endGame}>
    Give Up Game
    </Center>

   <Flex alignItems='center' pr='10px' justifyContent='flex-end'  w='50%' borderRadius='0px 0px 20px 0px'>
       <Center height='80%' w='100px'  bg='red' borderRadius='10px' boxShadow='dark-lg'>
           <Text><Text as='span' mr={2} fontSize='xl' fontWeight='600'>{secondPlayerPoints}</Text>{gameStore.secondPlayerName!='owner'?gameStore.secondPlayerName:gameStore.playerName}</Text>
       </Center>
       <Icon ml={3} as={FaUserCircle} boxSize={10} color='gray.300'/>
   </Flex>
   </Flex>
  )
}

export default GameNav