/* eslint-disable react-hooks/rules-of-hooks */
import { Button,  FormLabel, Text, Input, Flex, InputGroup, InputRightElement, Show, Center, Stack, Box, useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import AuthClient from '../../services/authClient';
import { useState } from 'react';
import useUserStore from '../../userStore';
import { FieldValues, useForm } from 'react-hook-form';
import DividerTemplate from './DividerTemplate';
import LoginWithGoogle from './LoginWithGoogle';
import LoginWithFacebook from './LoginWithFacebook';
import useRegister from '../../hooks/useRegister';



interface SignUpData{
  email:string;
  password:string;
  passwordAgain:string;
}



const RegisterForm = () => {
  const {register,handleSubmit,formState:{errors},watch}=useForm<SignUpData>();
  const [showPassword, setShowPassword] = useState(false);
  const [emailAlreadyExistsError, setEmailAlreadyExistsError] = useState(false);
  const navigate=useNavigate();
  const userState =useUserStore();
  const toast = useToast();

  
  const onSubmit= (data:FieldValues)=>{
    useRegister(data.email, data.password)
    .then(res => {
      userState.setJwt(res.data.token);
      console.log("data"+res.data);
      localStorage.setItem('token',res.data.token); 
      userState.setEmail(data.email); 
      toast({
        title: 'Account created',
        description: "Account Successfully Registered! Welcome!",
        status: 'success',
        duration: 9000,
        isClosable: true,
      }) 
        navigate('/');
    })
    .catch(err=>{
      if(err.response && err.response.status===400){
        setEmailAlreadyExistsError(true);
      }
    });

  };
  
  const resetErrors=()=>{
    setEmailAlreadyExistsError(false);
  }

  return (
    <Center   bgPosition='bottom'  flexGrow={1} padding='80px 15px' alignItems='flex-start'>
    <Center width={{sm:'400px',md:'400px',xl:'30%'}} bg='gray.200' color='gray.600'  
    border='2px solid white' padding={5} mt={2} mb={10} borderRadius='10px' >
    <form  onSubmit={handleSubmit(onSubmit)}>
        <FormLabel mb={5} fontSize='lg'>Register</FormLabel>

        <Stack spacing={3}>
        <Box>
        <Input {...register('email',{required: true,minLength:3,pattern: {
          value: /^[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})$/,
          message: 'email format should be text@domain.com',
        }})} 
        onChange={resetErrors} id='email' type='text'   placeholder='email' 
        _placeholder={{ color: "black",fontSize:'lg'}} _hover={{}} border='2px solid var(--chakra-colors-gray-400)'/>
        {errors.email &&  <Text color='red.500' flexBasis='100%' >this email looks wrong</Text>}
        {emailAlreadyExistsError &&  <Text color='red.500' flexBasis='100%' >this email already exist</Text>}
        </Box>

        <Box>
        <InputGroup  size='md' >
           <Input {...register('password',{required: true,minLength:3,pattern:{
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/,
          message: 'password should be at least 7 characters,and contains one small, one big letter and one number',
        }})}
        onChange={resetErrors} id='password' pr='4.5rem'  type={showPassword ? 'text' : 'password'}
         placeholder='password' _placeholder={{ color: "black",fontSize:'lg'}} _hover={{}} border='2px solid var(--chakra-colors-gray-400)'/>

          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' color='gray.400' size='sm' onClick={()=>setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.password && <Text color='red.500' flexBasis='100%' >password should be at least 7 characters,and contains one small, one big letter and one number</Text>}
        </Box>
        

        <Box>
        <Input {...register('passwordAgain',{
          required: true,
          minLength:3,
          validate: (value) => value === watch('password') || 'Passwords do not match'})} 
        id='passwordAgain' pr='4.5rem'  type='password'
        onChange={resetErrors}
         placeholder='repeat password' _placeholder={{ color: "black",fontSize:'lg'}} _hover={{}} border='2px solid var(--chakra-colors-gray-400)'/>
         {errors.passwordAgain && <Text color='red.500' flexBasis='100%' >passwords do not match</Text>}
        </Box>

        

        
        <Flex  flexWrap='wrap'  mb={6} position='relative'>
        <Button type='submit'  marginRight='auto' mt={2} border='1px solid white' bg='rgb(112,128,144)'_hover={{bg:'rgb(119,136,153)'}} >
          Create account
          </Button>
        </Flex>
        </Stack>

        <DividerTemplate>or</DividerTemplate>
        <Stack mt={5} mb={3} >
        <LoginWithGoogle/>
        <LoginWithFacebook/>
        </Stack>
    </form>
    </Center>
    </Center>
  )
}

export default RegisterForm



