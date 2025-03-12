import './PageNav.css';

function PageNav({
  prevHandler,
  nextHandler,
  startHandler,
  endHandler,
  currentPage,
  pages,
}) {
  return (
    <nav className="page-nav">
      <button type="button" onClick={startHandler} disabled={currentPage === 1}>
        Start
      </button>
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
      <button
        type="button"
        onClick={endHandler}
        disabled={currentPage === pages}
      >
        End
      </button>
    </nav>
  );
}

export default PageNav;
