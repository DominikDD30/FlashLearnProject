import { Flex, Icon,Text,Image } from '@chakra-ui/react'
import { AiOutlineSound } from "react-icons/ai";
import { FlashcardBuilder } from '../../entities/FlashcardBuilder';
import FlipCardAnimationWrapper from '../game/FlipCardAnimationWrapper';
import smallWenus from '../../assets/wenus_small.jpg'

interface Props{
    activeFlashcard:FlashcardBuilder;
    animationBlocked:boolean;
    showDefinition:boolean;
    opacityValue:boolean;
    flipCard:()=>void;
}
const Card = ({activeFlashcard,opacityValue,animationBlocked,showDefinition,flipCard}:Props) => {
    

  return (
    <FlipCardAnimationWrapper  flip={showDefinition} isBlocked={animationBlocked}>
    <Flex mt='40px' position='relative' flexDirection='column'  height='65vh' bg='gray.400' width='calc(100vw - 80px)'
      justifyContent='center' alignItems='center' borderRadius='10px'
      onClick={flipCard}>
    {!showDefinition && <Icon as={AiOutlineSound} opacity={opacityValue?0:0} position='absolute' top='20px' left='85%' boxSize={8} />}
    {showDefinition&&activeFlashcard.image&&
    <Image w='100%' src={smallWenus} mb='50px' opacity={opacityValue?0:1} objectFit='cover'/>}
    {/* <Image w='100%' src={activeFlashcard.image} mb='50px' opacity={opacityValue?0:1} objectFit='cover'/>} */}

    <Text fontSize='27px' opacity={opacityValue?0:1}  w='100vw'  textAlign='center' color='white' transform={showDefinition?'rotateY(180deg)':''}>
      {`${showDefinition? activeFlashcard.definition : activeFlashcard.concept}`}
      </Text>
   </Flex>
   </FlipCardAnimationWrapper>
  )
}

export default Card