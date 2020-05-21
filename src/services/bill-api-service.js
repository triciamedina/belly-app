import config from '../config';

const BillApiService = {
    getAllBills(token, dispatch) {
        const getOwnedBills = BillApiService.getOwnedBills(token);
        const getSharedBills = BillApiService.getSharedBills(token);

        Promise.all([getOwnedBills, getSharedBills])
            .then(values => {
                const { ownedByMe } = values[0];
                const { sharedWithMe } = values[1];

                dispatch({
                    type: 'updateBills',
                    setBills: { 
                        ownedByMe,
                        sharedWithMe
                    }
                });
            })
    },
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
    },
    postNewOwnedBill(token, newBill) {
        return fetch(`${config.API_BASE_URL}/bill/owned`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newBill),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    updateBill(token, type, billId, updatedBill) {
        return fetch(`${config.API_BASE_URL}/bill/${type}/${billId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedBill),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
};

export default BillApiService;