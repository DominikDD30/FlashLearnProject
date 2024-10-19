import { Text, Stack, useMediaQuery } from '@chakra-ui/react'
import useFlashcardSets from '../hooks/useFlashcardSets'
import useUserStore from '../userStore'
import FlashcardSetComponent from '../components/FlashcardSetComponent'
import { useEffect } from 'react'
import useCreatorStore from '../creatorStore'

const Flashcards = () => {
  const createStore=useCreatorStore();
  const userStore=useUserStore();
  const sets=useFlashcardSets(userStore.userId||-1);
  const today=sets.data?.find(set=>set.date=="today");
  const thisWeek=sets.data?.find(set=>set.date=="thisWeek");
  const pastWeek=sets.data?.find(set=>set.date=="pastWeek");
  const rest=sets.data?.filter(set=>set.date!="thisWeek"&&set.date!="pastWeek"&&set.date!="today");
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

  useEffect(()=>{
    sets.refetch();
  },[createStore.flashcards,createStore.setName,userStore.refetchTrigger]);


  return (
    <Stack spacing={4} minHeight={{base:'100vh',lg:'calc(100vh - 70px)'}}  mr='auto' ml='auto' width={isLargerThan1200?'40%':'100%'} padding='15px' color='gray.700'>
      {today?.setsList?.length! > 0 &&<>
      <Text transform='translateX(-5px)' fontSize='lg' fontWeight='500'>Today</Text>
       {today?.setsList?.map(set=><FlashcardSetComponent  set={set} owner={userStore.email!}/>)}
       </>}
      {thisWeek?.setsList?.length! >0  &&<>
      <Text transform='translateX(-5px)' fontSize='lg' fontWeight='500'>This week</Text>
       {thisWeek?.setsList?.map(set=><FlashcardSetComponent set={set} owner={userStore.email!}/>)}
       </>}
      {pastWeek?.setsList?.length! >0 &&<>
      <Text transform='translateX(-5px)' fontSize='lg' fontWeight='500'>Past Week</Text>
       {pastWeek?.setsList?.map(set=><FlashcardSetComponent set={set} owner={userStore.email!}/>)}
       </>}

      {rest?.length! > 0 && (
    <>
    {rest?.map((setListGrouped, index) => (
      <Stack spacing={4} key={index}>
        <Text transform='translateX(-5px)' fontSize='lg' fontWeight='500'>{setListGrouped.date}</Text>
        {setListGrouped?.setsList?.map((set, index) => (
          <FlashcardSetComponent key={index} set={set} owner={userStore.email || ''} />
        ))}
      </Stack>
    ))}
    </>)}
    </Stack>
  )
}

export default Flashcards