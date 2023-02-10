
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './components/Login/login';
import SignIn from './components/SignIn/signin';
import LoginPhone from './components/LoginPhone/loginphone';
import LoginOTP from './components/LoginOTP/loginotp';
import ForgotPassword from './components/ForgotPassword/forgotpassword';

import './App.css';
import ResetPassword from './components/ResetPassword/resetpassword';

const  App = () => {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signin" element={<SignIn/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/loginphone' element={<LoginPhone />} />
            <Route path="resetpassword" element={<ResetPassword />} />
            <Route path='/loginotp' element={<LoginOTP />}/>
            
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
