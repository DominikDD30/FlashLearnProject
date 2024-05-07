import { create } from "zustand";
interface SoloGameStore{ 
    dificulity:number;
    setId:number;
    setDificulity:(difculity:number)=>void;
    setSetId:(setId:number)=>void;
    reset:()=>void;
  }


  const useSoloGameStore=create<SoloGameStore>(set=>({
    dificulity:6,
    setId:0,
    setDificulity:(difculity)=>set(()=>({dificulity:difculity})),
    setSetId:(setId)=>set(()=>({setId:setId})),
    reset:()=>set(()=>({dificulity:undefined,setId:undefined}))
}));

export default useSoloGameStore;