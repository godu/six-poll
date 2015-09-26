import { stringifyQuery } from 'history/lib/useQueries';

export default function stringifyLocation(location) {
  const query = stringifyQuery(location.query);

  return `${location.pathname}${query && `?${query}`}`;
}
