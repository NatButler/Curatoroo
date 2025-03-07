function PageNav({ prevHandler, nextHandler, currentPage, pages }) {
  return (
    <div>
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
    </div>
  );
}

export default PageNav;
