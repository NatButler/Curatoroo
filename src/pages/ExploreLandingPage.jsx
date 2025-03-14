import { Navigate } from 'react-router-dom';

function ExploreLandingPage({ searchResults }) {
  if (searchResults) {
    return <Navigate to="/explore/collection1" replace />;
  }

  return <p>Use the search field above to explore all collections.</p>;
}

export default ExploreLandingPage;
