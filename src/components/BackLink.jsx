import { useNavigate } from 'react-router-dom';
import BackArrowIcon from '../assets/arrow_back.svg?react';
import './BackLink.css';

function BackLink() {
  const navigate = useNavigate();

  return (
    <button type="button" className="back-link" onClick={() => navigate(-1)}>
      <BackArrowIcon />
      Back
    </button>
  );
}

export default BackLink;
