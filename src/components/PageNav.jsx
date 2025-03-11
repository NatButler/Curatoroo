import './PageNav.css';

function PageNav({ prevHandler, nextHandler, currentPage, pages }) {
  return (
    <nav className="page-nav">
      <button type="button" onClick={prevHandler} disabled={currentPage === 1}>
        Prev
      </button>
      <button
        type="button"
        onClick={nextHandler}
        disabled={currentPage === pages}
      >
        Next
      </button>
    </nav>
  );
}

export default PageNav;
