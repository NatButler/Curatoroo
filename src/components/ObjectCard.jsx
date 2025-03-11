import './ObjectCard.css';

function ObjectCard({ object, children }) {
  return (
    <div className="object-card">
      {object.primaryImageSmall ? (
        <img src={object.primaryImageSmall} />
      ) : (
        <p>No image available</p>
      )}
      <p>
        {object.title} | {object.artistDisplayName}
      </p>
      <p>{object.objectDate}</p>
      <p>{object.medium}</p>
      {children}
      <hr />
    </div>
  );
}

export default ObjectCard;
