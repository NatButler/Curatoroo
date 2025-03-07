import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Curate() {
  const { exhibitions } = useSelector((state) => state.curate);
  return (
    <>
      <h2>Curate</h2>
      <ul>
        {exhibitions.map((exhibition) => (
          <li key={exhibition.id}>
            <Link to={`/curate/${exhibition.id}`}>
              <h4>{exhibition.title}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Curate;
