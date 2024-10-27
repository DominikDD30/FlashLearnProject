import { HamburgerIcon } from '@chakra-ui/icons';
import { HStack,Text,Icon,Center, useMediaQuery, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FcFlashOn } from "react-icons/fc";
import ContentsMenu from './ContentsMenu';
import { Link, useNavigate } from 'react-router-dom';
import AuthClient from '../services/authClient';
import useUserStore from '../userStore';
import { IoIosCreate } from 'react-icons/io';
import { TbCardsFilled } from 'react-icons/tb';
import { BsCollection } from 'react-icons/bs';
import { IconType } from 'react-icons';


const authClient =new AuthClient('/auth/userData');

const Nav = () => {
    const [showContentsMenu,setShowContentsMenu]=useState(false);
    const token=localStorage.getItem('token');
    const userStore=useUserStore();
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');
    const navigate=useNavigate();
    

    useEffect(() => {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'token' && !event.newValue) {
          userStore.reset();
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);

    useEffect(()=>{
      if(token){
        authClient.getUserData(token)
        .then(res=>{
          userStore.setUserId(res.data.userId);
          userStore.setEmail(res.data.email);
        })
        .catch(()=>{
          localStorage.removeItem('token');
          userStore.reset();
        })
      }
    },[token,userStore.email,userStore.userId]);

    const handleShowMenu=()=>{
      if(userStore.email){
      setShowContentsMenu(!showContentsMenu);
      }
    }

    const handleLogout=()=>{
      localStorage.removeItem('token');
      userStore.reset();
     }

     const handleNavigate=(nav?:string)=>{
      if(!userStore.email) {
        navigate('/login');
      }else{
      navigate(nav!);
      userStore.triggerRefetch();
      }
     };

    const wrapper=(icon:IconType,text:string,color?:string,nav?:string)=>{
      return <Flex _hover={{bg:'gray.300'}} height='100%' p='0px 25px' alignItems='center'  cursor='pointer' onClick={()=>handleNavigate(nav)}>
      <Icon as={icon} boxSize={8} color={color}/>
      <Text fontSize='2xl' fontWeight='semibold' color='gray.600'>{text}</Text>
  </Flex>
  }

    const items=[
      {name:'Create new set',icon:IoIosCreate,color:'blue.400',nav:'/create'},
      {name:'Your flashcards',icon:TbCardsFilled,color:'purple',nav:'/flashcards'},
      {name:'Your quizzes',icon:BsCollection,color:'green',nav:'/quiz-learn'}];

    const logo=<Link to='/'><Text fontSize={{base:'xl',lg:'3xl'}} ml={2} mr='50px' fontWeight='bold' color='gold'>FlashLearn<Icon as={FcFlashOn} boxSize={{base:6,lg:8}}/>
    </Text></Link>;

  return (
    <HStack height='70px' width='100%' bg='white' shadow='sm' p='0px 10px' >
      {isLargerThan1200?
      <>
      {logo}
      {items.map(item=>wrapper(item.icon,item.name,item.color,item.nav))}
      
    
        {userStore.email?
            <Center height='55%' width='75px'  bg='gold' cursor='pointer' ml='auto'  borderRadius='10px' onClick={handleLogout}>
               <Text color='gray.700'>Logout</Text>
            </Center>
            :
            <Center height='55%' width='75px'  bg='gold' cursor='pointer' ml='auto'   borderRadius='10px'>
              <Link to={'/login'}><Text color='gray.700' fontSize='15px' fontWeight='500'>Login</Text></Link>
            </Center>
            }


      </>
      :
      <>
        <ContentsMenu show={showContentsMenu} closeContents={()=>setShowContentsMenu(false)}/>
        {userStore.email&&<HamburgerIcon  cursor='pointer'  color='gray.600' boxSize={7} onClick={handleShowMenu} />}
            {logo}
            
            
            {!userStore.email&&<>
            <Center height='55%'  cursor='pointer' ml='auto'>
              <Link to={'/login'}><Text color='gray.600' fontSize='15px' fontWeight='500'>Login</Text></Link>
            </Center>

            <Center height='55%' width='75px'  bg='gold' cursor='pointer' ml='10px'  borderRadius='10px'>
            <Link to={'/register'}><Text color='gray.700' fontSize='15px' fontWeight='500'>Register</Text></Link>
            </Center></>
          }
        </>
        }
    </HStack>
  )
}

export default Nav