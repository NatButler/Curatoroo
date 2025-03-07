export const paginate = (ids, size) => {
  const paginatedResults = {
    record_count: ids ? ids.length : 0,
    pageKeys: [],
    pages: 0,
  };
  for (let i = 0; i < paginatedResults.record_count; i += size) {
    const chunk = ids.slice(i, i + size);
    const page = `${i + 1}-${i + chunk.length}`;
    paginatedResults.pageKeys.push(page);
    paginatedResults.pages += 1;
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
