import './Loader.css';

function Loader({ msg = 'Loading..', darkTheme }) {
  return (
    <p className={darkTheme ? 'loader-text loader-text_dark' : 'loader-text'}>
      {msg}
      <span className="elipses">.</span>
    </p>
  );
}

export default Loader;
