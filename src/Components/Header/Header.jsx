import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeConstext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

import './header.scss';

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    // TODO list of links
    <nav className="nav">
      <div className="logo">DELAMODE</div>
      <div className="links">
        {/* <a href="">Svarbūs</a>
        <a href="">Partneriai</a>
        <a href="">Sandelis</a>
        <a href="">SOP</a>
        <a href="">Kita</a> */}
        <button className="theme-button" onClick={() => toggleTheme()}>
          {theme === 'light-theme' ? (
            <FontAwesomeIcon icon={faCircleHalfStroke} />
          ) : (
            <FontAwesomeIcon icon={faCircleHalfStroke} />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Header;
