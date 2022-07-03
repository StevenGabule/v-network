import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../redux/actions/authAction';
import { GLOBAL_TYPES } from '../redux/actions/globalTypes';

const Header = () => {

  const navLinks = [
    {label: 'Home', icon: 'home', path: "/"},
    {label: 'Message', icon: 'near_me', path: "/message"},
    {label: 'Discover', icon: 'explore', path: "/discover" },
    {label: 'Notify', icon: 'favorite', path: "/notify" },
  ];

  const {auth, theme} = useSelector((state) => state)
  const dispatch = useDispatch();
  const { pathname } = useLocation()

  const isActive = (pn) => (pn === pathname) ? 'active' : ''

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
      <Link to="/">
        <h1 className="navbar-brand text-uppercase">V-Network</h1>
      </Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="menu" id="navbarSupportedContent">
        <ul className="navbar-nav flex-row">
          {navLinks.map((link, idx) => (
            <li className={`nav-item px-2 ${isActive(link.path)}`} key={idx}>
              <Link className="nav-link" to={link.path}><span className='material-icons'>{link.icon}</span> <span className="sr-only">(current)</span></Link>
            </li>
          ))}
       
          <li className="nav-item dropdown">
            <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
              <img src={auth.user.avatar} alt='avatar' className='avatar' style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}` }} />
              {/*{auth.user.fullname}*/}
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>
              <label
                className="dropdown-item"
                htmlFor='theme'
                onClick={() => dispatch({ type: GLOBAL_TYPES.THEME, payload: !theme })}
              >
                {theme ? 'Light' : "Dark"} Mode
              </label>
              <Link className="dropdown-item" to="/" onClick={() => dispatch(logout())}>
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header;