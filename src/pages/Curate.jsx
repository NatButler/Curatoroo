import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteExhibition } from '../store/curateSlice';

function Curate() {
  const dispatch = useDispatch();
  const { exhibitions } = useSelector((state) => state.curate);

  const handleDeleteExhibition = (exhibitionId) => {
    dispatch(deleteExhibition(exhibitionId));
  };

  return (
    <>
      <h2>Curate</h2>
      <Link to="/curate/save-exhibition">Add exhibition</Link>
      <ul>
        {exhibitions.map((exhibition) => (
          <li key={exhibition.id}>
            <Link to={`/curate/${exhibition.id}`}>
              <h4>{exhibition.title}</h4>
            </Link>
            <p>{exhibition.description}</p>
            <Link to={`/curate/save-exhibition/${exhibition.id}`}>Edit</Link>
            <button
              type="button"
              onClick={() => handleDeleteExhibition(exhibition.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Curate;
