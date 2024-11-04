import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider} from '@chakra-ui/react'
import router from '../public/routes'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import theme from './theme'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/500.css'

// import theme from './theme'

const queryClient=new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
       <RouterProvider router={router}/>
    </ChakraProvider>
    </QueryClientProvider>
   // </React.StrictMode> 
)
