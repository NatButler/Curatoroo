import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addExhibition,
  editExhibition,
  selectExhibition,
  setSelectedExhibitionId,
} from '../store/curateSlice';

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
      <h3>Save exhibition</h3>
      <form onSubmit={handleSubmit} key={id}>
        <label htmlFor="title">
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInput}
            required
          />
        </label>
        <label htmlFor="description">
          <textarea
            name="description"
            id="description"
            onChange={handleInput}
            value={formData.description}
            required
          ></textarea>
        </label>
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default SaveExhibition;
