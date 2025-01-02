import axios from 'axios';
import { LIST_CREATION_API_URL } from '../constants/apiUrls';

export const fetchLists = async () => {
  const response = await axios.get(LIST_CREATION_API_URL);
  return response.data;
};
