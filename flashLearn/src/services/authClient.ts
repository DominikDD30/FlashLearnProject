import axios from 'axios';
import React from 'react'

   
      
      
      export const axiosInstance= axios.create({
        baseURL: "http://localhost:8190/flash-learn",
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