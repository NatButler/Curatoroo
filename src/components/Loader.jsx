import './Loader.css';

function Loader({ msg = 'Loading...', darkTheme }) {
  return (
    <p className={darkTheme ? 'loader-text loader-text_dark' : 'loader-text'}>
      {msg}
    </p>
  );
}

export default Loader;
