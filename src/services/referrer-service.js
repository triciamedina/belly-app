import config from '../config';

const ReferrerService = {
    saveReferrerToken(referrer) {
        window.sessionStorage.setItem(config.REFERRER_KEY, referrer)
    },
    getReferrerToken() {
        return window.sessionStorage.getItem(config.REFERRER_KEY)
    },
    clearReferrerToken() {
        window.sessionStorage.removeItem(config.REFERRER_KEY)
    }
}

export default ReferrerService;