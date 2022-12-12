const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const obj = {
        user_id: user.id,
        exp_at: dayjs().add(20, 'days').unix()
    }
    return jwt.sign(obj, '');
}

module.exports = {
    createToken
}