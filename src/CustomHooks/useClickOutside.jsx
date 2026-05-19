import React, { useRef } from 'react';
import { useEffect } from 'react';

export function useClickOutside(onClose) {
const domNodeRef=useRef();
useEffect(()=>{
    const handleClickOutside=(event)=>{
        if(domNodeRef.current && !domNodeRef.current.contains(event.target)){
            onClose();
        }
        };
    document.addEventListener('click',handleClickOutside,true);
    return()=>{
        document.removeEventListener('click',handleClickOutside,true);
    };
},[]);
    return domNodeRef;
}

