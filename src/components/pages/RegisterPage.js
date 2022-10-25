import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';
import { register } from "../../redux/actions/auth";
const uernameRegex = /^[a-z_]+$/;

const required = (value) => {
  if (!value) {
    return (
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">This field is required!</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
        </span>
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">The email is invalid!</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
        </span>
      </div>
    )
  }
};
const validUsername = (value) => {
  if (!uernameRegex.test(value.username)) {
    return (
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">Only lowercase or (_) can be use.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
        </span>
      </div>
    )
  }
};
const validName = (value) => {
  if (value.length < 3) {
    return (
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">Name must be more than 3 characters.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
        </span>
      </div>
    )
  }
};
const validPassword = (value) => {
  if (value.length < 6 || value.length >25) {
    return (
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">Password must be between 6 and 25 characters.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
        </span>
      </div>
    )
  }
};

const Register = () =>{
  const form = useRef();
  const checkBtn = useRef();
  const dispatch = useDispatch();
  const { message } = useSelector((state)=>state.message);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState(false);

  const onHandleChangeName = (e) =>{
    const name = e.target.value;
    setName(name);
  };
  const onHandleChangeUsername = (e)=>{
    const username = e.target.value;
    setUsername(username);
  };
  const onHandleChangeEmail = (e)=>{
    const email = e.target.value;
    setEmail(email);
  };
  const onHandleChangePhone = (e)=>{
    const phone = e.target.value;
    setPhone(phone);
  };
  const onHandleChangePassword = (e)=>{
    const password = e.target.value;
    setPassword(password);
  };

  const onHandleSubmit = (e)=>{
    e.preventDefault();
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.contex._errors.length === 0){
      dispatch(register(name, username, email, phone, password))
      .then(()=>{
        setSuccessful(true);
      })
      .catch(()=>{
        setSuccessful(false);
      });
    }
  };

  return (
    <div className="lg:grid-cols-4">
      <div className="form-container">
        <h1>Register</h1>

        <Form onSubmit={onHandleSubmit} ref={form}>
          {!successful && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                className="w-full bg-gray-200 outline-gray-200"
                value={name}
                onChange={onHandleChangeName}
                placeholder="Name..."
                validations={[required, validName]}
              />
            </div>
          )}

        </Form>
      </div>
    </div>
  )
}

export default Register;