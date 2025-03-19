import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteExhibition,
  setSelectedExhibitionId,
} from '../store/curateSlice';
import './Curate.css';

function Curate() {
  const dispatch = useDispatch();
  const { exhibitions } = useSelector((state) => state.curate);

  const handleSelectExhibition = (id) => {
    dispatch(setSelectedExhibitionId({ id, load: false }));
  };

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
            {exhibition.exhibits.length > 0 ? (
              <Link to={`/curate/${exhibition.id}`}>
                <h4>
                  {exhibition.title}{' '}
                  <span className="exhibit-count">
                    ({exhibition.exhibits.length} exhibits)
                  </span>
                </h4>
              </Link>
            ) : (
              <h4>
                {exhibition.title}{' '}
                <span className="exhibit-count">
                  ({exhibition.exhibits.length} exhibits)
                </span>
              </h4>
            )}
            <p>{exhibition.description}</p>
            {exhibition.exhibits.length === 0 && (
              <p className="warning">
                Add to your exhibition by navigating to the{' '}
                <Link to="/explore">Explore & curate</Link> page
              </p>
            )}
            <div className="actions">
              <Link
                to={`/curate/save-exhibition/${exhibition.id}`}
                onClick={() => handleSelectExhibition(exhibition.id)}
              >
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
