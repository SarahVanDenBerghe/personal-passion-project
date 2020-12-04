import axios from 'axios';
import { io } from 'socket.io-client';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_STRAPI_API}`,
});

const strapiSocket = io.connect(`${process.env.REACT_APP_STRAPI_API}`);

class StrapiService {
  /* BAUBLES -------------- */
  createBauble = async (bauble) => {
    const response = await api.post('/messages', {
      name: bauble.name,
      x: bauble.x,
      y: bauble.y,
      z: bauble.z,
      text: bauble.text,
      location: bauble.location,
      tree: bauble.treeId,
    });
    return response.data;
  };

  getAllBaublesByTree = async (id) => {
    const response = await api.get(`/trees/${id}?_limit=-1`);
    return response.data;
  };

  /* TREES -------------- */
  createTree = async (tree) => {
    const response = await api.post('/trees', {
      name: tree.name,
    });
    return response.data;
  };

  findTreeById = async (id) => {
    const response = await api.get(`/trees/${id}`);
    return response.data;
  };
}
export default StrapiService;
export const socket = strapiSocket;
