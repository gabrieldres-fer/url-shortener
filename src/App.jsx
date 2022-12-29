import { useState } from 'react';
import { LinkIcon } from '@heroicons/react/24/solid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from './supabase';
import { useField } from './hook/useField';
import { notification } from './helper/notification';

export const App = () => {
   const [shortenedUrl, setShortenedUrl] = useState('Genera el link');
   const { inputValue, handleInput, setInputValue } = useField();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const inputElement = document.querySelector('input');
      const validateUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i;

      if (inputValue.url === '') {
         notification('error', 'Debes introducir una url');
         inputElement.classList.add('border-red-500');
      } else if (validateUrl.test(inputValue.url) === false) {
         notification('error', 'La url no es valida');
         inputElement.classList.add('border-red-500');
      } else {
         // Agrega la url a la base de datos
         await supabase.from('url').insert(inputValue);
         const response = await supabase.from('url').select().eq('linkId', inputValue.linkId);
         const { data, status } = response;
         const lastUrl = data[data.length - 1].linkId;

         if (status === 200) {
            // Notifica que la url se acorto y coloca de verde el borde del input
            notification('success', 'La url ha sido acortada');
            inputElement.classList.add('border-green-500');
            inputElement.classList.remove('border-red-500');

            // Limpiar el formulario y los datos agregados en el estado
            setInputValue({ url: '', linkId: '' });
            setShortenedUrl(`${window.location.href}${lastUrl}`);

            setTimeout(() => {
               e.target.reset();
               inputElement.classList.remove('border-green-500');
            }, 1000);
         }
      }
   };

   const copyLink = ({ target }) => {
      navigator.clipboard.writeText(target.textContent);
      notification('success', 'Link copiado');
   };

   return (
      <div className="flex flex-col h-screen items-center justify-center">
         <h1 className="md:text-4xl text-3xl font-semibold">Acortador de Urls!</h1>
         <form onSubmit={handleSubmit} className="m-6 w-4/5 md:w-[400px] bg-white ">
            <input
               type="text"
               onChange={handleInput}
               placeholder="Pega tu url"
               className="border w-full border-black mb-2 p-2 rounded-sm"
               autoComplete="off"
            />

            <div className="flex flex-col">
               <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 transition duration-200 ease p-2 rounded-sm text-white"
               >
                  Generar
               </button>
            </div>
         </form>
         <div className="flex mt-2">
            <p className="mr-1 flex">
               <LinkIcon className="w-5 mr-1" />
               <span className="font-semibold">Link:</span>
            </p>
            <button className="text-blue-500" onClick={copyLink}>
               {shortenedUrl}
            </button>
         </div>
         <ToastContainer />
      </div>
   );
};
