import AuthClient from '../services/authClient';


const authClient=new AuthClient('/auth/login');

const useAuth = (login:string,password:string) => {
 return authClient.authenticate(login,password);
}

export default useAuth


