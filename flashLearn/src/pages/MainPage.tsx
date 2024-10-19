import { Box, Flex, Heading, Text, UnorderedList, ListItem, Stack, useMediaQuery, HStack, Button } from '@chakra-ui/react'
import photo from '../assets/main-photo.jpg'
import photoSmall from '../assets/main-photo-small.jpg'
import { SiGamejolt } from "react-icons/si";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const about=<Box mb={5}>
<Heading size="md">About</Heading>
<UnorderedList>
  <ListItem>Information about Flashlearn</ListItem>
  <ListItem>Advertise on Flashlearn</ListItem>
  <ListItem>Download the app</ListItem>
</UnorderedList>
</Box>

const forStudents=<Box>
<Heading size="md">For Students</Heading>
<UnorderedList>
  <ListItem>Flashcards</ListItem>
  <ListItem>Tests</ListItem>
  <ListItem>Learn</ListItem>
  <ListItem>Solutions</ListItem>
  <ListItem>Spaced repetition</ListItem>
  <ListItem>Flashlearn Premium</ListItem>
</UnorderedList>
</Box>

const forTeachers=<Box mb={5}>
<Heading size="md">For Teachers</Heading>
<UnorderedList>
  <ListItem>Live</ListItem>
  <ListItem>Checkpoint</ListItem>
  <ListItem>Blog</ListItem>
  <ListItem>Flashlearn  for Teachers</ListItem>
</UnorderedList>
</Box>

const resources=<Box>
<Heading size="md">Resources</Heading>
<UnorderedList>
  <ListItem>Help Center</ListItem>
  <ListItem>Sign Up</ListItem>
  <ListItem>Community Guidelines</ListItem>
  <ListItem>Privacy</ListItem>
  <ListItem>Terms of Service</ListItem>
  <ListItem>Advertising & Cookies Policy</ListItem>
  <ListItem>Flashlearn for Schools</ListItem>
</UnorderedList>
</Box>



const MainPage = () => {
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');
    const [showFlashGame, setShowFlashGame] = useState(false);
    const navigate=useNavigate();
    

    const handleFlashGameClick = () => {
      setShowFlashGame(true);
      setTimeout(() => {
        setShowFlashGame(false);
      }, 2000);
      if(isLargerThan1200){
        navigate('game/creator/0/12');
      }
      else if(showFlashGame){
          navigate('game/creator/0/12');
      }
    };
  return (
    <Flex flexGrow={1} width='100%' bg='whitesmoke' pb='20px' flexDirection='column'>
       <Flex flexDirection='column' position='relative' bgImage={isLargerThan1200?photo:photoSmall} pt={{base:'5px',lg:'100px'}}  pl={{base:'0',lg:'50px'}}
        width='100vw' height='70vh' bgPosition='top' bgSize='cover' overflowX='hidden'>

      {!isLargerThan1200&&
      <Button width='150px' height='50px' mb='15px' mt='5px' alignSelf='flex-end' transform={showFlashGame ? 'translateX(10%)' : 'translateX(75%)'}
       colorScheme='yellow' variant='solid' pl='0px' onClick={handleFlashGameClick}>
        <SiGamejolt />
        <Text ml={0} color='gray.700'>Flash Game</Text>
      </Button>
       }
        <Text fontSize={{base:'2xl',lg:'3xl'}} fontWeight='bolder' ml={{base:'auto',lg:'0'}}  textAlign='center'  width={{base:'90%',lg:'30%'}}>
          Unlock simplified learning with flashcards and quizzes
        </Text>

        {isLargerThan1200&&
      <Button width='150px' position='absolute' top='10px'  height='50px'alignSelf='flex-end' 
       colorScheme='yellow' variant='solid' pl='0px' onClick={handleFlashGameClick}>
        <SiGamejolt />
        <Text ml={0} color='gray.700'>Flash Game</Text>
      </Button>
       }
        
        <Text mt={6}  fontSize='xl' ml={{base:'auto',lg:'0'}} mr='auto' textAlign='center'  width={{base:'90%',lg:'30%'}}>
        Join a community of over 20 million students globally using scientifically-designed online tools
             to conquer academic challenges and beyond
        </Text>
       </Flex>
      
    <Text width='80%'  textAlign='center' m={{base:'30px auto',lg:'100px auto'}} fontWeight={{base:'bolder',lg:'bold'}} 
    fontSize={{base:'2xl',lg:'3xl'}} color='gray.700'>
        90% students agree: Flashlearn is their secret weapon for better 
        grades. Join the ranks of successful learners today!</Text>
        <hr style={{width:'100%',borderBottom:'1px solid var(--chakra-colors-gray-200)'}}></hr>
        <Flex color='gray.700'  mt='10px' p={4} justifyContent="space-around">
            {isLargerThan1200?
                <HStack width='100%' justifyContent='space-around'>
                    {about}
                    {forStudents}
                    {forTeachers}
                    {resources}
                </HStack>
                :
                <>
                <Stack>  
                    {about}
                    {forStudents}
                </Stack>
                <Stack>
                    {forTeachers}
                    {resources}
                </Stack>
                </>
        }
          
        </Flex>
    </Flex>
  )
}

export default MainPage