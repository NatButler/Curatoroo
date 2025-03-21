import './ObjectCard.css';

function ObjectCard({ object, children, dark = false }) {
  return (
    <div className={dark ? 'object-card dark' : 'object-card'}>
      {object?.primaryImageSmall ? (
        <img
          src={object?.primaryImageSmall}
          alt={`Image of ${object?.title}`}
        />
      ) : (
        <p>No image available</p>
      )}
      <p>
        {object?.title} | {object?.artistDisplayName}
      </p>
      <p>{object?.objectDate}</p>
      <p>{object?.medium}</p>
      <div className="actions">{children}</div>
      <hr />
    </div>
  );
}

export default ObjectCard;
