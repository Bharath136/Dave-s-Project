import { Component } from 'react'
import Cookies from 'js-cookie'
import { Link, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from "history";
import { FaGraduationCap, FaFacebook, FaTwitter } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { BsEyeSlash, BsEye } from 'react-icons/bs'
import { LOGIN_API_URL } from '../Services'
import './signin.css'

class SignIn extends Component {
  state = {
    password: '',
    email: '',
    errorMsg: '',
    agree: false,
    showSubmitError: false,
    showPassword: false,
  }

  //------------------  submit success routing to signin page  ---------------------

  onSubmitSuccess = jwtToken => {
    const history = createBrowserHistory()
    history.replace('/loginphone')
    Cookies.set('jwt_token', jwtToken, { expires: 30 })
  }

  onSubmitFailure = errorMsg => {
    this.setState({ showSubmitError: true, errorMsg })
  }

    //------------------  submiting data to the api  ---------------------

  submitForm = async event => {
    event.preventDefault()
    const { password, email } = this.state
    const userDetails = { password, email }
    const url = LOGIN_API_URL
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error)
    }
  }

  onChangeUsername = event => {
    this.setState({ username: event.target.value })
  }

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value })
  }

  onChangePassword = event => {
    this.setState({ password: event.target.value })
  }

  onShowPassword = () => {
    this.setState(preState => ({ showPassword: !preState.showPassword }))
  }

  onCheck = (event) => {
    this.setState({ agree: event.target.checked })
  }

  render() {
    const {
      password,
      email,
      errorMsg,
      showSubmitError,
      showPassword,
    } = this.state

    console.log(showSubmitError)

    // const jwtToken = Cookies.get('jwt_token')
    // if (jwtToken !== undefined) {
    //   return <Navigate to="/loginphone" />
    // }
  
    console.log(errorMsg)

    return (
      <div className="login-form-main-container">
        <div className="login-form-container d-flex flex-column justify-content-center">
          <div className="login-form-title-container d-flex flex-row justify-content-center">
            <div className="logo-container">
              <FaGraduationCap className="logo-icon" />
            </div>
            <h1 className="login-form-title ">Learning</h1>
          </div>
          <div className="login-form mt-3">
            <h1 className="login-form-heading ">Welcome to Daway</h1>
            <p className="login-form-description text-secondary">
              Please sign in here
            </p>
            <form className="form" onSubmit={this.submitForm}>

              <div className="input-fields-container">

                <input
                  type="email"
                  placeholder="Email/phone no"
                  required
                  className="input-field"
                  value={email}
                  onChange={this.onChangeEmail}
                />

                <div className='sign-in-password-input-container'>
                  <input
                    type={showPassword ? 'text' : "password"}
                    placeholder="Password"
                    required
                    className="password-input-field"
                    value={password}
                    onChange={this.onChangePassword}
                  />

                  <button className='eye-button' type='button' onClick={this.onShowPassword}>
                    {showPassword ? <BsEyeSlash className='sign-in-eye-icon' /> :
                      <BsEye className='sign-in-eye-icon' />}
                  </button>
                </div>
              </div>

              <div className="agree-inputbox-container  mb-2">
                <div className='forgot-password-container d-flex flex-row align-items-center'>
                  <input type="checkbox" className="checkbox-input " id="agree" onChange={this.onCheck} />
                  <label htmlFor="agree" className="checkbox-name text-secondary">
                    Remember me
                  </label>
                </div>
                <Link to="/forgotpassword" className='forgot-password'>Forgot Password?</Link>
              </div>

              <button type="submit" className="sign-in-login-button w-100 " >
                LOGIN
              </button>
              {showSubmitError && <p className='error-message'>{errorMsg}</p>}

              <div className="member-of-community-container d-flex ">
                <span id="agree" className="sign-in-sign-up-line text-secondary">
                  New to the Community?
                  <Link to="/register" className="sign-in-sign-up-link">Create Account</Link>
                </span>
              </div>
            </form>
          </div>

          <div className="footer-container d-flex justify-content-center">
            <span className="sign-in-sign-up-line">Signup with</span>
            <div className="sign-in-signup-logos-container">
              <FaFacebook className="signup-logo facebook" />
              <FaTwitter className="signup-logo twitter" />
              <FcGoogle className="signup-logo google" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignIn
