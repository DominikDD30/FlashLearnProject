import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/ApiClient";



const apiClient = new ApiClient('/flashcards');
const useFlashcardSet = (setId:number) => 
   useQuery({
    queryKey:['flashcardSet',setId.toString()],
    queryFn:()=>apiClient.getFlashcardSet(setId),
    staleTime:1000*60*60,
  });

export default useFlashcardSet;