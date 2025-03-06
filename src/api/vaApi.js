import vaAgent from './vaAgent';

export const searchCollection = async (q, page) => {
  const response = await vaAgent.Search.query(q, page);
  return response;
};

export const loadObject = async (id) => {
  const response = await vaAgent.Objects.details(id);
  return response;
};
