import { CloseIcon } from '@chakra-ui/icons'
import { Center, Flex, Stack,Icon,Text, Button } from '@chakra-ui/react'
import { FcFlashOn } from 'react-icons/fc';
import { IoIosCreate } from "react-icons/io";
import { BsCollection } from "react-icons/bs";
import { IconType } from 'react-icons';
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useUserStore from '../userStore';
import { TbCardsFilled } from "react-icons/tb";

interface Props{
    closeContents:()=>void;
    show:boolean;
}
const ContentsMenu = ({closeContents,show}:Props) => {
    const userStore=useUserStore();
    const navigate=useNavigate();
    
    const items=[
        {name:'Main Page',icon:FcFlashOn,nav:'/'},
        {name:'Create new set',icon:IoIosCreate,color:'blue.400',nav:'/create'},
        {name:'Your flashcards',icon:TbCardsFilled,color:'purple',nav:'/flashcards'},
        {name:'Your quizzes',icon:BsCollection,nav:'/quiz-list'}];

        const wrapper=(icon:IconType,text:string,color?:string,nav?:string)=>{
            return <Flex  height='60px' pl={3} alignItems='center' cursor='pointer' onClick={()=>{handleNavigate(nav);userStore.triggerRefetch()}}>
            <Icon as={icon} boxSize={8} color={color}/>
            <Text fontSize='2xl' fontWeight='semibold' ml={3}>{text}</Text>
        </Flex>
        }
        const handleNavigate=(nav?:string)=>{
            closeContents();
            if(nav) navigate(nav);            
        }

        const handleLogout=()=>{
            localStorage.removeItem('token');
            userStore.reset();
            closeContents();
        }
  return (
    <Stack spacing={3} color='black' pt='80px' position='absolute' top='0' transition='0.35s linear' 
     left={show?'0':'-100%'} zIndex={2}  minHeight='100%' width='100%' bg='white'>
        <Center position='absolute' border='2px solid var(--chakra-colors-gray-300)' borderRadius='50%' 
        boxSize='40px' top='20px' right='20px' cursor='pointer' onClick={closeContents}>
            <CloseIcon color='gray.500'/>
        </Center>
        {items.map(item=>wrapper(item.icon,item.name,item.color,item.nav))}
        <hr style={{width:'100%',border:'1px solid var(--chakra-colors-gray-100)'}} />
        <Flex pl={3} height='70px' alignItems='center'> 
            <Icon as={FaUserCircle} boxSize={10} color='gray.600'/>
            <Stack spacing={0} ml={4}>
            <Text fontSize='xl' fontWeight='semibold'>{userStore.email?.substring(0, userStore.email?.indexOf('@'))}</Text>
            <Text color='gray.600'>{userStore.email}</Text>
            </Stack>
         </Flex>
        <Stack spacing={5} width='100%' flexGrow={1} padding='20px 20px'>
        <Button width='100%' variant='outlined' border='2px solid var(--chakra-colors-gray-300)'
        onClick={handleLogout}>
            Logout
        </Button>
        <Text fontSize='xl' fontWeight='semibold' color='gray.400' cursor='pointer'>Privacy Policy</Text>
        </Stack>
    </Stack>
  )
}

export default ContentsMenu