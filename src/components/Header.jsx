import { NavLink, Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="mb-20">
        <Link to="/">Explore & curate app</Link>
      </h1>
      <nav>
        <ul className="reset">
          <li>
            <NavLink to="/explore">Explore & curate</NavLink>
          </li>
          <li>
            <NavLink to="/exhibitions">Exhibitions</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
