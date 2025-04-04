import { Navigate } from 'react-router-dom';

function ExploreLandingPage({ searchResults }) {
  if (searchResults) {
    return <Navigate to="/explore/collection1" replace />;
  }

  return (
    <p className="instructions">
      Use the search field above to explore all collections and add items to
      exhibitions.
    </p>
  );
}

export default ExploreLandingPage;
