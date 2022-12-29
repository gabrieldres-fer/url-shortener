import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notification = (state = '', message = '') => {
   const { success, error } = toast;
   switch (state) {
      case 'success':
         success(message, { autoClose: 1000, icon: '✅' });
         break;
      case 'error':
         error(message, { autoClose: 1000, icon: '❗' });
         break;
   }
};
