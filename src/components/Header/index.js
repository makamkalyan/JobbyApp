import {Link, withRouter} from 'react-router-dom'

import {FiLogOut} from 'react-icons/fi'

import {AiFillHome} from 'react-icons/ai'

import {BsBriefcaseFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const Logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav_container">
      <img
        className="website_logo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <ul className="link_headingContainer">
        <li className="link_heading_li">
          <Link to="/">
            <p className="link_p">Home</p>
          </Link>
        </li>
        <li className="link_heading_li">
          <Link to="/jobs">
            <p className="link_p">Jobs</p>
          </Link>
        </li>
      </ul>
      <div className="logout_button_bg">
        <button className="" type="button" onClick={Logout}>
          Logout
        </button>
      </div>
      <div className="link_img_container">
        <Link to="/">
          <AiFillHome className="link_img" />
        </Link>
        <Link to="/jobs">
          <BsBriefcaseFill className="link_img" />
        </Link>
        <FiLogOut className="link_img" onClick={Logout} />
      </div>
    </nav>
  )
}

export default withRouter(Header)
