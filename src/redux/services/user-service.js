import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://learning.staging.aasatech.asia/api/v1/auth/";

const getUserBoard = ()=>{
    return axios.get(API_URL + 'validation', {headers: authHeader()});
};

export default getUserBoard;