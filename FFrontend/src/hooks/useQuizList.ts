import ApiClient from "../services/ApiClient";
import { useQuery } from "@tanstack/react-query";

const apiClient=new ApiClient('/quiz');


const useFlashcardSets = (userId:number) => 
   useQuery({
    queryKey:['flashcardSets',userId],
    queryFn:()=>apiClient.getQuizListForUser(userId),
    staleTime:1000*60*60,
  });

export default useFlashcardSets;