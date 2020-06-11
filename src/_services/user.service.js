import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';
import { router } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
   
};

function login(email, password) {
    const dataPost = JSON.stringify({ email, password });
             
    axios.post('https://shara-api.herokuapp.com/api/v1/login', dataPost, {headers: {
                "Content-Type": "application/json",
          }})
        
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.data.data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.data.data.token));
            }
            router.push('/');
            return user;
        })
        .catch(
            error => {
                
               alert("Invalid Credentials!");

              location.reload(true);
            }
           );

        
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
   
    const dataPost = JSON.stringify(user);
             
    axios.post('https://shara-api.herokuapp.com/api/v1/register', dataPost, {headers: {
                "Content-Type": "application/json",
          }})
          .then(res => {
            // login successful if there's a jwt token in the response
            if (res.data) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(res.data.data.token));
            }

            router.push('/');
            return res;
        })
            .catch(
             error => {
               
                 alert("Regestration Failed!");
                 location.reload(true);
                }

            );
    
   
}



function getAll(){
   
    let user = JSON.parse(localStorage.getItem('user'));

             
   return axios.get('https://shara-api.herokuapp.com/api/v1/order', {headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user
  }}).then(handleResponse);
  
    
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/${id}`, requestOptions).then(handleResponse);
}



function handleResponse(response) {

    return response.data;
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 400) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
