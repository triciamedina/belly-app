const ValidationService = {
    validateLoginUsername(username) {
        if (username.trim().length === 0) {
            return 'Username is required'
        }
    },
    validateLoginPassword(password) {
        if (password.trim().length === 0) {
            return 'Password is required'
        }
    },
    validateRegisterUsername(username) {
        if (username.trim().length < 2) {
            return 'Username must be at least 2 characters'
        }
    },
    validateRegisterPassword(password) {
        if (password.trim().length === 0) {
            return 'Password is required'
        }
        if (password.trim().length < 8 || password.trim().length > 36) {
            return 'Password must be between 8 and 36 characters'
        }
        if (!/\d/.test(password)) {
            return 'Password must contain at least one digit'
        }
    },
    validateRegisterPasswordMatch(password, confirmedPassword) {
        if (confirmedPassword.trim().length === 0) {
            return 'Confirmed password is required'
        }
        if (confirmedPassword.trim() !== password.trim()) {
            return 'Passwords must match'
        }
    },
}

export default ValidationService;