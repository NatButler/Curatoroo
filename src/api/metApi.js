import metAgent from './metAgent';
import { paginate } from '../utils/helpers';

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
        fulfilled: fulfilledResponses.filter((d) => d.isPublicDomain),
        rejectedCount: response.filter((r) => r.status === 'rejected').length,
        notPublicDomainCount: fulfilledResponses.filter(
          (d) => !d.isPublicDomain
        ).length,
      };
    }
  );
};
