import React from 'react'
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';

const Header = () => {

  return (
    <div className='header bg-light'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
        <Link to="/" className="logo">
          <h1 className="navbar-brand text-uppercase p-0 m-0" onClick={() => window.scrollTo({ top: 0 })}>V-Network</h1>
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <Search />
        <Menu />
      </nav>
    </div>
  )
}

export default Header;