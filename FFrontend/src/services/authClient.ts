import axios from 'axios';

   
      
      
      export const axiosInstance= axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
      });

     export interface AuthResponse {
        token: string;
      }

     

      interface  UserData {
        userId:number;
        email:string;
    }


      
      class AuthClient{
        endpoint:string;
      
        constructor(endpoint:string){
          this.endpoint=endpoint;
        }
      
        

        authenticate=(email:string,password:string)=>{            
          return axiosInstance.post<AuthResponse>(this.endpoint,{email:email,password:password});
        }

        register=(email:string,password:string)=>{            
          return axiosInstance.post(this.endpoint,{email:email,password:password});
        }

        getUserData=(token:string)=>{
          return axiosInstance.post<UserData>(this.endpoint,token);
        }

     
    }



export default AuthClient;