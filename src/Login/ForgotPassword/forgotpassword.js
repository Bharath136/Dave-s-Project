import { Component } from 'react'
import Cookies from 'js-cookie'
import { Link, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FORGOTPASSWORD_API_URL } from '../Services'
import './forgotpassword.css'

class ForgotPassword extends Component {
  state = {
    email: '',
    errorMsg: '',
    showSubmitError: false,
  }

  
  onSubmitSuccess = jwtToken => {
    const { history } = this.props
    history.replace('/')
    Cookies.set('jwt_token', jwtToken, { expires: 30 })
  }

  onSubmitFailure = errorMsg => {
    this.setState({ showSubmitError: true, errorMsg })
  }

  //----------------  submitting data to api  --------------------
  submitForm = async event => {
    event.preventDefault()
    const { email } = this.state
    const userDetails = { email }
    console.log(userDetails)
    const url = FORGOTPASSWORD_API_URL
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeEmail = event => {
    this.setState({ email: event.target.value })
  }

  render() {
    const {
      email,
      // showSubmitError,
      // errorMsg,
    } = this.state

    // const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    // if (jwtToken !== undefined) {
    //   return <Navigate to="/signin" />
    // }

    return (
      <div className="forgot-passward-form-main-container">
        <div className="forgot-passward-form-container d-flex flex-column justify-content-center">

          <div className="forgot-passward-form mt-3">
            <h1 className="forgot-passward-form-heading">Forgot Password</h1>
            <p className="forgot-passward-form-description text-secondary">
              Enter your Email or Phone to Reset Password
            </p>
            <form className="form" onSubmit={this.submitForm}>

              <div className="forgot-passward-input-fields-container">
                <input
                  type="email"
                  placeholder="Email/phone no"
                  required
                  className="forgot-passward-input-field"
                  value={email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <button type="submit" className="forgot-password-login-button w-100" >
                SUBMIT
              </button>
              <div className='back-to-login-container'>
                <Link to="/register" className='back-to-login'>BACK TO LOGIN</Link>
              </div>

            </form>
          </div>

        </div>
      </div>
    )
  }
}

export default ForgotPassword
