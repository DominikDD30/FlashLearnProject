import { Box } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children:ReactNode;
  flip:boolean;
  isBlocked:boolean;
}

const FlipCardAnimationWrapper = ({ children,flip,isBlocked}: Props) => {
  const [rotate,setRotate]=useState(false);
  
  useEffect(()=>{
    setRotate(flip);
  },[flip]);
  
  return (
    <Box borderRadius={10}>
    <Box  borderRadius={10}   cursor='initial'
        transition={isBlocked?'':'transform 1.1s'} transform={rotate?'rotateY(180deg) scale(1.05)':''} style={{transformStyle:'preserve-3d'}}>
    {children}
     </Box>
     </Box>

  );
};

export default FlipCardAnimationWrapper;
