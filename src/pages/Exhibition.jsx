import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeObjectFromExhibition,
  selectExhibition,
  setSelectedExhibitionId,
} from '../store/curateSlice';
import ObjectCard from '../components/ObjectCard';
import statuses from '../constants/ajaxStatus';

function Exhibition() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const exhibition = useSelector(selectExhibition);
  const curate = useSelector((state) => state.curate);

  useEffect(() => {
    dispatch(setSelectedExhibitionId({ id, load: true }));
  }, [dispatch, id]);

  const handleRemoveObjectFromExhibition = (object) => {
    dispatch(
      removeObjectFromExhibition({ exhibitionId: exhibition.id, object })
    );
  };

  if (curate.status === statuses.LOADING) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {exhibition && (
        <div>
          <h3>{exhibition.title}</h3>
          <p>{exhibition.description}</p>
          <ul>
            {curate.currentExhibitionObjects.length > 0 &&
              curate.currentExhibitionObjects.map((object) => (
                <li key={object.objectID}>
                  <ObjectCard object={object}>
                    <button
                      type="button"
                      onClick={() => handleRemoveObjectFromExhibition(object)}
                      className="btn-action"
                    >
                      Remove from exhibition
                    </button>
                  </ObjectCard>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Exhibition;
