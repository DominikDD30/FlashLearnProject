import * as deepl from 'deepl-node';
import TranslateResponse from '../entities/TranslateResponse';
import axios from 'axios';

export const axiosInstance= axios.create({
    baseURL: "http://localhost:8190/flash-learn/deepl",
 });


class DeeplClient{
    endpoint:string;

    constructor(){
        this.endpoint="";
      }

      
    translateText=(text:string,source:string,target:string)=>{
      const token=localStorage.getItem('token');
        return axiosInstance.get<TranslateResponse>(this.endpoint+'/translate',{
          params:{text:text,source:source,target:target},
               headers: {
                 Authorization: `Bearer ${token}`, 
                 'Content-Type': 'application/json',
               }
             });
       }  

}

export default DeeplClient;

