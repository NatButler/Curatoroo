import ObjectCard from './ObjectCard';
import './MasonryResults.css';

function MasonryResults({ objects, handleOpenExhibitionModal }) {
  return (
    <section className="masonry switcher">
      <div className="flow">
        {objects
          ?.filter((object, i) => i % 5 === 0)
          .map((object) => (
            <ObjectCard key={object.objectID} object={object}>
              <button
                type="button"
                onClick={() => handleOpenExhibitionModal(object)}
                className="btn-action"
              >
                Add to exhibition
              </button>
            </ObjectCard>
          ))}
      </div>
      <div className="flow">
        {objects
          ?.filter((object, i) => i % 5 === 1)
          .map((object) => (
            <ObjectCard key={object.objectID} object={object}>
              <button
                type="button"
                onClick={() => handleOpenExhibitionModal(object)}
                className="btn-action"
              >
                Add to exhibition
              </button>
            </ObjectCard>
          ))}
      </div>
      <div className="flow">
        {objects
          ?.filter((object, i) => i % 5 === 2)
          .map((object) => (
            <ObjectCard key={object.objectID} object={object}>
              <button
                type="button"
                onClick={() => handleOpenExhibitionModal(object)}
                className="btn-action"
              >
                Add to exhibition
              </button>
            </ObjectCard>
          ))}
      </div>
      <div className="flow">
        {objects
          ?.filter((object, i) => i % 5 === 3)
          .map((object) => (
            <ObjectCard key={object.objectID} object={object}>
              <button
                type="button"
                onClick={() => handleOpenExhibitionModal(object)}
                className="btn-action"
              >
                Add to exhibition
              </button>
            </ObjectCard>
          ))}
      </div>
      <div className="flow">
        {objects
          ?.filter((object, i) => i % 5 === 4)
          .map((object) => (
            <ObjectCard key={object.objectID} object={object}>
              <button
                type="button"
                onClick={() => handleOpenExhibitionModal(object)}
                className="btn-action"
              >
                Add to exhibition
              </button>
            </ObjectCard>
          ))}
      </div>
    </section>
  );
}

export default MasonryResults;
