import {Image,  Modal, ModalContent, ModalBody, ModalOverlay, ModalCloseButton } from '@chakra-ui/react';
import React from 'react'


interface Props{
    selectedPhoto:string|null;
    closeModal:()=>void;
}
const ImageZoomModal = ({selectedPhoto,closeModal}:Props) => {

    
  return (
    <Modal isOpen={!!selectedPhoto} onClose={closeModal} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody display='flex' alignItems='center' justifyContent='center'>
            {selectedPhoto && (
              <Image
                src={selectedPhoto}
                alt={`Zoomed`}
                objectFit="contain"
                w="100%"
                h="100%"
                cursor='pointer'
                onClick={closeModal}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default ImageZoomModal