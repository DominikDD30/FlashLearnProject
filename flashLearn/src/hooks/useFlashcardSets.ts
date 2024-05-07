import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/ApiClient";



 const apiClient=new ApiClient('/flashcards');


const useFlashcardSets = (userId:number) => 
   useQuery({
    queryKey:['flashcardSets',userId],
    queryFn:()=>apiClient.getSetsForUser(userId),
    staleTime:1000*60*60,
  });

export default useFlashcardSets;