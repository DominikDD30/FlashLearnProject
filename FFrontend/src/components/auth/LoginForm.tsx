/* eslint-disable react-hooks/rules-of-hooks */
import { Button,  FormLabel, Text, Input, Flex, InputGroup, InputRightElement, Show, Center, Stack } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import useUserStore from '../../userStore';
import { FieldValues, useForm } from 'react-hook-form';
import DividerTemplate from './DividerTemplate';
import useAuth from '../../hooks/useAuth';



interface SignInData{
  email:string;
  password:string;
}




const LoginForm = () => {
  const {register,handleSubmit}=useForm<SignInData>();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate=useNavigate();
  const userState =useUserStore();
  


  
  
  const onSubmit= (data:FieldValues)=>{
    useAuth(data.email, data.password)
    .then(res => {
      userState.setJwt(res.data.token);
      localStorage.removeItem('token');
      localStorage.setItem('token',res.data.token);   
        navigate('/');
    })
    .catch(err=>{
      console.log(err);
      setLoginError(true);
    });

  };
  

  return (
    <Center   bgPosition='bottom'  flexGrow={1} padding='80px 15px' alignItems='flex-start'>
    <Center width={{sm:'400px',md:'400px',xl:'30%'}} bg='gray.200' color='gray.600'  
    border='2px solid white' padding={5} mt={2} mb={10} borderRadius='10px' >
    <form  onSubmit={handleSubmit(onSubmit)}>
        <FormLabel mb={5} fontSize='lg'>Log In</FormLabel>
        <Input {...register('email',{required: true,minLength:3})} id='login' type='text' placeholder='login'
         _placeholder={{ color: "black",fontSize:'lg'}} _focus={{boxShadow:'none',border:'2px solid var(--chakra-colors-gray-400)'}}  _hover={{}}
          border='2px solid var(--chakra-colors-gray-400)' onChange={()=>setLoginError(false)}/>

        <InputGroup  size='md' mt={3}>
           <Input {...register('password',{required:true})} id='password' pr='4.5rem' _hover={{}}
            border='2px solid var(--chakra-colors-gray-400)' type={showPassword ? 'text' : 'password'}
             placeholder='password' _placeholder={{ color: "black",fontSize:'lg'}} _focus={{boxShadow:'none',border:'2px solid var(--chakra-colors-gray-400)'}}
              onChange={()=>setLoginError(false)}/>

          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' bg='none' color='gray.400' onClick={()=>setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        
        <Flex  flexWrap='wrap'  mb={6} position='relative'>
        <Show above='sm'>
        {loginError && <Text color='red.500' mt={0}  flexBasis='100%'>Wrong email or password</Text>}
        </Show>
        <Show below='sm'>
        {loginError && <Text color='red.500' mt={5} whiteSpace='nowrap' flexBasis='100%'>Wrong email or password</Text>}
        </Show>
        <Button type='submit'  marginRight='auto' mt={2} border='1px solid white' bg='rgb(112,128,144)'_hover={{bg:'rgb(119,136,153)'}} >
          Log in
          </Button>
        <Text cursor='pointer' position='absolute'  top='0' right='0'>Forget Your Password?</Text>
        </Flex>

         
        <DividerTemplate>or</DividerTemplate>
        <Stack mt={5} mb={3} >
          {/* Not implemented yet */}
        {/* <LoginWithGoogle/> */}
        </Stack>
        <Link to='/register'><Text textDecoration="underline" fontSize='lg'>Create an Account</Text></Link>
    </form>
    </Center>
    </Center>
  )
}

export default LoginForm



