import { Box, Flex,Input,Stack,Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const PdfDropBox = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    setSelectedPdf(file);
  };

  return (
    <Box position='fixed' top='0' left='0' right='0' height='100vh' width='100vw'  bg='rgba(0,0,0,0.5)' zIndex={6}>
    <Flex border='2px solid gray' position='fixed' top='50%' left='50%' w='90%' height='300px' zIndex={7} 
    bg='white' transform='translate(-50%,-50%)' flexDirection='column'>
      <Text>Wybierz plik PDF</Text>
      <Input type="file" accept=".pdf" onChange={handlePdfChange} />
      {selectedPdf && (
        <Stack>
          <Text>Nazwa pliku: {selectedPdf.name}</Text>
          <Text>Rozmiar pliku: {selectedPdf.size} bajtów</Text>
          {/* Tutaj możesz dodać obsługę załadowanego pliku PDF */}
        </Stack>
      )}
    </Flex>
    </Box>
  );
};

export default PdfDropBox;
