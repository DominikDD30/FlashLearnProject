import { Flex ,Text} from '@chakra-ui/react'
import { useState } from 'react'
import JoinModal from './JoinModal'
import gameStartBg from '../../assets/game_bg.png'
import { useParams } from 'react-router-dom'

const JoinGamePanel = () => {
    const [showJoinWindow,setShowJoinWindow]=useState(true);
    const {uid}=useParams();


      
  return (
    <Flex width='100vw' flexDirection='column'  height='100vh' bgSize='cover' p='10px 5px' bgImage={gameStartBg}>
       
        <Text color='white'  mt='10%' width='100%' textAlign='center' fontSize='22px' fontWeight='500'>
            Type Your Nickname to join the game
        </Text>
        <JoinModal roomName={uid!} open={showJoinWindow} close={()=>setShowJoinWindow(false)}/>
       
    </Flex>
  )
}

export default JoinGamePanel