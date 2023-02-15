import { Component } from 'react'
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from 'react-router-dom'
import './resetpassword.css'
import { RESETPASSWORD_API_URL } from '../Services'
import { BsEyeSlash, BsEye } from 'react-icons/bs'

class ResetPassword extends Component {
  state = {
    newPassword: '',
    confirmPassword: '',
    errorMsg: '',
    showConPassword: '',
    showNewPassword: '',
    showSubmitError: false,
  }


  onSubmitSuccess = () => {
    const { history } = this.props
    history.replace('/signin')
  }

  onSubmitFailure = errorMsg => {
    this.setState({ showSubmitError: true, errorMsg })
  }

  submitForm = async event => {
    event.preventDefault()
    const { newPassword, confirmPassword, email } = this.state
    const userDetails = { newPassword, confirmPassword, email }

    console.log(JSON.stringify(userDetails))

    const url = RESETPASSWORD_API_URL
    const options = {
      method: 'PUT',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error)
    }
  }

  onChangeNewPassword = (event) => {
    this.setState({ newPassword: event.target.value })
  }

  onChangeConfirmPassword = event => {
    this.setState({ confirmPassword: event.target.value })
  }

  onConEye = () => {
    this.setState(preState => ({ showConPassword: !preState.showConPassword }))
  }

  onNewEye = () => {
    this.setState(preState => ({ showNewPassword: !preState.showNewPassword }))
  }

  render() {
    const {
      newPassword,
      confirmPassword,
      errorMsg,
      showSubmitError,
      showConPassword,
      showNewPassword,
    } = this.state

    console.log(showSubmitError)

    // const jwtToken = Cookies.get('jwt_token')
    // if (jwtToken !== undefined) {
    //   return <Redirect to="/signin" />
    // }

    console.log(errorMsg)
    return (
      <div className="reset-password-form-main-container">
        <div className="reset-password-form-container d-flex flex-column justify-content-center">

          <div className="reset-password-form mt-3">
            <h1 className="reset-password-form-heading ">Reset Password</h1>
            <p className="reset-password-form-description text-secondary">
              Change your existing password with new password
            </p>
            <form className="form" onSubmit={this.submitForm}>

              <div className="password-input-fields-container">
                <div className='password-input-container'>
                  <input
                    type={showNewPassword ? 'text' : "password"}
                    placeholder="New Password"
                    required
                    className="password-input-field"
                    value={newPassword}
                    onChange={this.onChangeNewPassword}
                  />

                  <button className='eye-button' type='button' onClick={this.onNewEye}>
                    {showNewPassword ? <BsEyeSlash className='reset-password-eye-icon' /> :
                      <BsEye className='reset-password-eye-icon' />}
                  </button>
                </div>

                <div className='password-input-container'>
                  <input
                    type={showConPassword ? 'text' : "password"}
                    placeholder="confirm Password"
                    required
                    className="password-input-field"
                    value={confirmPassword}
                    onChange={this.onChangeConfirmPassword}
                  />
                  <button className='eye-button' type='button' onClick={this.onConEye}>
                    {showConPassword ? <BsEyeSlash className='reset-password-eye-icon' /> :
                      <BsEye className='reset-password-eye-icon' />}
                  </button>
                </div>
              </div>

              <button type="submit" className="reset-password-login-button w-100 " >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default ResetPassword
