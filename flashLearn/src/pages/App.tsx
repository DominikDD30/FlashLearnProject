import { Flex } from '@chakra-ui/react'
import Nav from '../components/Nav'
import { Outlet } from 'react-router-dom'

function App() {

  

  return (
   <Flex flexDirection='column'    minH='100vh'   bg='gray.100'>
    <Nav/>
    <Outlet/>
   </Flex>
  )
}

export default App
