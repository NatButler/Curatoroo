import { NavLink, Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1>
        <Link to="/">Curatoroo</Link>
      </h1>
      <nav>
        <ul className="reset">
          <li>
            <NavLink to="/explore">Explore</NavLink>
          </li>
          <li>
            <NavLink to="/curate">Curate</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
