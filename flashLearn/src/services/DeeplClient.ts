
import axios from 'axios';
import TranslateResponse from '../entities/TranslateResponse';

export const axiosInstance= axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL+'/deepl',
 });


class DeeplClient{
    endpoint:string;

    constructor(){
        this.endpoint="";
      }

      
    translateText=(text:string,source:string,target:string)=>{
      const token=localStorage.getItem('token');
      const newSource=source=='EN-GB'?'EN':source;
        return axiosInstance.get<TranslateResponse>(this.endpoint+'/translate',{
          params:{text:text,source:newSource,target:target},
               headers: {
                 Authorization: `Bearer ${token}`, 
                 'Content-Type': 'application/json',
               }
             });
       }  

}

export default DeeplClient;

