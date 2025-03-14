import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeObjectFromExhibition,
  selectExhibition,
  setSelectedExhibitionId,
} from '../store/curateSlice';
import ObjectCard from '../components/ObjectCard';
import statuses from '../constants/ajaxStatus';
import ExhibitionSlider from '../components/ExhibitionSlider';

function Exhibition() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const exhibition = useSelector(selectExhibition);
  const curate = useSelector((state) => state.curate);
  const [currentPos, setCurrentPos] = useState(0);

  useEffect(() => {
    dispatch(setSelectedExhibitionId({ id, load: true }));
  }, [dispatch, id]);

  const handleRemoveObjectFromExhibition = (object) => {
    dispatch(
      removeObjectFromExhibition({ exhibitionId: exhibition.id, object })
    );
  };

  const sliderHandler = (dir) => {
    if (dir === 'left' && currentPos > 0) {
      setCurrentPos(currentPos - 1);
    }
    if (
      dir === 'right' &&
      currentPos < curate.currentExhibitionObjects.length - 1
    ) {
      setCurrentPos(currentPos + 1);
    }
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
          <div className="layout-row">
            <div className="layout-column">
              <ObjectCard object={curate.currentExhibitionObjects[currentPos]}>
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveObjectFromExhibition(
                      curate.currentExhibitionObjects[currentPos]
                    )
                  }
                  className="btn-action"
                >
                  Remove from exhibition
                </button>
              </ObjectCard>
            </div>
            <div className="layout-column">
              <ExhibitionSlider handler={sliderHandler} currentPos={currentPos}>
                {curate.currentExhibitionObjects.length > 0 &&
                  curate.currentExhibitionObjects.map((object) => (
                    <li key={object.objectID}>
                      <img src={object.primaryImageSmall} alt="" />
                    </li>
                  ))}
              </ExhibitionSlider>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Exhibition;
