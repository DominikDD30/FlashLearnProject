import { Spinner, Stack,Text } from '@chakra-ui/react'

const ProcessingSpinner = () => {
  return (
    <Stack alignItems='center' margin='100px auto'>
    <Text fontSize='lg' color='gray.600' textAlign='center'>Processing</Text>
    <Spinner
      transform='translate(-50%,-50%)'
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl' />
    </Stack>
  )
}

export default ProcessingSpinner