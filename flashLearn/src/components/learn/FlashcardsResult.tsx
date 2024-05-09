import { CloseIcon } from '@chakra-ui/icons';
import { Button, Center, Flex, HStack, Icon,Stack,Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
interface Props{
    accuratePercent:number;
    positive:number;
    negative:number;
    continueLearning:()=>void;
    setDefault:()=>void;
}
const FlashcardsResult = ({accuratePercent,positive,negative,continueLearning,setDefault}:Props) => {
    const navigate=useNavigate();
    const handleExit=()=>{
        navigate("/flashcards");
      }

  return (
    <Flex height='100vh' color='gray.600' flexDirection='column'  padding='30px 0px' width='100vw' bg='gray.100'>
    <Icon position='absolute'  top='25px' left='25px'  boxSize={5} as={CloseIcon} cursor='pointer' onClick={handleExit}/>
    <Text textAlign='center' fontSize={{base:'xl',xl:'2xl'}} fontWeight='500'>{`${positive+negative}/${positive+negative}`}</Text>
    <hr style={{width:'100%',marginTop:'15px',borderBottom:'2px solid var(--chakra-colors-gray-300)'}}/>
    <HStack justifyContent='space-around' mt='100px' mb='100px'>
    <Center boxSize='100px' borderRadius='50%' border={`5px solid ${accuratePercent>50?'green':'orange'}`} fontSize='2xl'>
    {accuratePercent}%
    </Center>
    <Stack fontSize={{base:'lg',xl:'2xl'}}>
      <Text color='green.400'>Known {positive}</Text>
      <Text color='orange'>Still Learning {negative}</Text>
    </Stack>
    </HStack>
    <HStack justifyContent='space-around' >
      {negative!=0&&
      <Button width='45%'  bg='gray.300' color='gray.600' border ='2px solid var(--chakra-colors-gray-400)'
       onClick={continueLearning}>
        Continue learning
      </Button>}
      <Button width='45%' bg='gray.300' color='gray.600' border ='2px solid var(--chakra-colors-gray-400)'
      onClick={setDefault}>
        Reset flashcards
      </Button>
    </HStack>
  </Flex>
  )
}

export default FlashcardsResult