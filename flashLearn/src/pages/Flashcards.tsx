import { Text, Stack, useMediaQuery } from '@chakra-ui/react'
import useFlashcardSets from '../hooks/useFlashcardSets'
import useUserStore from '../userStore'
import FlashcardsSetComponent from '../components/FlashcardsSetComponent'
import { useEffect } from 'react'
import useCreatorStore from '../creatorStore'
import { FlashcardSetGroupedByDate } from '../entities/FlashcardSetGroupedByDate'

const Flashcards = () => {
  const createStore = useCreatorStore();
  const userStore = useUserStore();
  const setsQuery =useFlashcardSets(userStore.userId || -1);
  const sets:FlashcardSetGroupedByDate[] = setsQuery.data||[];
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

  const today = sets.find(set => set.date === "today");
  const thisWeek = sets.find(set => set.date === "thisWeek");
  const pastWeek = sets.find(set => set.date === "pastWeek");
  const rest = sets.filter(
    set => !["today", "thisWeek", "pastWeek"].includes(set.date)
  );

  useEffect(() => {
    setsQuery.refetch();
  }, [createStore.flashcards, createStore.setName, userStore.refetchTrigger]);

  const renderSetsSection = (title:string, setGroup:FlashcardSetGroupedByDate) => (
    setGroup?.setsList && setGroup.setsList.length > 0 && (
      <>
        <Text transform='translateX(-5px)' fontSize='lg' fontWeight='500'>{title}</Text>
        {setGroup.setsList.map((set, index) => (
          <FlashcardsSetComponent key={index} set={set} owner={userStore.email || ''} />
        ))}
      </>
    )
  );

  return (
    <Stack spacing={4} minHeight={{ base: '100vh', lg: 'calc(100vh - 70px)' }} mr='auto' ml='auto'
      width={isLargerThan1200 ? '40%' : '100%'} padding='15px' color='gray.700'>
        
        {renderSetsSection("Today", today!)}
        {renderSetsSection("This week", thisWeek!)}
        {renderSetsSection("Past week", pastWeek!)}

      {rest && rest.length > 0 && rest.map((setListGrouped, index) => (
        <Stack spacing={4} key={index}>
          <Text transform='translateX(-5px)' fontSize='lg' fontWeight='500'>
            {setListGrouped.date}
          </Text>
          {setListGrouped.setsList?.map((set, index) => (
            <FlashcardsSetComponent key={index} set={set} owner={userStore.email || ''} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
}

export default Flashcards;
