import { useSelector } from 'react-redux';
import Results from '../components/Results';

function Collection2() {
  const collection = useSelector((state) => state.va);

  return <Results collection={collection} />;
}

export default Collection2;
