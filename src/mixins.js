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
            //handleResponse(res);
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
    //const isApiUrl = url.startsWith(baseUrl);
    console.log('>>> isLoggedIn')
    console.log(isLoggedIn)
    //console.log('>>> isApiUrl')
    //console.log(isApiUrl)
    if (isLoggedIn) {
        const auth_token = { Authorization: `Bearer ${token}` }
        console.log(auth_token)
        return auth_token;
    } else {
        return {};
    }
}

// async function handleResponse(response) {
//     const isJson = response.headers?.get('content-type')?.includes('application/json');
//     const data = isJson ? await response.JSON : null;

//     console.log("response 확인");
//     console.log(response);

//     // check for error response
//     if (response.status != 200) {
//         const { user, logout } = useAuthStore();
//         if ([401, 403].includes(response.status) && user) {
//             // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
//             logout();
//         }

//         // get error message from body or default to response status
//         const error = (data && data.message) || response.status;
//         return Promise.reject(error);
//     }
//     return data;
// }