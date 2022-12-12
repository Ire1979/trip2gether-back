const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const { getById } = require('../models/users.model');

const checkToken = async (req, res, next) => {

    //1.- Comprobamos si el token viene incluido en las cabeceras
    if (!req.headers['authorization']) {
        return res.json({ fatal: 'El token no viene incluido en los headers' });
    }

    const token = req.headers['authorization'];

    //2.- Comprobamos si el token es correcto. Para eso debemos decodificarlo con la misma libreria.
    let obj;
    try {
        obj = jwt.verify(token, 'StringCodificationPass');
    } catch (error) {
        return res.json({ fatal: 'El token no es correcto' });
    }

    //3.- Comprobamos si el token está caducado. Comprobando la fecha de creación del token y la expiration date. Lo haremos con los valores de fecha de unix.
    if (dayjs().unix() > obj.expiration_at) {
        return res.json({ fatal: 'El token está caducado' });
    }

    //Recuperamos los datos del usuario de la bbdd
    const [user] = await getById(obj.user_id);
    req.user = user[0]

    next();
}

module.exports = {
    checkToken
}