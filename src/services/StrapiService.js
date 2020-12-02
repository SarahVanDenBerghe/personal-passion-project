import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_STRAPI_API}`,
});

class StrapiService {
  getAllBaubles = async () => {
    const response = await api.get('/messages?_limit=-1');
    return response.data;
  };

  /* Post message to tree */
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

  getAllBaublesByTree = async (id) => {
    const response = await api.get(`/trees/${id}?_limit=-1`);
    return response.data;
  };

  createTree = async (tree) => {
    const response = await api.post('/trees', {
      name: tree.name,
      uid: tree.uid,
    });
    return response.data;
  };
}
export default StrapiService;
