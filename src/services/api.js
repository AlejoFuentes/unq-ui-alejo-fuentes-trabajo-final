import Axios from 'axios';

const url = 'https://word-api-hmlg.vercel.app/api';

export const validarPalabra = async (palabra) => {
  const response = await Axios.get(`${url}/validate`, {
    params: {
      word: palabra
    }
  });
  
  return response.data; 
};