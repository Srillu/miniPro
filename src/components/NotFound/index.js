import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div>
      <img
        alt="not found"
        className="not-found-image"
        src="https://res.cloudinary.com/dxekjdhel/image/upload/v1677481241/Group_7484_oyanet.png"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found,Please go back
        to the homepage.
      </p>

      <div className="not-found-button-container">
        <Link to="/">
          <button type="button" className="not-found-button">
            Go Back to Home
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default NotFound
