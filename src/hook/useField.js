import { useState } from 'react';

export const useField = () => {
   const [inputValue, setInputValue] = useState({
      url: '',
      linkId: ''
   });

   const handleInput = (e) => {
      setInputValue({
         ...inputValue,
         url: e.target.value,
         linkId: Math.random().toString(36).substring(2, 5)
      });
   };

   return { inputValue, handleInput, setInputValue };
};
