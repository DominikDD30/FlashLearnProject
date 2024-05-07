import { create } from "zustand";
interface UserStore{
    userId?:number;
    email?:string;
    jwt?:string;
    refetchTrigger:number;
    setUserId:(userId:number)=>void;
    setEmail:(email:string)=>void;
    setJwt:(jwt:string)=>void;
    reset:()=>void;
    triggerRefetch:()=>void;
  }


  const useUserStore=create<UserStore>(set=>({
    refetchTrigger:0,
    setUserId:(userId)=>set(()=>({userId: userId})),
    setEmail:(email)=>set(()=>({email: email})),
    setJwt:(jwt)=>set(()=>({jwt: jwt})),
    triggerRefetch:()=>set((state)=>({refetchTrigger: state.refetchTrigger+1})),
    reset:()=>set(()=>({userId:undefined,email:undefined,jwt:undefined}))
}));

export default useUserStore;