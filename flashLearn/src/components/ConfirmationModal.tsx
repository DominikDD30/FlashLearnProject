import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'

interface Props{
    open:boolean;
    close:()=>void;
    confirmed:()=>void;
}


const ConfirmationModal = ({open,close,confirmed}:Props) => {
    const { onClose } = useDisclosure();
  return (
    <Modal isOpen={open} onClose={()=>{onClose(),close()}}  size='xs'>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Are you sure ?</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
       
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='red' mr={3} onClick={()=>{confirmed();close();onClose()}} >
          Confirm
        </Button>
        <Button variant='ghost' onClick={()=>{onClose(),close()}}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default ConfirmationModal