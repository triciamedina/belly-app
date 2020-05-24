export default {
    TOKEN_KEY: 'belly-client-auth-token',
    REFERRER_KEY: 'belly-client-referrer-token',
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
    WEBSOCKET_BASE_URL: process.env.REACT_APP_WEBSOCKET_BASE_URL || 'ws://localhost:9000'
}