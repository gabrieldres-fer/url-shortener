import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../supabase';

export const LinkID = () => {
   const { linkid } = useParams();
   const navigate = useNavigate();

   supabase
      .from('url')
      .select('*')
      .eq('linkId', linkid)
      .then(({ data }) => {
         if (!data.length) {
            return navigate('/');
         } else {
            return window.location.replace(data[0].url);
         }
      });

   return (
      <div className="flex items-center">
         <p className="p-4 pr-2">Redireccionando...</p>
         <p className="animate-spin h-5 w-5 border-t-2 border-blue-600 rounded-xl"></p>
      </div>
   );
};
