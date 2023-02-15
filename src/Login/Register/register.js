import { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { createBrowserHistory } from "history";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGraduationCap, FaFacebook, FaTwitter } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import './register.css'
import { BsEyeSlash, BsEye } from 'react-icons/bs'
import { SIGN_UP_API_URL } from '../Services'

class Register extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    errorMsg: '',
    role: [],
    agree: false,
    showPassword: '',
    showSubmitError: false,
  }


  onSubmitSuccess = () => {
    const history = createBrowserHistory()
    history.replace('/signin')
   
  }

  onSubmitFailure = errorMsg => {
    this.setState({ showSubmitError: true, errorMsg })
  }

  //------------------  submitting data to api  ---------------------

  submitForm = async event => {
    event.preventDefault()
    const { username, password, email, role, agree } = this.state
    const userDetails = { username, password, email, role, agree }
    
    const url = SIGN_UP_API_URL

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess()
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

  onRole = (event) => {
    this.setState({ developer: event.target.value })
    const { value, checked } = event.target
    if (checked) {
      this.setState(preState => ({ role: [...preState.role, value] }))
    }
  }

  onCheck = (event) => {
    this.setState({ agree: event.target.checked })
  }

  render() {
    const {
      username,
      password,
      email,
      errorMsg,
      showPassword,
      showSubmitError,
    } = this.state

    //------------------  If user already registered rendering to the login page  ---------------------

    // const jwtToken = Cookies.get('jwt_token')
    // if (jwtToken !== undefined) {
    //   return <Navigate to="/signin" />
    // }

    return (
      <div className="register-form-main-container">
        <div className="register-form-container d-flex flex-column justify-content-center">
          <div className="register-form-title-container d-flex flex-row justify-content-center">
            <div className="register-logo-container">
              <FaGraduationCap className="logo-icon" />
            </div>
            <h1 className="register-form-title ">Learning</h1>
          </div>
          <div className="register-form mt-3">
            <h1 className="register-form-heading ">Welcome to Daway</h1>
            <p className="register-form-description text-secondary">
              Create to Account to join the community
            </p>
            <form className="form" onSubmit={this.submitForm}>
              <div className="register-category-checkbox-container d-flex flex-row">
                <div className="register-checkbox-container">
                  <input
                    type="checkbox"
                    id="developer"
                    name="learning"
                    value="Developer"
                    className="register-checkbox-input"
                    onChange={this.onRole}
                  />
                  <label htmlFor="developer" className="register-checkbox-name">
                    Developer
                  </label>
                </div>

                <div className="register-checkbox-container">
                  <input
                    type="checkbox"
                    id="client"
                    name="learning"
                    value="Client"
                    className="register-checkbox-input"
                    onChange={this.onRole}
                  />
                  <label htmlFor="client" className="register-checkbox-name">
                    Client
                  </label>
                </div>

                <div className="register-checkbox-container ">
                  <input
                    type="checkbox"
                    id="vender"
                    value="Vender"
                    name="learning"
                    className="register-checkbox-input"
                    onChange={this.onRole}
                  />
                  <label htmlFor="vender" className="register-checkbox-name">
                    Vender
                  </label>
                </div>
              </div>

              <div className="register-input-fields-container">
                <input
                  type="text"
                  placeholder="User name"
                  required
                  className="register-input-field"
                  value={username}
                  onChange={this.onChangeUsername}
                />

                <input
                  type="email"
                  placeholder="Email/phone no"
                  required
                  className="register-input-field"
                  value={email}
                  onChange={this.onChangeEmail}
                />

                <div className='register-password-input-container'>
                  <input
                    type={showPassword ? 'text' : "password"}
                    placeholder="Password"
                    required
                    className="register-password-input-field"
                    value={password}
                    onChange={this.onChangePassword}
                  />

                  <button className='register-eye-button' type='button' onClick={this.onShowPassword}>
                    {showPassword ? <BsEyeSlash className='register-eye-icon' /> :
                      <BsEye className='register-eye-icon' />}
                  </button>
                  {showSubmitError && <p className='error-message'>{errorMsg}</p>}
                </div>
              </div>
              <div className="register-agree-inputbox-container d-flex flex-row justify-content-center align-items-center mb-2">
                <input type="checkbox" className="register-checkbox-input" id="agree" onChange={this.onCheck} />
                <label htmlFor="agree" className="register-checkbox-name text-secondary">
                  I Agree with Terms & Condition
                </label>
              </div>

              <button type="submit" className="register-login-button  w-100" >
                LOGIN
              </button>
              {showSubmitError && <p className='error-message'>{errorMsg}</p>}

              <div className="register-member-of-community-container d-flex ">
                <span id="agree" className="register-sign-in-line text-secondary">
                  Member of the Community?
                  <Link to="/signin" className="register-sign-in-link">Sign IN</Link>
                </span>
              </div>
            </form>
          </div>

          <div className="register-footer-container d-flex justify-content-center">
            <span className="register-sign-in-line">Signup with</span>
            <div className="register-signup-logos-container">
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

export default Register
