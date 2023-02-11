import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router-dom'
import {FaFacebook, FaTwitter} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import './loginotp.css'

class LoginOTP extends Component {
  state = {
    otpNumber:'',
    otpNumber1:'',
    otpNumber2:'',
    otpNumber3:'',
    otpNumber4:'',
    otpNumber5:'',
    otpNumber6:'',
    errorMsg: '',
    showSubmitError: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', jwtToken, {expires: 30})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()

    // ---------------  6 input field otp data  -----------------
    // const {otpNumber1,otpNumber2,otpNumber3,otpNumber4,otpNumber5,otpNumber6} = this.state
    // const userDetails = {otpNumber1,otpNumber2,otpNumber3,otpNumber4,otpNumber5,otpNumber6}

    // ---------------  1 input field otp data  -----------------
    const {otpNumber} = this.state
    const userDetails = {otpNumber}

    
    // console.log(JSON.stringify(userDetails))

    const url = 'https://apis.ccbp.in/login'
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

  onChangeotpNumber = event => {
    this.setState({otpNumber: event.target.value})
  }

  onChangeotpNumber1 = event => {
    this.setState({otpNumber1: event.target.value})
  }

  onChangeotpNumber2 = event => {
    this.setState({otpNumber2: event.target.value})
  }

  onChangeotpNumber3 = event => {
    this.setState({otpNumber3: event.target.value})
  }

  onChangeotpNumber4 = event => {
    this.setState({otpNumber4: event.target.value})
  }

  onChangeotpNumber5 = event => {
    this.setState({otpNumber5: event.target.value})
  }

  onChangeotpNumber6 = event => {
    this.setState({otpNumber6: event.target.value})
  }
  
  // clickEvent = (first,last) => {
  //   if(first){
  //     document.getElementById(last).focus()
  //   }
  // }

  onClickResendOtp = () => {
    this.setState({otpNumber:'',showSubmitError:false})
    console.log("OTP Resended....")
  }

  render() {
    const {
        otpNumber,
        // otpNumber1,otpNumber2,otpNumber3,otpNumber4,otpNumber5,otpNumber6,
      errorMsg,
      showSubmitError,
    } = this.state

    // const showResend = otpNumber1 !== '' && otpNumber2 !== '' && otpNumber3 !== '' && otpNumber4 !== '' && otpNumber5 !== '' &&otpNumber6 !== '' 
    
    const showResend6 = otpNumber.length === 6

    console.log(showSubmitError)
    const jwtToken = Cookies.get("jwt_token")
    
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    console.log(errorMsg)
    return (
      <div className="login-otp-form-main-container">
        <div className="login-otp-form-container d-flex flex-column justify-content-center">
          <div className="login-otp-form mt-3">
            <h1 className="login-otp-form-title ">Enter 6 Digit OTP for Login</h1>
            <div className='edit-number-container'>
                <p className="login-otp-form-description text-secondary">
                    Code sent to 998888xxxxx
                </p>
                <Link to="/loginphone" className='edit-number'>Edit Number</Link>
            </div>
            <form className="form" onSubmit={this.submitForm}>
              
              <div className="login-otp-input-fields-container">
              <input
                  type="text"
                  placeholder="Enter OTP"
                  required
                  maxLength={6}
                  id="second"
                  className="digit-6-login-otp-input-field"
                  value={otpNumber}
                  onChange={this.onChangeotpNumber}
                />
              
                
                {/*

                -------------------  6 input fields  ----------------------

                <input
                  type="text"
                  id='first'
                  required
                  maxLength={1}
                  className="login-otp-input-field"
                  value={otpNumber1}
                  onChange={this.onChangeotpNumber1}
                  onKeyUp={this.clickEvent(this,'second')}
                />
                <input
                  type="text"
                //   placeholder="Enter OTP"
                  required
                  maxLength={1}
                  id="second"
                  className="login-otp-input-field"
                  value={otpNumber2}
                  onChange={this.onChangeotpNumber2}
                  onKeyUp={this.clickEvent(this,'third')}
                />
                <input
                  type="text"
                //   placeholder="Enter OTP"
                  id='third'
                  required
                  maxLength={1}
                  className="login-otp-input-field"
                  value={otpNumber3}
                  onChange={this.onChangeotpNumber3}
                  onKeyUp={this.clickEvent(this,'fourth')}
                />
                <input
                  type="text"
                //   placeholder="Enter OTP"
                  id='fourth'
                  required
                  maxLength={1}
                  className="login-otp-input-field"
                  value={otpNumber4}
                  onChange={this.onChangeotpNumber4}
                  onKeyUp={this.clickEvent(this,'fifth')}
                />
                <input
                  type="text"
                //   placeholder="Enter OTP"
                  id='fifth'
                  required
                  maxLength={1}
                  className="login-otp-input-field"
                  value={otpNumber5}
                  onChange={this.onChangeotpNumber5}
                  onKeyUp={this.clickEvent(this,'sixth')}
                />
                <input
                  type="text"
                //   placeholder="Enter OTP"
                  id='sixth'
                  required
                  maxLength={1}
                  className="login-otp-input-field"
                  value={otpNumber6}
                  onChange={this.onChangeotpNumber6}
                /> */}
              </div>
              {showSubmitError && <p className='otp-error'>Incorrect OTP, Please try again or Resend OTP</p>}
              {!showResend6 && <div className='login-otp-resend-container'>
                <p  className="login-otp-resend text-secondary">
                      Haven't recieved the OTP? 
                  </p>
                  <button type='button' className='otp-resend' onClick={this.onClickResendOtp}>Resend</button>
              </div>}
              <button type="submit" className={`otp-btn w-100 mt-4 mb-2 ${showResend6 && "login-otp-button"}`} >
                LOGIN
              </button>
              {showResend6 && <div className='login-otp-resend-container'>
                  <p  className="login-otp-resend text-secondary">
                        Haven't recieved the OTP? 
                    </p>
                    <button type='button' className='otp-resend' onClick={this.onClickResendOtp}>Resend</button>
                </div>}
            </form>
          </div>
          <div className="footer-container d-flex justify-content-center">
            <span className="sign-up-line">Signup with</span>
            <div className="signup-logos-container">
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

export default LoginOTP
