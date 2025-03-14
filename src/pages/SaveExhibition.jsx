import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addExhibition,
  editExhibition,
  selectExhibition,
  setSelectedExhibitionId,
} from '../store/curateSlice';
import './SaveExhibition.css';

const initFormState = {
  title: '',
  description: '',
};

function SaveExhibition() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const exhibition = useSelector(selectExhibition);
  const [formData, setFormData] = useState(
    exhibition
      ? { title: exhibition.title, description: exhibition.description }
      : initFormState
  );

  useEffect(() => {
    dispatch(setSelectedExhibitionId({ id, load: false }));
  }, [dispatch, id]);

  const handleInput = (ev) => {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (id) {
      dispatch(editExhibition(formData));
    } else {
      dispatch(addExhibition(formData));
    }
    navigate('/curate');
  };

  if (id && !exhibition) {
    return <p>Not found</p>;
  }

  return (
    <>
      <h2>Save exhibition</h2>
      <form onSubmit={handleSubmit} className="save-exhibition-form">
        <label htmlFor="title">
          Title:
          <br />
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInput}
            required
            placeholder="Enter an exhibition title"
            maxLength={50}
          />
        </label>
        <label htmlFor="description">
          Description:
          <br />
          <textarea
            name="description"
            id="description"
            onChange={handleInput}
            value={formData.description}
            placeholder="Enter an exhibition description"
            maxLength={250}
            rows={10}
          ></textarea>
        </label>
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default SaveExhibition;
