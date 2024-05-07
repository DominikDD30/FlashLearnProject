import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/ApiClient";



 const apiClient=new ApiClient('/pexel');


const useFlashcards = (flashcards:string[]) => 
   useQuery({
    queryKey:['flashcards'],
    queryFn:()=>apiClient.getImagesForFlashcards(flashcards),
    staleTime:1000*60*60,
  });

export default useFlashcards;