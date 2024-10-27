import { Center, Flex, HStack, Icon, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import { FcFlashOn } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import gameStartBg from '../../assets/waves.png';
import socket from '../../../socket';
import useGameStore from '../../gameStore';
import useSoloGameStore from '../../soloGameStore';

function getDifficultyLevels(setSize:number) {
  if (setSize > 11) {
    return [{ name: 'Easy 6 pairs', value: 6 }, { name: 'Medium 10 pairs', value: 10 }, { name: 'Hard 12 pairs', value: 12 }];
  } else if (setSize > 9) {
    return [{ name: 'Easy 6 pairs', value: 6 }, { name: 'Medium 10 pairs', value: 10 }];
  } else {
    return [{ name: 'Easy 6 pairs', value: 6 }];
  }
}


const GameCreator = () => {
    const {setId,setSize}=useParams();
    const gameStore=useGameStore();
    const soloGameStore=useSoloGameStore();
    const navigate=useNavigate();
    const [isMobile,setIsMobileLandscape]=useState(false);
    const [selectedDifculity,setDificulity]=useState<{_name:string,value:number}>();
    const [dificulityError,setDificulityError]=useState(false);
    const [roomName,setRoomName]=useState<null|string>(null);
    const [tooltipText, setTooltipText] = useState('Click to copy');
    
    const difficultyLevels = getDifficultyLevels(parseInt(setSize!));

        

      useEffect(() => {
        socket.on('init_game', (_roomName:string,setId:number,pairs:number,players:string[]) => {
          navigate("/game/"+_roomName); 
          gameStore.setRoomName(_roomName!);
          gameStore.setSetId(setId);
          gameStore.setPairs(pairs);
          gameStore.setplayers(players);
          gameStore.setplayerName('owner');
          console.log('players:',players);
          gameStore.setSecondPlayerName(players.find(player=>player!='owner')!);
        });
      }, []);

    const handlePlaySolo=async ()=>{
      if(!selectedDifculity){setDificulityError(true); return}
      soloGameStore.setDificulity(selectedDifculity.value);
        soloGameStore.setSetId(parseInt(setId!));
        navigate("/game/solo"); 
    }
    const handleInvitePlayer=async ()=>{
      if(!selectedDifculity){
        setDificulityError(true);
         return;
        }
      const roomName=Math.random().toString(36).substr(2, 9)
       setRoomName(roomName);
       socket.emit('create_room',selectedDifculity.value,parseInt(setId!),roomName);
    }

    const copyToClipboard = () => {
      setTooltipText('Copied!');
      navigator.clipboard.writeText(`${import.meta.env.VITE_API_BASE_INNER_URL}/game/join/${roomName}`);
      setTimeout(() => {
        setTooltipText('Click to copy');
      }, 2000);
    };
    
    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
  
        if (width > height && width < 1100) {
          setIsMobileLandscape(true);
        } else {
          setIsMobileLandscape(false); 
        }
      };
  
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); 
    
  return (
    <Flex width='100vw' flexDirection='column' height={isMobile?'100%':'100vh'}  bgSize='cover'
     p='10px 5px' bgImage={`url(${gameStartBg})`}>

        <Text color='white' mt='10%' width='100%' textAlign='center' fontSize='22px'  fontWeight='500'>
            Flashlearn Memory Game <Icon as={FcFlashOn} boxSize={{base:6,lg:8}}/>
        </Text>

        <Text width='100%' fontSize='lg' textAlign='center' mt='50px' mb='20px'>Choose dificulity level</Text>

        <Flex justifyContent='space-around' width='100%' fontSize='14px' cursor='pointer'>
              {difficultyLevels.map(level=>
                  <Center h='50px' p='5px'  border='1px solid white' borderRadius='10px'
                      bg={selectedDifculity?.value==level.value?'gray.600':'auto'}
                      onClick={()=>{setDificulity({_name:level.name,value:level.value});setDificulityError(false)}}>

                    {level.name}
                  </Center>)}          
        </Flex>

        <HStack width='100%' padding='0 5px'  mt='50px' justifyContent='space-evenly'>
          <Center w='30%' h='50px' p='5px' border='1px solid white' cursor='pointer' onClick={handlePlaySolo}>
            Play solo
            </Center>
          <Center w='33%' h='50px' p='5px' border='1px solid white' cursor='pointer' onClick={handleInvitePlayer}>
            Invite Friend
          </Center>
        </HStack>

        {roomName&&
        <Text width='100%' textAlign='center' mt='30px' fontSize='xl'>
          Join code: 
          <Tooltip label={tooltipText} fontSize="md"  closeOnClick={false}  >
            <Text as='span' ml={2} fontSize='lg' cursor='pointer'  color={'blue'} onClick={copyToClipboard}>
                {`${import.meta.env.VITE_API_BASE_INNER_URL}/game/join/${roomName}`}
            </Text>
          </Tooltip>
        </Text>}
        
        {dificulityError&&
        <Text mt={10} position='absolute' w='100%' top='0'  textAlign='center' fontSize='xl' color='red.600'>
          please select dificulity
        </Text>}
        
    </Flex>
  )
}





export default GameCreator



 