import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="nav-header">
      <div>
        <Link to="/">
          <li>
            <img
              alt="website logo"
              className="header-website-logo"
              src="https://res.cloudinary.com/dxekjdhel/image/upload/v1677398141/Screenshot_2023-02-26_122633_ej00kn.png"
            />
          </li>
        </Link>
      </div>
      <div className="nav-menu">
        <div>
          <Link className="nav-link" to="/">
            <li className="home-heading">Home</li>
          </Link>
        </div>
        <div>
          <Link className="nav-link" to="/bookshelves">
            <li className="bookshelves-heading">Bookshelves</li>
          </Link>
        </div>
        <div>
          <button
            type="button"
            className="header-logout-button"
            onClick={onClickLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    </ul>
  )
}
export default withRouter(Header)
