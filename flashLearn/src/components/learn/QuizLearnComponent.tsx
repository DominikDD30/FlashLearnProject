import { Button, Checkbox, HStack, Stack,Text } from '@chakra-ui/react'
import { useState } from 'react'
import QuizSet from '../../entities/QuizSet';
import QuizAnswers from './QuizAnswers';
import { Answear, QuizItemBuilder } from '../../entities/QuizItemBuilder';

interface Props{
    quizSet:QuizSet;
}
const QuizLearnComponent = ({quizSet}:Props) => {
    const [quizList,setQuizList]=useState<QuizItemBuilder[]>(quizSet?.quizItems||[]);
    const [counter,setCounter]=useState(1);
    const [sumElemCounter,setSumElemCounter]=useState(1);
    const [tempAnswers,setTempAnswers]=useState<{checked:boolean,answer:Answear}[]>(quizList[counter-1].answers.map((answer,index)=>({checked:false,answer})));
       
    const [checkAnswers,setCheckAnswers]=useState(false);
    const [checkAnswerBlocked,setCheckAnswerBlocked]=useState(false);
    const [sum,setSum]=useState(0);
    const [accuracy,setAccuracy]=useState(0);
   

   
      const handleCheckAnswer=()=>{
        if(checkAnswerBlocked)return;
        setCheckAnswers(true);
        const countCheckedCorrectly = tempAnswers.filter(answer => answer.checked && answer.answer.isCorrect).length;
        const correctAnswers = tempAnswers.filter(answer =>answer.answer.isCorrect).length;
        const newSum=countCheckedCorrectly==0?0:countCheckedCorrectly/correctAnswers*100;
        setSum(sum+newSum);
        setAccuracy(((sum+newSum)==0)?0:(sum+newSum)/sumElemCounter);
        setSumElemCounter(sumElemCounter+1);
        setCheckAnswerBlocked(true);
      }

    const handleReset=()=>{
      setCheckAnswerBlocked(false);
        setCounter(1);
        setSum(0);
        setAccuracy(0);
        setSumElemCounter(1);
        setCheckAnswers(false);
        setQuizList(quizSet?.quizItems||[]);
        setTempAnswers(quizSet?.quizItems[0].answers.map((answer,index)=>({checked:false,answer})));
    }

    const handleNext=()=>{
        setCheckAnswerBlocked(false);
        setTempAnswers(quizList[counter].answers.map((answer,index)=>({checked:false,answer})));
        setCounter(counter+1);
        setCheckAnswers(false);
    }
  
    const handleCheckboxChanged = (id: number) => {
      // console.log(quizList);
      // console.log(counter-1)
      // console.log(quizList[counter-1].question);
      console.log("temp",tempAnswers);
      
      setTempAnswers((prevTempAnswers) =>
          prevTempAnswers.map((answer, index) =>
              index === id ? { ...answer, checked: !answer.checked } : answer
          )
      );
  }
  return (
    <Stack width='100vw'  minHeight='100vh' bg='white' color='black' padding='50px 20px'>
    <Text fontSize={{base:'2xl',xl:'3xl'}} textAlign='center'>Quiz: <Text as='span' fontSize={{base:'lg',xl:'xl'}} ml={3}>{quizSet?.setName}</Text></Text>
    <Text>accuracy: <Text as='span' fontSize='xl' ml={1}>{accuracy.toFixed(2)}%</Text></Text>
    <Text>question: <Text as='span' fontSize='xl' ml={1}>{counter}</Text></Text>
  <Stack width='100%' bg='#daedf4'  borderRadius='5px' padding='10px' fontWeight='lighter'>
    <Text fontSize='lg' color='gray.700' fontWeight='semibold'>choose correct answers</Text>
    <Text>{quizList[counter-1].question}:</Text>
   
   {/* <QuizAnswers  answers={tempAnswers} showCorrect={checkAnswers} handleCheckboxChange={handleCheckboxChanged}/> */}

   <Stack>
    {tempAnswers.map((answer,index)=>
    <HStack key={index} bg={checkAnswers?answer.answer.isCorrect?'green.200':'red.200':'auto'}>
    {/* <HStack key={index} bg={showCorrect?answer.checked&&answer.answer.isCorrect?'green.200':!answer.checked&&!answer.answer.isCorrect?'green.200':'red.200':'auto'}> */}
      <Checkbox borderColor='var(--chakra-colors-gray-500)' colorScheme='blue'  bg='white'
       isChecked={answer.checked}  onChange={() => handleCheckboxChanged(index)}/>
      <Text key={index}>{answer.answer.value}</Text></HStack>)}
  </Stack>

   </Stack>
  <HStack>
    <Button size='sm' color='black' bg='gray.200' fontWeight='lighter' border='1px solid black' onClick={handleCheckAnswer}>
      CheckAnswer
    </Button>
    <Button size='sm' color='black' bg='gray.200' fontWeight='lighter' border='1px solid black' onClick={handleReset}>
      Reset
    </Button>
    {counter < quizList.length&&<Button size='sm' color='black' bg='gray.200' fontWeight='lighter' border='1px solid black'
     onClick={handleNext}>
    Next question
    </Button>}
  </HStack>
  </Stack>
  )
}

export default QuizLearnComponent