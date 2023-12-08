import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', isTrue: false, errorMsg: ''}

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  setCookie = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  onAuthentication = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const object = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(object),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.setCookie(data.jwt_token)
    } else {
      this.setState({isTrue: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, isTrue, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login_container">
        <form className="login_form" onSubmit={this.onAuthentication}>
          <img
            className="login_logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="input_container">
            <label className="label" htmlFor="Username">
              USERNAME
            </label>
            <input
              className="input"
              id="Username"
              type="text"
              value={username}
              onChange={this.onUsername}
              placeholder="Username"
            />
            <label className="label" htmlFor="Password">
              PASSWORD
            </label>
            <input
              className="input"
              id="Password"
              type="password"
              value={password}
              onChange={this.onPassword}
              placeholder="Password"
            />
          </div>
          <div>
            <button className="button" type="submit">
              Login
            </button>
            {isTrue && <p className="error_p">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginRoute
