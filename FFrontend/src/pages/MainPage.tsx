import { Box, Flex, Heading, Text, useMediaQuery, HStack, Button } from '@chakra-ui/react'
import photo from '../assets/main-photo.jpg'
import photoSmall from '../assets/main-photo-small.jpg'
import { SiGamejolt } from "react-icons/si";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const about=<Box>
<Heading size="md">About</Heading>
<Text>This app is an interactive learning platform that allows users to create and study custom flashcards and quizzes.
   With features like image-based flashcards, translation support, and automatic  generation from text and PDFs, it enhances 
   the learning experience by making content creation quick and intuitive.
    Users can personalize their study environment, share flashcard sets, and reinforce knowledge 
    through engaging modes like flashcard review, memory games, and quiz-based practice, making it a versatile tool for effective, 
    enjoyable study sessions.</Text>
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
      
    <Text width='80%'  textAlign='center' m='30px auto' fontWeight={{base:'bolder',lg:'bold'}} 
    fontSize={{base:'2xl',lg:'3xl'}} color='gray.700'>
        90% students agree: Flashlearn is their secret weapon for better 
        grades. Join the ranks of successful learners today!</Text>
        <hr style={{width:'100%',borderBottom:'1px solid var(--chakra-colors-gray-200)'}}></hr>
        <Flex color='gray.700'  mt='10px' p={4} justifyContent="space-around">
                <HStack width='100%' justifyContent='space-around'>
                    {about}
                </HStack>
        </Flex>
    </Flex>
  )
}

export default MainPage