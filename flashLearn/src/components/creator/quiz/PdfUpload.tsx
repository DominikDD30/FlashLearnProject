import { Button ,Text,Icon} from "@chakra-ui/react";
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

const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    startLoading();
    apiClient.generateQuizzes(file!)
    .then(res=>creatorStore.setQuizItems(res))
    .catch(err=>console.log(err))
    .finally(()=>stopLoading());
};

const handleButtonClick = () => {
    fileInputRef.current!.click();
};

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
      onClick={handleButtonClick}>
       <Text mr={2} color='black'>generate set</Text> 
       <Icon as={FiUpload} color='black' boxSize={6}/>
        </Button>
    </>
  );
};

export default PdfUpload;
