import axios from 'axios';

const vaClient = axios.create({
  baseURL: 'https://api.vam.ac.uk/v2',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const responseBody = (repsonse) => repsonse.data;

const requests = {
  get: (url, config) => vaClient.get(url, config).then(responseBody),
};

const Search = {
  query: (q, page = 1) =>
    requests.get(`/objects/search`, {
      params: {
        images_exist: 1,
        page_size: 10,
        page,
        q,
      },
    }),
};

const Objects = {
  details: (id) => requests.get(`/museumobject/${id}`),
};

const vaAgent = {
  Search,
  Objects,
};

export default vaAgent;
