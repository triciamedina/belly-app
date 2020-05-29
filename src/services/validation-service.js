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
    validateBillName(billname) {
        if (billname.trim().length === 0) {
            return 'Bill name is required'
        }
    },
    validateDiscounts(discounts) {
        if (!/^[0-9]{1,9}(?:\.[0-9]{1,2})?$/.test(discounts)) {
            return 'Discounts must be a valid dollar amount'
        }
        if (discounts.toString().trim().length === 0) {
            console.log(discounts)
            return 'Discounts is required'
        }
    },
    validateTax(tax) {
        if (!/^[0-9]{1,9}(?:\.[0-9]{1,2})?$/.test(tax)) {
            return 'Tax must be a valid dollar amount'
        }
        if (tax.toString().trim().length === 0) {
            console.log(tax)
            return 'Tax is required'
        }
    },
    validateTip(tip) {
        if (!/^[0-9]{1,9}(?:\.[0-9]{1,2})?$/.test(tip)) {
            return 'Tip must be a valid dollar amount'
        }
        if (tip.toString().trim().length === 0) {
            console.log(tip)
            return 'Tip is required'
        }
    },
    validateFees(fees) {
        if (!/^[0-9]{1,9}(?:\.[0-9]{1,2})?$/.test(fees)) {
            return 'Fees must be a valid dollar amount'
        }
        if (fees.toString().trim().length === 0) {
            console.log(fees)
            return 'Fees is required'
        }
    },
    validateItemName(itemname) {
        if (itemname.trim().length === 0) {
            return 'Item name is required'
        }
    },
    validateItemPrice(itemprice) {
        if (!/^[0-9]{1,9}(?:\.[0-9]{1,2})?$/.test(itemprice)) {
            return 'Price must be a valid dollar amount'
        }
        if (itemprice.toString().trim().length === 0) {
            console.log(itemprice)
            return 'Price is required'
        }
    },
}

export default ValidationService;