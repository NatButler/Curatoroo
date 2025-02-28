function PageNav({ prevHandler, nextHandler }) {
  return (
    <div>
      <button type="button" onClick={prevHandler}>
        Prev
      </button>
      <button type="button" onClick={nextHandler}>
        Next
      </button>
    </div>
  );
}

export default PageNav;
