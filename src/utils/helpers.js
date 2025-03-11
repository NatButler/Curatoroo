import collectionNames from '../constants/collectionNames';

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
  collection: collectionNames.MET,
  objectID: object.objectID.toString(),
  title: object.title,
  artistDisplayName: object.artistDisplayName || '(Artist unknown)',
  objectDate: object.objectDate,
  medium: object.medium,
  primaryImageSmall: object.primaryImageSmall,
});

export const vaObjectMap = (object) => ({
  collection: collectionNames.VA,
  objectID: object.systemNumber,
  title: object._primaryTitle,
  artistDisplayName: object._primaryMaker?.name || '(Maker unknown)',
  objectDate: object._primaryDate,
  medium: object.objectType,
  primaryImageSmall: object._images?._primary_thumbnail.replace(
    '!100,100',
    '!700,700'
  ),
});

export const vaRecordObjectMap = (object) => ({
  collection: collectionNames.VA,
  objectID: object.record.systemNumber,
  title: object.record?.titles[0].title || '',
  artistDisplayName:
    (object.record?.artistMakerPerson.length &&
      object.record.artistMakerPerson[0].name?.text) ||
    object.record?.artistMakerOrganisations[0].name.text,
  objectDate: object.record?.productionDates[0].date.text || '(Maker unknown)',
  medium: object.record?.objectType,
  primaryImageSmall: object.meta.images._primary_thumbnail.replace(
    '!100,100',
    '!700,700'
  ),
});

export const filterExhibits = (exhibits, action) =>
  exhibits.filter((exhibit) => {
    if (
      exhibit.objectID === action.payload.object.objectID &&
      exhibit.collection === action.payload.object.collection
    ) {
      return false;
    }
    return true;
  });
