import axios from "axios";
import { useAuthStore } from "./stores";

export const axiosWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
}

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method: method,
            headers: authHeader(),
            url: url
        };

        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.data = body;
        }
        console.log('>>> requestOptions')
        console.log(requestOptions)
        
        return axios(requestOptions)
        .then(res => {
            console.log(res.data);
            return res;
        })
        .catch(err => {
            console.log('axios 에러');
            console.log(err);
        });
    }
}

function authHeader() {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token || !!JSON.parse(user)?.token;
    const token = user.token === undefined ? JSON.parse(user).token : user.token;
    console.log('>>> isLoggedIn')
    console.log(isLoggedIn)
    if (isLoggedIn) {
        const auth_token = { Authorization: `Bearer ${token}` }
        console.log(auth_token)
        return auth_token;
    } else {
        return {};
    }
}