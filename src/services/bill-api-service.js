import config from '../config';

const BillApiService = {
    getOwnedBills(token) {
        return fetch(`${config.API_BASE_URL}/bill/owned`, {
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
    getSharedBills(token) {
        return fetch(`${config.API_BASE_URL}/bill/shared`, {
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
    }
};

export default BillApiService;