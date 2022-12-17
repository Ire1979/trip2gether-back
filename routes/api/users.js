const { getAllUsers, createUser, editByUserId, deleteByUserId, getUserById, getByEmail, getUsersByTrip, editPhoto } = require('../../models/users.model');
const { createToken } = require('../../helpers/utils');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const fs = require('fs');
const { checkToken } = require('../../helpers/middlewares');
const router = require('express').Router();

/////////PETICIONES BÁSICAS/////////

router.get('/', async (req, res) => {
    const [user] = await getAllUsers();
    res.json(user);
});


router.get('/profile', checkToken, (req, res) => {
    res.json(req.user)
})


router.post('/', async (req, res) => {
    try {
        const [result] = await createUser(req.body);
        res.json(result)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});






router.put('/profile', checkToken, upload.single('img_user'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const extension = '.' + req.file.mimetype.split('/')[1];

    const newImgName = req.file.filename + extension;

    const newImgPath = req.file.path + extension;

    fs.renameSync(req.file.path, newImgPath);

    req.body.img_user = newImgName;

    try {
        const [result] = await editPhoto(req.user.id, req.body);
        res.json(result)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})









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

//REGISTER
router.post('/register', upload.single('img_user'), async (req, res) => {

    // Antes de guardar el user en la base de datos, modificamos la imagen para situarla donde nos interesa.
    const extension = '.' + req.file.mimetype.split('/')[1];
    // Obtenemos el nombre de la nueva imagen.
    const newImgName = req.file.filename + extension;
    // Obtenemos la ruta donde estará, adjuntándole la extensión.
    const newImgPath = req.file.path + extension;
    // Movemos la imagen para que reciba la extensión.
    fs.renameSync(req.file.path, newImgPath);
    //Modificamos el BODY para incluir en nombre de la img en la BBDD.
    req.body.img_user = newImgName;

    console.log(req.file, req.body);

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