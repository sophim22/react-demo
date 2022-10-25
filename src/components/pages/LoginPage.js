import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import CryptoJs from 'crypto-js';
function LoginPage() {
  const [userLogin, setUser] = useState({ login: '', password: '' });
  const [cookies, setCookie] = useCookies(['token']);
  const [isInValid, setInValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const URL = 'https://learning.staging.aasatech.asia/api/v1/auth/session';
  const invalidClass = 'w-full h-12 border border-red-500 rounded-lg px-4 text-lg focus:ring-sky-600 mb-4 mt-2';
  const normalClass = 'w-full h-12 border border-gray-300 rounded-lg px-4 text-lg focus:outline-sky-600 mb-4 mt-2';
  const onHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prev) => {
      return { ...prev, [name]: value };
    })
  };
  const validate = (values) => {
    let errors = {};
    if (!values.login) {
      errors.login = 'email or username is required!';
    }
    if (!values.password) {
      errors.password = 'password is required!';
    }
    return errors;
  }
  const onLogin = async () => {
    setFormErrors(validate(userLogin));

    if (Object.keys(validate(userLogin)).length === 0) {
      let result = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(userLogin),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      result = await result.json();
      if (result.success === false) {
        setInValid(true);
        setMessage(result.message[0])
      } else {
        const encrypted = CryptoJs.AES.encrypt(JSON.stringify(result.token), 'token').toString();
        setCookie('token', encrypted);
        navigate('/user');
      }
    } else {
      setInValid(true)
    }
  };

  return (
    <div key={cookies} className="h-screen flex justify-center items-center">
      <div className="p-5 bg-white w-xl rounded-lg form">
        <div className="p-3 flex flex-col space-y-1">
          <h2 className="text-cyan-900 text-center mb-5 capitalize text-3xl font-bold">Login</h2>
          <div className="w-full mb-2">
            <label>Email or Username</label>
            <div className='flex justify-center'>
              <input
                name="login"
                type="text"
                className={isInValid ? invalidClass : normalClass}
                placeholder="Email or Username . . ."
                onChange={onHandleChange}
              />
            </div>
          </div>
          <small className='text-red-500'>{formErrors.login}</small>
          <div className="w-full mb-2">
            <label>Password</label>
            <div className='flex justify-center'>
              <input
                name="password"
                type="password"
                className={isInValid ? invalidClass : normalClass}
                placeholder="Password . . ."
                onChange={onHandleChange}
              />
            </div>
          </div>
          <small className='text-red-500'>{formErrors.password}</small>

          <p className='text-red-500 italic'>{message}</p>

          <div className="w-full flex justify-end">
            <button
              onClick={onLogin}
              className="hover:bg-sky-500 bg-sky-400 text-white font-bold cursor-pointer px-5 rounded py-2">
              Login
            </button>
          </div>
          <div className="w-full mt-2 flex flex-wrap justify-center">
            <h3 className="text-blue-500">Don't have account?</h3>
            <Link to={`/register`}
              className="ml-2 text-blue-500 font-bold underline cursor-pointer">
              Regester
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;