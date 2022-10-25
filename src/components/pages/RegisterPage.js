import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function RegisterPage() {
  const userForm = {
    name: '',
    username: '',
    email: '',
    phone: '',
    password: ''
  }
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState(userForm);
  const URL = 'https://learning.staging.aasatech.asia/api/v1/auth';
  const [formErrors, setFormErrors] = useState({});
  const onHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser((prev) => {
      return { ...prev, [name]: value };
    })
  }
  const validate = (values) => {
    const errors = {};
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const uernameRegex = /^[a-z_]+$/;
    if (!values.name) {
      errors.name = 'name is required!';
    } else if (values.name.length < 3) {
      errors.name = 'name should be at least 3 char!'
    }
    if (!values.username) {
      errors.username = 'username is requeired!';
    } else if (!uernameRegex.test(values.username)) {
      errors.username = 'only lowercase or "_" can be use!'
    }
    if (!values.phone) {
      errors.phone = 'phone is required!'
    }
    if (!values.email) {
      errors.email = 'email is required!';
    } else if (!regexEmail.test(values.email)) {
      errors.email = 'email is invalid!';
    }
    if (!values.password) {
      errors.password = 'password is required!';
    } else if (values.password.length < 6) {
      errors.password = 'password must be more or equal 6 characters.';
    }
    return errors;
  }
  
  const onHandleSubmit = async () => {
    setFormErrors(validate(newUser));
    if (Object.keys(validate(newUser)).length === 0){
      let result = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      result = await result.json();
      if (result.token !== undefined) {
        navigate('/login')
      }else{
        setFormErrors(result.errors);
      }
    }
  }
  return (
    <div className="flex justify-center items-center w-full mt-10 h-screen">
      <div className="shadow-lg bg-white p-7 flex justify-center items-center rounded w-98 m-auto">
        <div className="w-full">
        <h2 className="text-cyan-900 text-center mb-5 capitalize text-3xl font-bold">Register</h2>
          <div className="w-full mb-1">
            <p className='mt-3'>Name</p>
            <input
              name="name"
              type="text"
              className='w-full h-12 border border-gray-300 rounded-lg px-4 text-lg focus:outline-sky-600 mt-2 mb-2'
              placeholder="Name . . ."
              onChange={onHandleChange}
            />
          </div>
          <small className='text-red-500'>{formErrors.name}</small>
          <div className="w-full">
            <p className='mt-3'>Username</p>
            <input
              name="username"
              type="text"
              className='w-full h-12 border border-gray-300 rounded-lg px-4 text-lg focus:outline-sky-600 mt-2 mb-2'
              placeholder="Username . . ."
              onChange={onHandleChange}
            />
          </div>
          <small className='text-red-500'>{formErrors.username}</small>
          <div className="w-full">
            <p className='mt-3'>Phone</p>
            <input
              name="phone"
              type="text"
              className="w-full h-12 border border-gray-300 rounded-lg px-4 text-lg focus:outline-sky-600 mt-2 mb-2"
              placeholder="Phone . . ."
              onChange={onHandleChange}
            />
          </div>
          <small className='text-red-500'>{formErrors.phone}</small>
          <div className="w-full">
            <p className='mt-3'>Email</p>
            <input
              name="email"
              type="email"
              className='w-full h-12 border border-gray-300 rounded-lg px-4 text-lg focus:outline-sky-600 mt-2 mb-2'
              placeholder="Email . . ."
              onChange={onHandleChange}
            />
          </div>
          <small className='text-red-500'>{formErrors.email}</small>
          <div className="w-full">
            <p className='mt-3'>Password</p>
            <input
              name="password"
              type="password"
              placeholder="Password . . ."
              className='w-full h-12 border border-gray-300 rounded-lg px-4 text-lg focus:outline-sky-600 mt-2 mb-2'
              onChange={onHandleChange}
            />
          </div>
          <small className='text-red-500'>{formErrors.password}</small>
          <div className="w-full flex justify-end mt-5">
            <button
              onClick={onHandleSubmit}
              className="rounded font-bold cursor-pointer hover:bg-sky-500 bg-sky-400 text-white px-6 py-2">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default RegisterPage;

