import { HamburgerIcon } from '@chakra-ui/icons';
import { HStack,Text,Icon,Center } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FcFlashOn } from "react-icons/fc";
import ContentsMenu from './ContentsMenu';
import { Link } from 'react-router-dom';
import AuthClient from '../services/authClient';
import useUserStore from '../userStore';


const authClient =new AuthClient('/auth/userData');
const Nav = () => {
    const [showContentsMenu,setShowContentsMenu]=useState(false);
    const token=localStorage.getItem('token');
    const userStore=useUserStore();

    useEffect(()=>{
      if(token){
        authClient.getUserData(token)
        .then(res=>{
          userStore.setUserId(res.data.userId);
          userStore.setEmail(res.data.email);
        })
        .catch(e=>{
          localStorage.removeItem('token');
          userStore.reset();
        })
      }
    },[token]);

    const handleShowMenu=()=>{
      if(userStore.email){
      setShowContentsMenu(!showContentsMenu);
      }
    }
  return (
    <>
    <ContentsMenu show={showContentsMenu} closeContents={()=>setShowContentsMenu(false)}/>
    <HStack height='70px' width='100%' bg='white' shadow='sm' p='0px 15px' >
        <HamburgerIcon  cursor='pointer'  color='gray.600' boxSize={7} onClick={handleShowMenu} />
        <Link to='/'><Text fontSize={{base:'xl',lg:'3xl'}} ml={2} fontWeight='bold' color='gold'>
            FlashLearn
        <Icon as={FcFlashOn} boxSize={{base:6,lg:8}}/>
        </Text></Link>
        
        {!userStore.email?<>
        <Center height='55%'  cursor='pointer' ml='auto'>
           <Link to={'/login'}><Text color='gray.600' fontSize='16px' fontWeight='500'>Login</Text></Link>
        </Center>

        <Center height='55%' width='80px'  bg='gold' cursor='pointer' ml='10px'  borderRadius='10px'>
        <Link to={'/register'}><Text color='black' fontSize='15px' fontWeight='500'>Register</Text></Link>
        </Center></>
      :
      <Center height='55%' width='80px'  bg='gold' cursor='pointer' ml='auto'  borderRadius='10px'>
      <Text color='black' fontSize='15px' fontWeight='500'>Upgrade</Text>
  </Center>  
      }
        
    </HStack>
    </>
  )
}

export default Nav