import React, { useEffect } from 'react'
import useCreatorStore from '../creatorStore';
import useUserStore from '../userStore';
import useQuizList from '../hooks/useQuizList';
import { Stack ,useMediaQuery} from '@chakra-ui/react';
import QuizSetComponent from '../components/QuizSetComponent';
import Quiz from '../entities/Quiz';
import QuizLearnComponent from '../components/learn/QuizLearnComponent';
import ApiClient from '../services/ApiClient';


const apiClient=new ApiClient('/quiz');
const QuizList = () => {
    const  [activeQuiz,setActiveQuiz]=React.useState<number|undefined>(undefined);
    const createStore=useCreatorStore();
    const userStore=useUserStore();
    const sets=useQuizList(userStore.userId||-1);
    const playedQuiz=sets.data?.find((set:Quiz)=>set.quizId==activeQuiz);
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');
    
    useEffect(()=>{
      setActiveQuiz(undefined);
    },[userStore.refetchTrigger]);

    useEffect(()=>{ 
      sets.refetch();
    },[createStore.quizItems,createStore.setName,userStore.refetchTrigger]);
  
    const handlePlayQuiz=(quizId:number)=>{
      apiClient.updateLastTimeUsed(quizId);
      setActiveQuiz(quizId);
    }


    if(activeQuiz) return (
     <QuizLearnComponent quizSet={playedQuiz!}/>
      );
    
  return (
    <>
     <Stack  spacing={4} minHeight='100vh'  mr='auto' ml='auto' width={isLargerThan1200?'40%':'100%'}  padding='15px'>
        {Array.isArray(sets.data)&&sets?.data?.map((set, index) => (
          <QuizSetComponent key={index} quiz={set} owner={userStore.email || ''} handlePlayQuiz={(quizId)=>handlePlayQuiz(quizId)} />
        ))}
       </Stack>
    </>
  )
}

export default QuizList