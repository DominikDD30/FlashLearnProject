import { Button, Icon,AbsoluteCenter,Text, Center} from '@chakra-ui/react'
import { FaFacebookSquare } from 'react-icons/fa'

const LoginWithFacebook = () => {
  return (
    <Button bg='gray.500'>
           <Center w='20px' h='20px'  marginRight='auto' bg='white'>
             <Icon  as={FaFacebookSquare} boxSize={6} color='blue.500'/>
           </Center>
           <AbsoluteCenter>
           <Text margin='auto'>Continue With Facebook</Text>
           </AbsoluteCenter>
           </Button>
  )
}

export default LoginWithFacebook