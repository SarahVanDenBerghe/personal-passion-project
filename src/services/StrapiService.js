import axios from 'axios';
import { io } from 'socket.io-client';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_STRAPI_API}`,
});

const strapiSocket = io.connect(`${process.env.REACT_APP_STRAPI_API}`);

class StrapiService {
  uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('files', file);
    const response = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return response.data[0].id;
  };

  /* BAUBLES -------------- */
  createBauble = async (bauble) => {
    const response = await api.post('/messages', {
      name: bauble.name,
      x: bauble.x,
      y: bauble.y,
      z: bauble.z,
      text: bauble.text,
      tree: bauble.treeId,
      style: bauble.style,
      color: bauble.color,
    });

    return response.data;
  };

  createBaubleWithImage = async (bauble) => {
    const imageId = await this.uploadImage(bauble.image);

    const response = await api.post('/messages', {
      name: bauble.name,
      x: bauble.x,
      y: bauble.y,
      z: bauble.z,
      text: bauble.text,
      tree: bauble.treeId,
      style: bauble.style,
      image: imageId,
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

  findTreeById = (id) => {
    return api
      .get(`/trees/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.status;
      });
    // return response.data;
  };
}
export default StrapiService;
export const socket = strapiSocket;
