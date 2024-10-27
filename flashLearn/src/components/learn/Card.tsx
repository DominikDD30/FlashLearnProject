import { Flex, Text,Image, useMediaQuery, Center } from '@chakra-ui/react'
import { FlashcardBuilder } from '../../entities/FlashcardBuilder';
import FlipCardAnimationWrapper from '../game/FlipCardAnimationWrapper';

interface Props{
    activeFlashcard:FlashcardBuilder;
    showDefinition:boolean;
    opacity:boolean;
    flipCard:()=>void;
}
const Card = ({activeFlashcard,opacity,showDefinition,flipCard}:Props) => {
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

  return (
    <FlipCardAnimationWrapper isBlocked={false} flip={showDefinition}>
      <Flex mt='30px' position='relative' flexDirection='column' ml='auto' mr='auto'  height='55vh'
      width={isLargerThan1200?'30vw':'calc(100vw - 80px)'} overflow='hidden'
       bg='gray.400'  borderRadius='10px' onClick={flipCard}>

        {showDefinition&&activeFlashcard.image&&
        <Image w='100%' height='80%' src={activeFlashcard.image}   opacity={opacity?0:1} objectFit='cover'/>}

        <Center w='100%' h={showDefinition?'20%':'100%'} >
          <Text fontSize={{base:'27px',xl:'34px'}} opacity={opacity?0:1}   mb='20px'   w='100%'  textAlign='center' color='white' transform={showDefinition?'rotateY(180deg)':''}>
            {showDefinition?`${activeFlashcard.definition}`:`${activeFlashcard.concept}`}
          </Text>
        </Center>     
      </Flex>
    </FlipCardAnimationWrapper>
  )
}

export default Card