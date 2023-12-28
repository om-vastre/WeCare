import React, { useId, useState } from 'react'
import { verifyUser } from '../api-client/api-model';
import { useNavigate, useParams } from 'react-router-dom';
import AlertDialog from '../components/AlertDialog';
import Loader from '../components/Loader';
import { validateEmail, validatePassword } from '../api-client/validators';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userType } = useParams();
  const navigator = useNavigate();
  
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return
    }
    else {
      setErrors({})
      setLoading(true)
      verifyUser(email, password,userType).then((resp) => {
        if (resp!=='failed'&&resp) {
          setLoading(false);
          switch (userType) {
            case 'admin':
              navigator(`/admin-dashboard/${resp.id}`);
              break;
            case 'doctor':
              navigator(`/doctor-dashboard/${resp.id}`);
              break;
            case 'patient':
              navigator(`/patient-dashboard/${resp.id}`);
              break;
            default:
              break;
          }
        }
        else {
          setLoading(false);
          setAlert(true);
        }
      })
    }
  };

  return (
    <>
      <div className='body-container'><div className="side-navbar">
        <div className="logo">
          <img src="/img/logo.svg" alt="" />
        </div>
      </div>
        <div className="container">
          <div className="contex-container">
            <div className="info">
              <h1 className="com-name">WeCare</h1>
              <p>Choose your title to Login</p>
            </div>
            <div className="divider-v"></div>
            <div className="login-box">
              <form onSubmit={handleSubmit} >
                <div className="inputbox" >
                  <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                  <label>Email</label>
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="inputbox">
                  <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                  <label>Password</label>
                  {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="inputbox">
                  <input type="submit" value="Login" /></div>
              </form>
            </div>
          </div>
        </div>
        {alert && <AlertDialog title={'Invalid'} desc={'Invalid User Email Id or Password'} type={'error'} onClose={setAlert} />}
        {loading && <Loader />}
      </div>
    </>
  )
}
