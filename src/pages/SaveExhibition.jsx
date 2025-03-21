import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addExhibition,
  editExhibition,
  selectExhibition,
} from '../store/curateSlice';
import ExhibitionForm from '../components/ExhibitionForm';
import BackLink from '../components/BackLink';
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
    id
      ? { title: exhibition.title, description: exhibition.description }
      : initFormState
  );

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
      navigate('/curate');
    } else {
      dispatch(addExhibition(formData));
      navigate(-1);
    }
  };

  if (id && !exhibition) {
    return <p>Not found</p>;
  }

  return (
    <>
      <BackLink />
      <h2 className="mt-0 mb-15">
        {id ? 'Save exhibition' : 'Add exhibition'}
      </h2>
      <ExhibitionForm
        formData={formData}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default SaveExhibition;
