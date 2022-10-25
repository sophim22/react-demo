import axios from "axios";

const API_URL = "https://learning.staging.aasatech.asia/api/v1/auth";

const register = (name, username, email, phone, password)=>{
    return axios.post(API_URL, {
        name,
        username,
        email,
        phone,
        password,
    });
}


const login = (login, password)=>{
    return axios.post(API_URL+"session", {
        login,
        password,
    })
    .then((response)=>{
        if (response.data.token){
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    });
}

const logout =()=>{
    localStorage.removeItem('user');
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    login,
    logout,
};