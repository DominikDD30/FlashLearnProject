import { Button ,Text,Icon, useToast, ToastId} from "@chakra-ui/react";
import { useRef } from "react";
import { FiUpload } from "react-icons/fi";
import useCreatorStore from "../../../creatorStore";
import GenerationService from "../../../services/GenerationService";

interface Props{
 startLoading:()=>void;
 stopLoading:()=>void;
}

const apiClient=new GenerationService("/generate");
const PdfUpload = ({startLoading,stopLoading}:Props) => {
  const creatorStore=useCreatorStore();
const fileInputRef = useRef<HTMLInputElement>(null);
const toast = useToast()
const toastIdRef = useRef<ToastId | undefined>();

const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    startLoading();
    apiClient.generateQuizzesFromFile(file!)
    .then(res=>creatorStore.setQuestions(res.data))
    .catch(()=>showToast("automatic generation failed"))
    .finally(()=>stopLoading());
};

const handleGenerate = () => {
    fileInputRef.current!.click();
};

function showToast(message:string) {
  toastIdRef.current = toast({
    description: message,
    status: 'warning',
    duration: 2000,
    position:'bottom',
    containerStyle: {
      marginBottom: '100px',
    }
   })
}

  return (
    <>
      <input
        type="file"
        accept=".pdf"
        onChange={handlePdfChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Button  width='60%' height='40px' mt={5} bg='gray.300' border='2px solid black' 
      onClick={handleGenerate}>
       <Text mr={2} color='black'>generate from PDF </Text> 
       <Icon as={FiUpload} color='black' boxSize={6}/>
        </Button>
    </>
  );
};

export default PdfUpload;
