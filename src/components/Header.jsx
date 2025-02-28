import { NavLink, Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>
        <Link to="/">Curatoroo</Link>
      </h1>
      <nav>
        <ul>
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
