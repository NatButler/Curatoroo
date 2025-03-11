import metAgent from './metAgent';
import { metObjectMap, paginate } from '../utils/helpers';

export const searchCollection = async (q) => {
  const response = await metAgent.Search.query(q);
  return paginate(response.data.objectIDs, 10);
};

export const loadResults = async (ids) => {
  return Promise.allSettled(ids.map((id) => metAgent.Objects.details(id))).then(
    (response) => {
      const fulfilledResponses = response
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value.data);

      return {
        fulfilled: fulfilledResponses
          .filter((d) => d.isPublicDomain)
          .map((object) => metObjectMap(object)),
        rejectedCount: response.filter((r) => r.status === 'rejected').length,
        notPublicDomain: fulfilledResponses.filter((d) => !d.isPublicDomain),
      };
    }
  );
};

export const loadObject = async (id) => {
  return metAgent.Objects.details(id);
};
