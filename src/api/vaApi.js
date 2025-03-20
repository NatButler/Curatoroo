import { vaRecordObjectMap } from '../utils/helpers';
import vaAgent from './vaAgent';

export const searchCollection = async (q, page, maker) => {
  const response = await vaAgent.Search.query(q, page, maker);
  return response;
};

export const loadResults = async (ids) => {
  return Promise.allSettled(ids.map((id) => vaAgent.Objects.details(id))).then(
    (response) => {
      const fulfilledResponses = response
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value);

      return {
        fulfilled: fulfilledResponses.map((object) =>
          vaRecordObjectMap(object)
        ),
        rejectedCount: response.filter((r) => r.status === 'rejected').length,
        notPublicDomain: [],
      };
    }
  );
};

export const loadObject = async (id) => {
  const response = await vaAgent.Objects.details(id);
  return response;
};
