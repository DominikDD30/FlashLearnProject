import { Box,Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

interface Props{
    toggle:number;
}

const FloatingText = ({toggle}:Props) => {
    const [animate,setAnimate]=useState(toggle);

    useEffect(()=>{
        setAnimate(toggle);
    },[toggle])
    
  return (
    <Box position='relative'  zIndex={1} width='190px' >
    {/* <Box position='relative' mb={animate==-1?'20px':'20px'} zIndex={1} width='190px' > */}
    <label style={{position:'absolute',top:'25px', left:'0px',pointerEvents:'none',
     fontSize:'19px',color:`${animate==1?'var(--chakra-colors-blue-500)':'gray'}`}}>
       <Text as='span' transform={animate==1?'translateY(-20px)':'none'} display='inline-block'  minWidth='5px' transition='0.3s 0s cubic-bezier(0.68,-0.55,0.265,1.55)'>Q</Text> 
       <Text as='span' transform={animate==1?'translateY(-20px)':'auto'} display='inline-block'  minWidth='5px' transition='0.3s 0.050s cubic-bezier(0.68,-0.55,0.265,1.55)'>u</Text> 
       <Text as='span' transform={animate==1?'translateY(-20px)':'auto'} display='inline-block'  minWidth='5px' transition='0.3s 0.1s cubic-bezier(0.68,-0.55,0.265,1.55)'>e</Text> 
       <Text as='span' transform={animate==1?'translateY(-20px)':'auto'} display='inline-block'  minWidth='5px' transition='0.3s 0.150s cubic-bezier(0.68,-0.55,0.265,1.55)'>s</Text> 
       <Text as='span' transform={animate==1?'translateY(-20px)':'auto'} display='inline-block'  minWidth='5px' transition='0.3s 0.2s cubic-bezier(0.68,-0.55,0.265,1.55)'>t</Text> 
       <Text as='span' transform={animate==1?'translateY(-20px)':'auto'} display='inline-block'  minWidth='5px' transition='0.3s 0.25s cubic-bezier(0.68,-0.55,0.265,1.55)'>i</Text> 
       <Text as='span' transform={animate==1?'translateY(-20px)':'auto'} display='inline-block'  minWidth='5px' transition='0.3s 0.3s cubic-bezier(0.68,-0.55,0.265,1.55)'>o</Text> 
       <Text as='span' transform={animate==1?'translateY(-20px)':'auto'} display='inline-block'  minWidth='5px' transition='0.3s 0.35s cubic-bezier(0.68,-0.55,0.265,1.55)'>n</Text> 
    </label>
     </Box>
  )
}

export default FloatingText