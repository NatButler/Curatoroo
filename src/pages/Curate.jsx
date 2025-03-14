import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteExhibition } from '../store/curateSlice';
import './Curate.css';

function Curate() {
  const dispatch = useDispatch();
  const { exhibitions } = useSelector((state) => state.curate);

  const handleDeleteExhibition = (exhibitionId) => {
    dispatch(deleteExhibition(exhibitionId));
  };

  return (
    <>
      <nav className="sub-nav">
        <Link to="/curate/save-exhibition" className="create-exhibition">
          Create a new exhibition
        </Link>
      </nav>
      <h3>Exhibitions</h3>
      <ul className="exhibitions-list">
        {exhibitions.map((exhibition) => (
          <li key={exhibition.id}>
            <Link to={`/curate/${exhibition.id}`}>
              <h4>
                {exhibition.title}{' '}
                <span className="exhibit-count">
                  ({exhibition.exhibits.length} exhibits)
                </span>
              </h4>
            </Link>
            <p>{exhibition.description}</p>
            <div className="actions">
              <Link to={`/curate/save-exhibition/${exhibition.id}`}>
                Edit details
              </Link>
              <button
                type="button"
                onClick={() => handleDeleteExhibition(exhibition.id)}
              >
                Delete exhibition
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Curate;
