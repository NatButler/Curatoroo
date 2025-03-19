import { useNavigate } from 'react-router-dom';
import './BackLink.css';

function BackLink() {
  const navigate = useNavigate();

  return (
    <button type="button" className="back-link" onClick={() => navigate(-1)}>
      Back
    </button>
  );
}

export default BackLink;
