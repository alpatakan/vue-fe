//import config from 'config';
import { authHeader } from './auth-header';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

	//return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
	return fetch(`http://18.188.73.107:7890/api/v1/users/auth`, requestOptions)
        .then(handleResponse)
        .then(user => {
			// login successful if there's a jwt token in the response
			console.log("USER: " + user);
            if (user.data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.data));
            } else {
				console.log("TOKEN empty!");
			}

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

	//return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
	return fetch(`http://18.188.73.107:7890/api/v1/users/register`, requestOptions).then(handleResponse).catch(error => {
		console.log(error);
	});
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

	//return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
	return fetch(`http://18.188.73.107:7890/api/v1/users`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

	return fetch(`http://18.188.73.107:7890/api/v1/users/${id}`, requestOptions).then(handleResponse);
    //return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
	};

	return fetch(`http://18.188.73.107:7890/api/v1/users/${user.id}`, requestOptions).then(handleResponse);
    //return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

	return fetch(`http://18.188.73.107:7890/api/v1/users/${id}`, requestOptions).then(handleResponse);
    //return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
		const data = text && JSON.parse(text);
		console.log(response);
        if (!response.ok) {
            if (response.status === 401) {
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