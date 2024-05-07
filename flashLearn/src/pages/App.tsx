import { useState } from 'react'
// import './App.css'
import { Box, Flex } from '@chakra-ui/react'
import Nav from '../components/Nav'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
   <Flex flexDirection='column' minHeight='100vh'  width='100vw' bg='gray.100'>
    <Nav/>
    <Outlet/>
   </Flex>
  )
}

export default App
