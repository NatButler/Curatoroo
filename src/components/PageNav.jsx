function PageNav({ prevHandler, nextHandler, currentPage, pageLength }) {
  return (
    <div>
      <button type="button" onClick={prevHandler} disabled={currentPage === 0}>
        Prev
      </button>
      <button
        type="button"
        onClick={nextHandler}
        disabled={currentPage === pageLength - 1}
      >
        Next
      </button>
    </div>
  );
}

export default PageNav;
