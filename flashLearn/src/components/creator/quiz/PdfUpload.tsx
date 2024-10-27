import { Button ,Text,Icon, useToast, ToastId} from "@chakra-ui/react";
import { useRef } from "react";
import { FiUpload } from "react-icons/fi";
import ApiClient from "../../../services/ApiClient";
import useCreatorStore from "../../../creatorStore";

interface Props{
 startLoading:()=>void;
 stopLoading:()=>void;
}

const apiClient=new ApiClient("/generate");
const PdfUpload = ({startLoading,stopLoading}:Props) => {
  const creatorStore=useCreatorStore();
const fileInputRef = useRef<HTMLInputElement>(null);
const toast = useToast()
const toastIdRef = useRef<ToastId | undefined>();

const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    startLoading();
    apiClient.generateQuizzes(file!)
    .then(res=>creatorStore.setQuizItems(res))
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
       <Text mr={2} color='black'>generate set</Text> 
       <Icon as={FiUpload} color='black' boxSize={6}/>
        </Button>
    </>
  );
};

export default PdfUpload;
