import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectExhibition,
  setSelectedExhibitionId,
} from '../store/curateSlice';

function Exhibition() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const exhibition = useSelector(selectExhibition);

  useEffect(() => {
    dispatch(setSelectedExhibitionId(id));
  }, [dispatch, id]);

  return (
    <>
      {exhibition && (
        <div>
          <h3>{exhibition.title}</h3>
          <p>{exhibition.description}</p>
        </div>
      )}
    </>
  );
}

export default Exhibition;
