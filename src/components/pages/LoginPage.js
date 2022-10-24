import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import  CryptoJs from 'crypto-js';
function LoginPage() {
  const [userLogin, setUser] = useState({login: '', password: ''});
  const [cookies,setCookie] = useCookies(['token']);
  const [isInValid, setInValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const URL = 'https://learning.staging.aasatech.asia/api/v1/auth/session';
  const invalidClass = 'w-full px-4 py-2 border border-red-500 rounded outline-none';
  const normalClass = 'shadow-sm appearance-none border  rounded w-full px-2 p-2 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline';
  const onHandleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setUser((prev)=>{
      return {...prev, [name]: value};
    })
  };
  const validate = (values)=>{
    let errors = {};
    if (!values.login){
      errors.login = 'email or username is required!';
    }
    if (!values.password){
      errors.password = 'password is required!';
    }
    return errors;
  }
  const onLogin= async ()=>{
    setFormErrors(validate(userLogin));

    if (Object.keys(validate(userLogin)).length ===0){
      let result = await fetch(URL,{
        method: 'POST',
        body: JSON.stringify(userLogin),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      result = await result.json();
      if (result.success === false){
        setInValid(true);
        setMessage(result.message[0])
      }else{
        const encrypted = CryptoJs.AES.encrypt(JSON.stringify(result.token), 'token').toString();
        setCookie('token',encrypted);
        navigate('/user');
      }
    }else{
      setInValid(true)
    }
  };

  return (
    <div key={cookies} className="flex justify-center items-center w-full h-screen">
      <div className="shadow-lg bg-white p-7 rounded w-1/3 m-auto">
        <h2 className="text-cyan-900 text-center mb-5 capitalize text-3xl font-bold">Login</h2>
        <div className="w-full">
          <div className="w-full mb-1">
            <label>Email or Username</label>
            <input
              name="login"
              type="text"
              className={isInValid ? invalidClass : normalClass}
              placeholder="Email or Username . . ."
              onChange={onHandleChange}
            />
          </div>
          <small className='text-red-500'>{formErrors.login}</small>
          <div className="w-full mt-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className={isInValid ? invalidClass : normalClass}
              placeholder="Password . . ."
              onChange={onHandleChange}
            />
          </div>
          <small className='text-red-500'>{formErrors.password}</small>
          <div>
            <p className='text-red-500 italic mt-2'>{message}</p>
          </div>
          <div className="w-full flex justify-end mt-3">

            <button
              onClick={onLogin}
              className="hover:bg-sky-500 bg-sky-400 text-white font-bold cursor-pointer px-6 rounded py-1">
              Login
            </button>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <h3 className="text-blue-500">Don't have account?</h3>
          <Link to={`/register`}
            className="ml-2 text-blue-500 font-bold underline cursor-pointer">
            Regester
          </Link>
        </div>

      </div>
    </div>
  )
}

export default LoginPage;