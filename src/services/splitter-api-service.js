import config from '../config';

const SplitterApiService = {
    updateSplitter(token, splitterId, updatedSplitter) {
        return fetch(`${config.API_BASE_URL}/splitter/${splitterId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedSplitter),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postNewSplitter(token, newSplitter) {
        return fetch(`${config.API_BASE_URL}/splitter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newSplitter),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postNewSplit(token, splitterId, itemId, newSplit) {
        return fetch(`${config.API_BASE_URL}/splitter/${splitterId}/${itemId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newSplit),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    updateSplit(token, splitterId, itemId, updatedSplit) {
        return fetch(`${config.API_BASE_URL}/splitter/${splitterId}/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedSplit),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
};

export default SplitterApiService;