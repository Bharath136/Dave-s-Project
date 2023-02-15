
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './Login/Register/register';
import SignIn from './Login/SignIn/signin';
import LoginPhone from './Login/LoginPhone/loginphone';
import LoginOTP from './Login/LoginOTP/loginotp';
import ForgotPassword from './Login/ForgotPassword/forgotpassword';

import './App.css';
import ResetPassword from './Login/ResetPassword/resetpassword';

const  App = () => {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/signin" element={<SignIn/>}/>
            <Route exact path='/forgotpassword' element={<ForgotPassword />} />
            <Route exact path='/loginphone' element={<LoginPhone />} />
            <Route exact path="resetpassword" element={<ResetPassword />} />
            <Route exact path='/loginotp' element={<LoginOTP />}/>
            {/* <Route path='/' element={<Data/>}/> */}
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
