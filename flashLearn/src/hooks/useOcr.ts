import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/ApiClient";



const apiClient=new ApiClient("/quiz");


const useOcr = (file:File) => 
   useQuery({
    queryKey:['ocrQuizItems'],
    queryFn:()=>apiClient.ocrFile(file),
    staleTime:1000*60*60,
  });

export default useOcr;