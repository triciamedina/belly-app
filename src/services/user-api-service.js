import config from '../config';

const UserApiService = {
    getUser(token) {
        return fetch(`${config.API_BASE_URL}/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
};

export default UserApiService;