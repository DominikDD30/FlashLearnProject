import React, { useEffect } from 'react'
import useCreatorStore from '../creatorStore';
import useUserStore from '../userStore';
import useQuizList from '../hooks/useQuizList';
import { Stack ,useMediaQuery} from '@chakra-ui/react';
import QuizComponent from '../components/QuizComponent';
import Quiz from '../entities/Quiz';
import QuizLearnComponent from '../components/learn/QuizLearnComponent';
import ApiClient from '../services/ApiClient';


const apiClient=new ApiClient('/quiz');
const QuizLearn = () => {
    const [playedQuiz,setPlayedQuiz]=React.useState<Quiz>();
    const createStore=useCreatorStore();
    const userStore=useUserStore();
    const sets=useQuizList(userStore.userId||-1);
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');
    
    useEffect(()=>{
      setPlayedQuiz(undefined);
    },[userStore.refetchTrigger]);

    useEffect(()=>{ 
      sets.refetch();
    },[createStore.quizItems,createStore.setName,userStore.refetchTrigger]);
  
    const handlePlayQuiz=(quizId:number)=>{
      apiClient.updateLastTimeUsed(quizId);
      const newQuiz=sets.data?.find((set:Quiz)=>set.quizId==quizId);
      if (newQuiz) {
        const shuffledQuestions = newQuiz?.questionDTOS.sort(() => Math.random() - 0.5);
          setPlayedQuiz({...newQuiz, questionDTOS: shuffledQuestions, quizId: newQuiz.quizId!});
      }
    }


    if(playedQuiz) return (
     <QuizLearnComponent quiz={playedQuiz}/>
      );
    
  return (
    <>
     <Stack  spacing={4} minHeight='100vh'  mr='auto' ml='auto' width={isLargerThan1200?'40%':'100%'}  padding='15px'>
        {Array.isArray(sets.data)&&sets?.data?.map((set, index) => (
          <QuizComponent key={index} quiz={set} owner={userStore.email || ''} handlePlayQuiz={(quizId)=>handlePlayQuiz(quizId)} />
        ))}
       </Stack>
    </>
  )
}

export default QuizLearn