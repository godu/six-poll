import { useQueries } from 'history';

export default function stringifyLocation(location) {
  const query = useQueries.stringifyQuery(location.query);

  return `${location.pathname}${query && `?${query}`}`;
}
