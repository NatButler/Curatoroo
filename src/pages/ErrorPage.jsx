function ErrorPage({ error }) {
  return (
    <>
      <h2>{error?.message}</h2>
      <p className="error">
        There was an error with an API request. Please try again shortly.
      </p>
    </>
  );
}

export default ErrorPage;
