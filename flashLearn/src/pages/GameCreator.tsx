import { Center, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import { FcFlashOn } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import gameStartBg from '../assets/game_bg.png'
import JoinModal from '../components/game/JoinModal';
import ApiGameClient from '../services/ApiGameClient';
import useGameStore from '../gameStore';
import useSoloGameStore from '../soloGameStore';
import GameClient from '../components/game/GameClient';


const gameApiClient=new ApiGameClient();
const GameCreator = () => {
    const {setId,setSize}=useParams();
    const gameStore=useGameStore();
    const soloGameStore=useSoloGameStore();
    const navigate=useNavigate();
    const [selectedDifculity,setDificulity]=useState<{name:'',value:0}>();
    const [dificulityError,setDificulityError]=useState(false);
    const [showJoinWindow,setShowJoinWindow]=useState(false);
    const [inviteCode,setInviteCode]=useState<null|string>(null);
    const { joinGame } = GameClient();
    
    const difficultyLevels = getDifficultyLevels(parseInt(setSize!));

    useEffect(()=>{
      console.log("zaczynamy , kod "+inviteCode!);
      console.log("game started "+gameStore.gameStarted);
      if(gameStore.gameStarted) navigate("/game/"+inviteCode!);
    },[gameStore.gameStarted]);

    const handlePlaySolo=async ()=>{
      if(!selectedDifculity){setDificulityError(true); return}
      soloGameStore.setDificulity(selectedDifculity.value);
        soloGameStore.setSetId(parseInt(setId!));
        navigate("/game/solo"); 
    }
    const handleInvitePlayer=async ()=>{
      if(!selectedDifculity){setDificulityError(true); return}
      await gameApiClient.createRoom(parseInt(setId!),selectedDifculity.value).then(data=>{
        gameStore.setPlayerId("first");
        setInviteCode(data.joinCode);
      });    
    }
    // const handleShowJoinWindow=()=>{
    //   setInviteCode(null);
    //    setShowJoinWindow(true);
    // }
  return (
    <Flex width='100vw' flexDirection='column' height='100vh' bgSize='cover' p='10px 5px' bgImage={gameStartBg}>
        <Text color='white' mt='10%' width='100%' textAlign='center' fontSize='22px' fontWeight='500'>
            Flashlearn Memory Game <Icon as={FcFlashOn} boxSize={{base:6,lg:8}}/>
        </Text>
        <Text width='100%' fontSize='lg' textAlign='center' mt='50px' mb='20px'>Choose dificulity level</Text>
        <Flex justifyContent='space-around' width='100%' fontSize='14px' cursor='pointer'>
          {difficultyLevels.map(level=><Center h='50px' p='5px'  border='1px solid white' borderRadius='10px'
            bg={selectedDifculity?.value==level.value?'gray.600':'auto'}
             onClick={()=>{setDificulity(level);setDificulityError(false)}}>
            {level.name}
        </Center>)}          
        </Flex>
        <HStack width='100%' padding='0 5px'  mt='50px' justifyContent='space-evenly'>
          <Center w='30%' h='50px' p='5px' border='1px solid white' cursor='pointer' onClick={handlePlaySolo}>
            Play solo
            </Center>
          {/* <Center w='33%' h='50px' p='5px' border='1px solid white' cursor='pointer' onClick={handleShowJoinWindow}>
            Join Game    
          </Center> */}
          <Center w='33%' h='50px' p='5px' border='1px solid white' cursor='pointer' onClick={handleInvitePlayer}>
            Invite Friend
          </Center>
        </HStack>
        {/* <JoinModal joinCode={inviteCode!} open={showJoinWindow} close={()=>setShowJoinWindow(false)}/> */}
        {inviteCode&&<Text width='100%' textAlign='center' mt='30px' fontSize='xl'>Join code:
         <Text as='span' ml={2} fontSize='lg'>{`http://localhost:5174/game/join/${inviteCode}`}</Text></Text>}
        {dificulityError&&<Text mt={10} textAlign='center' fontSize='xl' color='red.600'>please select dificulity</Text>}
        
    </Flex>
  )
}



function getDifficultyLevels(setSize:number) {
  if (setSize > 11) {
    return [{ name: 'Easy 6 pairs', value: 6 }, { name: 'Medium 10 pairs', value: 10 }, { name: 'Hard 12 pairs', value: 12 }];
  } else if (setSize > 9) {
    return [{ name: 'Easy 6 pairs', value: 6 }, { name: 'Medium 10 pairs', value: 10 }];
  } else {
    return [{ name: 'Easy 6 pairs', value: 6 }];
  }
}

export default GameCreator



 