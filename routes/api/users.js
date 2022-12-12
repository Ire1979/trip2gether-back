const { getAllUsers, createUser, editByUserId, deleteByUserId, getUserById } = require('../../models/users.model');
const { createToken } = require('../../helpers/utils');


const bcrypt = require('bcryptjs');
const router = require('express').Router();

/////////PETICIONES BÁSICAS/////////

router.get('/', async (req, res) => {
    const [user] = await getAllUsers();
    res.json(user);
});

router.post('/', async (req, res) => {
    try {
        const [result] = await createUser(req.body);
        res.json(result)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const [result] = await editByUserId(userId, req.body);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const [result] = await deleteByUserId(userId);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

/////////PETICIONES AVANZADAS/////////

//GET USER BY ID
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const [user] = await getUserById(userId);
    res.json(user);

})

//GET USERS BY TRIP
//SELECT * FROM trip2gether.users_has_trips WHERE trips_id = 5

//REGISTER
router.post('/register', async (req, res) => {
    try {

        // Encriptar password
        req.body.password = bcrypt.hashSync(req.body.password, 8);

        const [result] = await createUser(req.body);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el email está en la BBDD
    const [result] = await getByEmail(email);
    if (result.length === 0) {
        return res.json({ fatal: 'Error usuario y/o contraseña' });
    }

    // Recuperar el usuario
    const usuario = result[0];

    // Comprobar si los password coinciden
    const iguales = bcrypt.compareSync(password, usuario.password);
    if (!iguales) {
        return res.json({ fatal: 'Error usuario y/o contraseña' });
    }
    res.json({
        success: 'Login correcto',
        token: createToken(usuario)
    });
});



module.exports = router;