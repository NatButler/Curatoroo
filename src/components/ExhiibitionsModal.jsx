import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addObjectToExhibition,
  selectExhibitionsToAddObject,
} from '../store/curateSlice';
import Modal from './Modal';
import './ExhibitionsModal.css';

function ExhibitionsModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const exhibitions = useSelector(selectExhibitionsToAddObject);

  const handleAddToExhibition = (exhibitionId) => {
    dispatch(addObjectToExhibition(exhibitionId));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3>Select an exhibition to add to</h3>
      <ul className="reset modal-exhibition-list">
        {exhibitions.map((exhibition) => (
          <li key={exhibition.id}>
            <button
              type="button"
              onClick={() => handleAddToExhibition(exhibition.id)}
            >
              {exhibition.title}
            </button>
          </li>
        ))}
      </ul>
      <p className="info">
        If an exhibition isn't displayed above, it already contains the object
        you're adding.
      </p>
      <hr />
      <nav className="sub-nav">
        <Link to="/curate/save-exhibition" className="create-exhibition">
          Create a new exhibition
        </Link>
      </nav>
    </Modal>
  );
}

export default ExhibitionsModal;
