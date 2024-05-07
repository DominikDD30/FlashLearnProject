import { Flex ,Stack,Text} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import JoinModal from './JoinModal'
import gameStartBg from '../../assets/game_bg.png'
import { useNavigate, useParams } from 'react-router-dom'
import useGameStore from '../../gameStore'

const JoinGamePanel = () => {
    const [showJoinWindow,setShowJoinWindow]=useState(true);
    const gameStore=useGameStore();
    const {uid}=useParams();
    const navigate=useNavigate();


    useEffect(()=>{
        if(gameStore.gameStarted) navigate("/game/"+uid!);
      },[gameStore.gameStarted]);
      
  return (
    <Flex width='100vw' flexDirection='column'  height='100vh' bgSize='cover' p='10px 5px' bgImage={gameStartBg}>
       
        <Text color='white'  mt='10%' width='100%' textAlign='center' fontSize='22px' fontWeight='500'>
            Type Your Nickname to join the game
        </Text>
        <JoinModal joinCode={uid!} open={showJoinWindow} close={()=>setShowJoinWindow(false)}/>
       
    </Flex>
  )
}

export default JoinGamePanel