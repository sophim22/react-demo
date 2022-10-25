import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE
} from "./action-types";

import AuthService from "../services/auth-service";

export const register = (name, username, email, phone, password)=> (dispath) =>{
    return AuthService.register(name, username, email, phone, password).then(
        (response)=>{
            dispath({
                type: REGISTER_SUCCESS
            });

            dispath({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error)=>{
            const message = 
            (
                error.response &&
                error.response.data && 
                error.response.data.message) || 
                error.message ||
                error.toString();
            dispath({
                type: REGISTER_FAIL,
            });

            dispath({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const login = (login, password) => (dispatch) =>{
    return AuthService.login(login,password).then(
        (data)=>{
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {user: data},
            });
            return Promise.resolve();
        },
        (error) => {
            const message = 
            (
                error.response && 
                error.response.data && 
                error.response.data.message
            )||
            error.message || error.toString();

            dispatch({
                type: LOGIN_FAIL,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const logout = (dispatch)=>{
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};