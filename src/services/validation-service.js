const ValidationService = {
    validateLoginUsername(email) {
        if (email.trim().length === 0) {
            return 'Username is required'
        }
    },
    validateLoginPassword(password) {
        if (password.trim().length === 0) {
            return 'Password is required'
        }
    },
}

export default ValidationService;