import AuthClient from '../services/authClient';


const authClient=new AuthClient("/auth/register");


const useRegister = (email:string,password:string) => {
 return authClient.register(email,password);
}

export default useRegister


