import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from 'react-cookie';
import CryptoJS from "crypto-js";
function LogoutPage() {
  const navigate = useNavigate();
  const [token, removeToken] = useCookies();
  const URL = 'https://learning.staging.aasatech.asia/api/v1/auth/logout';
  const logout= async ()=>{
    var bytes = CryptoJS.AES.decrypt(token.token, 'token');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    await fetch(URL, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + decryptedData
      }
    });
    removeToken('token', '');
  }
  useEffect(()=>{
    logout();
    navigate('/home');
  });
}

export default LogoutPage;