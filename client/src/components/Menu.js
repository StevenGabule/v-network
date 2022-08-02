import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom";
import { logout } from "../redux/actions/authAction";
import { GLOBAL_TYPES } from "../redux/actions/globalTypes"
import NotifyModal from "./NotifyModal";

const Menu = () => {
  const dispatch = useDispatch();
  const { auth, theme, notify } = useSelector(state => state)
  const { pathname } = useLocation()

  const navLinks = [
    { label: 'Home', icon: 'home', path: "/" },
    { label: 'Message', icon: 'near_me', path: "/message" },
    { label: 'Discover', icon: 'explore', path: "/discover" },
  ];

  const isActive = (pn) => (pn === pathname) ? 'active' : ''

  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        {navLinks.map((link, idx) => (
          <li className={`nav-item px-2 ${isActive(link.path)}`} key={idx}>
            <Link className="nav-link" to={link.path}>
              <span className='material-icons'>{link.icon}</span> 
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown" style={{opacity: 1}}>
          <span 
            className="nav-link positive-relative" 
            id="navbarDropdown" 
            role="button" 
            data-toggle="dropdown" 
            aria-haspopup="true"
            aria-expanded="false">
            <span className='material-icons' style={{color: notify.data.length > 0 ? 'crimson' : ''}}>favorite</span> 
            <span className="notify_length">{notify.data.length}</span>
          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <NotifyModal />
          </div>
        </li>

        <li className="nav-item dropdown" style={{opacity: 1}}>
          <span className="nav-link position-relative" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
            <img src={auth.user.avatar} alt='avatar' className='medium-avatar' style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}` }} />
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
  )
}

export default Menu;