import axios from 'axios';

const metClient = axios.create({
  baseURL: 'https://collectionapi.metmuseum.org/public/collection/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const requests = {
  get: (url, config) => metClient.get(url, config),
};

const Search = {
  query: (q, artistOrCulture = false) =>
    requests.get(`/search`, {
      params: {
        hasImages: true,
        artistOrCulture,
        q,
      },
    }),
};

const Objects = {
  details: (id) => requests.get(`/objects/${id}`),
};

const metAgent = {
  Search,
  Objects,
};

export default metAgent;
