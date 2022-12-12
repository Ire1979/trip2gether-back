const { getAllUsers, createUser, editByUserId, deleteByUserId, getUserById, getByEmail, getUsersByTrip } = require('../../models/users.model');
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

    //Comprobar si el email está en la bbdd
    const [result] = await getByEmail(email);
    //Result puede ser un array con un único registro o unn array vacío.
    if (result.length === 0) {
        return res.json({ fatal: 'Error usuario y/o contraseña' });
    }
    //Recuperamos el usuario
    const user = result[0]
    //Comprobar si los password coinciden
    const isEqual = bcrypt.compareSync(password, user.password);
    if (!isEqual) {
        return res.json({ fatal: 'Error usuario y/o contraseña' });
    }
    res.json({
        success: 'Login correcto',
        token: createToken(user) //Entregamos token creado en utils.js al usuario cuando haga login
    });
});

//GET USERS BY TRIP
router.get('/trip/:tripId', async (req, res) => {
    try {
        const [users] = await getUsersByTrip(req.params.tripId);
        res.json(users);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});



module.exports = router;