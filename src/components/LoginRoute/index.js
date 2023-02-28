import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', error: '', isShowingError: false}

  submitOnSuccess = jwtToken => {
    console.log(jwtToken)
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  showOnFailure = error => {
    this.setState({isShowingError: true, error})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitOnSuccess(data.jwt_token)
    } else {
      this.showOnFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, error, isShowingError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-image-container">
          <img
            alt="website login"
            className="login-image"
            src="https://res.cloudinary.com/dxekjdhel/image/upload/v1677410333/Rectangle_1467_qfvvbi.png"
          />
        </div>

        <form onSubmit={this.onSubmitForm} className="form-container">
          <img
            className="logo"
            alt="login website logo"
            src="https://res.cloudinary.com/dxekjdhel/image/upload/v1677398141/Screenshot_2023-02-26_122633_ej00kn.png"
          />

          <div>
            <label htmlFor="username" className="label">
              Username*
            </label>
            <br />
            <input
              value={username}
              onChange={this.onChangeUsername}
              placeholder="Username"
              className="input-element-box"
              id="username"
              type="text"
            />
          </div>
          <br />
          <div>
            <label htmlFor="password" className="label">
              Password*
            </label>
            <br />
            <input
              value={password}
              onChange={this.onChangePassword}
              placeholder="Password"
              className="input-element-box"
              id="password"
              type="password"
            />
            {isShowingError ? <p className="error-msg"> {error}</p> : null}
          </div>

          <br />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginRoute
