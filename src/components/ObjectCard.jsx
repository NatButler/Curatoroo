function ObjectCard({ object }) {
  return (
    <div key={object.objectID}>
      <p>
        {object.title}, {object.artistDisplayName}
      </p>
      <p>{object.objectDate}</p>
      <p>{object.medium}</p>
      {object.primaryImageSmall ? (
        <img src={object.primaryImageSmall} />
      ) : (
        <p>No image available</p>
      )}
      <hr />
    </div>
  );
}

export default ObjectCard;
