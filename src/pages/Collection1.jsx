import { useSelector } from 'react-redux';
import Results from '../components/Results';

function Collection1() {
  const collection = useSelector((state) => state.met);

  return <Results collection={collection} />;
}

export default Collection1;
