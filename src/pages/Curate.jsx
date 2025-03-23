import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteExhibition,
  setSelectedExhibitionId,
} from '../store/curateSlice';
import EditIcon from '../assets/edit.svg?react';
import DeleteIcon from '../assets/delete.svg?react';
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
      <header className="exhibitions-header">
        <h2 className="mb-0 mt-0">Exhibitions</h2>
        <nav className="sub-nav">
          <Link to="/exhibitions/save-exhibition" className="create-exhibition">
            Create an exhibition
          </Link>
        </nav>
      </header>
      {!exhibitions.length && (
        <p className="instructions">Add an exhibition using the link above.</p>
      )}
      <ul className="exhibitions-list">
        {exhibitions.map((exhibition) => (
          <li key={exhibition.id}>
            <div className="exhibition-content">
              {exhibition.exhibits.length > 0 ? (
                <h4>
                  <Link to={`/exhibitions/${exhibition.id}`}>
                    {exhibition.title}{' '}
                    <span className="exhibit-count">
                      ({exhibition.exhibits.length} exhibits)
                    </span>
                  </Link>
                </h4>
              ) : (
                <h4>
                  {exhibition.title}{' '}
                  <span className="exhibit-count">
                    ({exhibition.exhibits.length} exhibits)
                  </span>
                </h4>
              )}
              <p className="mb-15">{exhibition.description}</p>
              {exhibition.exhibits.length === 0 && (
                <p className="info mb-0">
                  Add to your exhibition by navigating to the{' '}
                  <Link to="/explore">Explore & curate</Link> page
                </p>
              )}
            </div>
            <div className="actions">
              <Link
                to={`/exhibitions/save-exhibition/${exhibition.id}`}
                onClick={() => handleSelectExhibition(exhibition.id)}
                className="edit-link"
                title="Edit exhibition details"
                aria-label="Edit exhibition details"
              >
                <EditIcon />
              </Link>
              <button
                type="button"
                onClick={() => handleDeleteExhibition(exhibition.id)}
                className="delete-button"
                title="Delete exhibition"
                aria-label="Delete exhibition"
              >
                <DeleteIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Curate;
