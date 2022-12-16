const { getAll, create, editById, deleteById, getTripById, getTripsByDestination, getTripsCreatedByUser, createComment, getCommentsByTrips, getTripsSuscribedByUser, getAllDestinations } = require('../../models/trips.model');

const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const fs = require('fs');
const { checkToken } = require('../../helpers/middlewares');

/////////PETICIONES BÁSICAS/////////

//GET ALL TRIPS
router.get('/', async (req, res) => {
    const [trip] = await getAll();
    res.json(trip);
});

//GET ALL DESTINATIONS
router.get('/destination', async (req, res) => {
    try {
        const [destination] = await getAllDestinations(req.params.destination);
        const destinations = destination.map(destination => destination.name)
        res.json(destinations);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

//POST TRIP
router.post('/', checkToken, upload.single('img_trip'), async (req, res) => {

    // Antes de guardar el trip en la base de datos, modificamos la imagen para situarla donde nos interesa.
    const extension = '.' + req.file.mimetype.split('/')[1];
    // Obtenemos el nombre de la nueva imagen.
    const newImgName = req.file.filename + extension;
    // Obtenemos la ruta donde estará, adjuntándole la extensión.
    const newImgPath = req.file.path + extension;
    // Movemos la imagen para que reciba la extensión.
    fs.renameSync(req.file.path, newImgPath);
    //Modificamos el BODY para incluir en nombre de la img en la BBDD.
    req.body.img_trip = newImgName;

    req.body.user_id = req.user.id;

    console.log(req.file, req.body);

    try {
        const [result] = await create(req.body);
        res.json(result)
    } catch (error) {
        console.log(error);
        res.json({ fatal: error.message });
    }
});

router.put('/:tripId', async (req, res) => {
    const { tripId } = req.params;
    try {
        const [result] = await editById(tripId, req.body);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.delete('/:tripId', async (req, res) => {
    const { tripId } = req.params;
    try {
        const [result] = await deleteById(tripId);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

/////////PETICIONES AVANZADAS/////////

//GET TRIP BY ID
router.get('/:tripId', async (req, res) => {
    const { tripId } = req.params;
    const [trip] = await getTripById(tripId);
    res.json(trip[0]);
});

//GET TRIPS BY DESTINATION
router.get('/destination/:location', async (req, res) => {
    try {
        const [trips] = await getTripsByDestination(req.params.location);
        res.json(trips);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

//GET TRIPS CREATED BY USER LOGGED
router.get('/user/created', checkToken, async (req, res) => {
    try {
        const [trips] = await getTripsCreatedByUser(req.user.id);
        res.json(trips);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

//GET TRIPS SUSCRIBED BY USER LOGGED
router.get('/user/suscribed', checkToken, async (req, res) => {
    try {
        const [trips] = await getTripsSuscribedByUser(req.user.id);
        res.json(trips);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

//GET TRIPS BY USER
router.get('/user/:userId', async (req, res) => {
    try {
        const [trips] = await getTripsCreatedByUser(req.params.userId);
        res.json(trips);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// //FILTER BY DESTINATION
// router.get('/destination/filter/:destination', async (req, res) => {
//     try {
//         const [destination] = await filterByDestination(req.params.destination);
//         const destinations = destination.filter(destination => destination.name)
//         res.json(destinations);
//     } catch (error) {
//         res.json({ fatal: error.message });
//     }
// });


//POST COMMENT
router.post('/comment/new', checkToken, async (req, res) => {

    try {
        const [response] = await createComment(req.body.message, req.body.trip_id, req.user.id);
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }

});

//GET COMMENTS BY TRIPS
router.get('/comment/:tripId', async (req, res) => {
    try {
        const { tripId } = req.params

        const [response] = await getCommentsByTrips(tripId)
        res.json(response)
    } catch (error) {
        console.log(error)
    }
});




module.exports = router;