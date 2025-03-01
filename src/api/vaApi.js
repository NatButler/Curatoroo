import vaAgent from './vaAgent';

export const searchCollection = async (q) => {
  const response = await vaAgent.Search.query(q);
  return response.records.map((object) => ({
    objectID: object.systemNumber,
    title: object._primaryTitle,
    artistDisplayName: object._primaryMaker.name,
    objectDate: object._primaryDate,
    medium: object.objectType,
    primaryImageSmall: object._images._primary_thumbnail.replace(
      '!100,100',
      '!700,700'
    ),
  }));
};

export const loadObject = async (id) => {
  const response = await vaAgent.Objects.details(id);
  return response;
};
