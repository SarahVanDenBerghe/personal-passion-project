import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_STRAPI_API}`,
});

class StrapiService {
  getAllBaubles = async () => {
    const response = await api.get('/messages?_limit=-1');
    return response.data;
  };

  createBauble = async (bauble) => {
    const response = await api.post('/messages', {
      name: bauble.name,
      x: bauble.x,
      y: bauble.y,
      z: bauble.z,
      text: bauble.text,
      location: bauble.location,
    });
    return response.data;
  };
}
export default StrapiService;
