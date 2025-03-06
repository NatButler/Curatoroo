export const paginate = (ids, size) => {
  const paginatedResults = {
    total: ids ? ids.length : 0,
    pages: [],
  };
  for (let i = 0; i < paginatedResults.total; i += size) {
    const chunk = ids.slice(i, i + size);
    const page = `${i + 1}-${i + chunk.length}`;
    paginatedResults.pages.push(page);
    paginatedResults[page] = chunk;
  }
  return paginatedResults;
};

export const metObjectMap = (object) => ({
  collection: 'MET',
  objectID: object.objectID.toString(),
  title: object.title,
  artistDisplayName: object.artistDisplayName,
  objectDate: object.objectDate,
  medium: object.medium,
  primaryImageSmall: object.primaryImageSmall,
});

export const vaObjectMap = (object) => ({
  collection: 'VA',
  objectID: object.systemNumber,
  title: object._primaryTitle,
  artistDisplayName: object._primaryMaker.name,
  objectDate: object._primaryDate,
  medium: object.objectType,
  primaryImageSmall: object._images._primary_thumbnail.replace(
    '!100,100',
    '!700,700'
  ),
});
