import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../../index.css';
function Navigation() {
  const [isHomeActive, setHomeActive] = useState(false);
  const [isLoginActive, setLoginActive] = useState(false);
  const [isRegisterActive, setRegisterActive] = useState(false);
  const activeLink = 'underline decoration-2 underline-offset-4 hover:bg-slate-100 p-2 rounded';
  const normalLink = 'hover:bg-gray-100 rounded p-2 hover:underline decoration-2 hover:underline-offset-4';
  const onHomeClick = ()=>{
    setHomeActive(true);
    setLoginActive(false);
    setRegisterActive(false);
  }
  const onLoginClick = ()=>{
    setHomeActive(false);
    setLoginActive(true);
    setRegisterActive(false);
  }
  const onRegisterClick=()=>{
    setHomeActive(false);
    setLoginActive(false);
    setRegisterActive(true);
  }
  return (
    <div className="header fixed top-0 left-0 right-0 shadow-md p-3 bg-white flex justify-between z-8">
      <ul className='text-sky-500 text-lg'>
        <Link to={'/home'}>
          <li onClick={onHomeClick} className={isHomeActive ? activeLink : normalLink}>Home</li>
        </Link>
      </ul>
      <ul className="flex justify-center items-center text-sky-500 text-lg">
        <Link to={'/login'}>
          <li onClick={onLoginClick} className={isLoginActive ? activeLink : normalLink}>Login</li>
        </Link>
        <Link to={'/register'}>
          <li onClick={onRegisterClick} className={isRegisterActive ? activeLink : normalLink}>Register</li>
        </Link>

      </ul>
    </div>
  )
}

export default Navigation;