import React from 'react'
import Quiz from '../entities/Quiz';
import { Stack,Text,Flex, HStack, Box, Icon } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { HamburgerIcon } from '@chakra-ui/icons';
import QuizMenu from './QuizMenu';

interface Props{
        quiz:Quiz;
        owner:string;
        handlePlayQuiz:(quizId:number)=>void;
}


const QuizComponent = ({quiz: quiz,owner,handlePlayQuiz}:Props) => {
    const [showMenu, setShowMenu] = React.useState(false);
   
    return (    
        <Stack position='relative' height='200px' border='2px solid gray' overflow='hidden' borderRadius='15px' padding='20px' width='100%'> 
            <QuizMenu  showMenu={showMenu}  setShowMenu={setShowMenu} 
             handlePlayQuiz={handlePlayQuiz} quiz={quiz}/>

            <Text fontWeight='500' width='80%' color='gray.600'>{quiz.setName}</Text>

            <Icon position='absolute' top='10px' right='10px' as={HamburgerIcon} boxSize={6} color='gray.600'
             cursor='pointer' onClick={()=>setShowMenu(!showMenu)}/>

            <Flex mt={1}>
               <Box bg='gray.200' border='2px solid var(--chakra-colors-gray-300)' height='30px' p='0 10px' 
                  color='gray.600'lineHeight='25px' borderRadius='10px'>
                  {quiz.questionsAmount} cards
               </Box>
             </Flex>

             <HStack mt='auto'><Icon as={FaUserCircle} boxSize={10} color='gray.600'/><Text color='gray.600'>{owner}</Text></HStack>
          </Stack>
      )
   
}

export default QuizComponent