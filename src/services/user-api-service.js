import config from '../config';

const UserApiService = {
    postRegistration(newUser) {
        return fetch(`${config.API_BASE_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
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
    getRandomColor() {
        const colors = ['pink', 'light-blue', 'light-purple', 'orange', 'purple', 'blue'];
        const min = Math.ceil(0);
        const max = Math.floor(5);
        return colors[Math.floor(Math.random() * (max - min + 1)) + min];
    }
};

export default UserApiService;