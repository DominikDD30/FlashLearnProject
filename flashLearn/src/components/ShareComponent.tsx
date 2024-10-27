import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Flex, HStack, Icon, Spinner, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import ApiClient from '../services/ApiClient';
import { SharedSet } from '../entities/SharedSet';
import { FaUserCircle } from 'react-icons/fa';
import useUserStore from '../userStore';

const shareClient = new ApiClient('/share');
const apiClient = new ApiClient('');
const ShareComponent = () => {
    const { shareCode } = useParams();
    const [set, setSet] = React.useState<SharedSet>();
    const userState=useUserStore();
    const navigate=useNavigate();
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

    useEffect(() => {
        shareClient.findSetByShareCode(shareCode!).then((res) => {
            setSet(res);
        });
    }, [shareCode]);

    const handleAdd=()=>{
        if(set?.flashcardsSet){
             apiClient.createFlashcards(userState.userId!,set?.flashcardsSetDTO.setName,set?.flashcardsSetDTO.flashcards.map(flashcard=>({id:undefined,concept:flashcard.concept,definition:flashcard.definition})));
        }else{
            apiClient.createQuiz(userState.userId!,set?.quizSetDTO.setName!,set?.quizSetDTO.questionDTOS!);
        } 
        navigate('/');
    }


    if (!set) {
        return (
            <Spinner />
        )
    }

    return (
        <Stack padding='30px'  mr='auto' ml='auto' width={isLargerThan1200?'40%':'auto'} flexGrow={1} >
        <Text color='gray.600' textAlign='center' fontSize='xl' whiteSpace='break-spaces' mb={2}>Do you want to add this set ?</Text>

        <Stack position='relative' height='200px' border='2px solid gray' overflow='hidden' borderRadius='15px' padding='20px' width='100%'> 
            <Text fontWeight='500' width='80%' color='gray.600'>
                {set.flashcardsSet?`${set.flashcardsSetDTO.setName}`:`${set.quizSetDTO.setName}`}
            </Text>

            <Flex mt={1}> 
                <Box bg='gray.200' border='2px solid var(--chakra-colors-gray-300)' height='30px' p='0 10px' color='gray.600'
                  lineHeight='25px' borderRadius='10px'>
                    {set.flashcardsSet?`${set.flashcardsSetDTO.flashcards.length}  cards`:`${set.quizSetDTO.questionDTOS.length}  questions`}
                </Box>
            </Flex>

            <HStack mt='auto'><Icon as={FaUserCircle} boxSize={10} color='gray.600'/><Text color='gray.600'>{set.owner}</Text></HStack>
          </Stack>
          <Button width='100%' height='40px' mt={10} mb={5} bg='gray.300'  color='gray.700' 
             border='2px solid var(--chakra-colors-gray-500)'onClick={handleAdd}>
                  add set
          </Button>
        </Stack>
    )
}

export default ShareComponent