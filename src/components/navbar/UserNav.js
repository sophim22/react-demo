import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import CryptoJS from 'crypto-js';
function UserNav() {
  const [user, setUser] = useState({});
  const [cookies] = useCookies();
  const URL = 'https://learning.staging.aasatech.asia/api/v1/auth/validation';
  const [isMore, setMore] = useState(false);
  const onClickMore = () => {
    setMore(!isMore);
  }
  const getUser = async () => {
    var bytes = CryptoJS.AES.decrypt(cookies.token, 'token');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    let result = await axios.get(URL, {
      headers: {
        Authorization: 'Bearer ' + decryptedData,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).catch((error) => { console.log(error) })
    setUser(result.data.data);
  }
  useEffect(() => {
    getUser();
  })
  return (
    <div>

      <div className="header fixed top-0 left-0 right-0 shadow-md p-5 bg-white z-8">
        <div className='flex justify-end'>
          <ul className='flex justify-center items-center text-sky-500'>
            <li className='mr-5'>Welcome</li>
            <li className='mr-5'>{user.name}</li>
            <li className='relative'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='w-4 fill-gray-400 cursor-pointer' onClick={onClickMore}><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg>
              {
                isMore && (
                  <div className='absolute right-0 bg-sky-500 border shadow-md rounded opacity-90 py-2'>
                    <ul className='text-white'>
                      <Link to={'/user/profile'}>
                        <li className='hover:bg-sky-300 px-4 flex items-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-5 mr-5 fill-white'><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM256 272c39.8 0 72-32.2 72-72s-32.2-72-72-72s-72 32.2-72 72s32.2 72 72 72z" /></svg>
                          Profile
                        </li>
                      </Link>
                      <Link to={'/user/logout'}>
                        <li className='hover:bg-sky-300 px-4 cursor:pointer flex items-center'>
                          <small>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='w-4 fill-white mr-5'><path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>
                          </small>
                          Logout
                        </li>
                      </Link>
                    </ul>
                  </div>
                )
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserNav;