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
