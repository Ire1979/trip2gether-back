const { getAll, create, editById, deleteById, getTripById, getTripsByDestination, getTripsCreatedByUser, createComment, getCommentsByTrips, getTripsSuscribedByUser, getAllDestinations, createItinerary, createRequest, getItineraryByTrip, getSubscribedByTrip, manageRequest, getGeometry, getUsersAccepted } = require('../../models/trips.model');

const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const fs = require('fs');
const { checkToken } = require('../../helpers/middlewares');

//////////////////GET//////////////////

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

//GET COMMENTS BY TRIP
router.get('/comment/:tripId', async (req, res) => {
    try {
        const { tripId } = req.params;
        const [response] = await getCommentsByTrips(tripId)
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

//GET ITINERARY BY TRIP
router.get('/itinerary/:tripId', async (req, res) => {
    try {
        const { tripId } = req.params;
        const [response] = await getItineraryByTrip(tripId)
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

//GET SUBSCRIBED BY TRIP
router.get('/subscribed/:tripId', async (req, res) => {
    try {
        const { tripId } = req.params;
        const [response] = await getSubscribedByTrip(tripId)
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})


// GET GEOMETRY
router.get('/geometry/:tripId', async (req, res) => {
    try {
        const { tripId } = req.params
        const [response] = await getGeometry(tripId)
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

//GET USERS ACEPTED
router.get('/suscribed/accepted/:tripId', async (req, res) => {
    try {
        const { tripId } = req.params;
        const [response] = await getUsersAccepted(tripId)
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})




//////////////////POST//////////////////

//POST NEW TRIP
router.post('/', checkToken, upload.single('img_trip'), async (req, res) => {

    // Antes de guardar el trip en la base de datos, modificamos la imagen para situarla donde nos interesa.
    const extension = '.' + req.file.mimetype.split('/')[1];
    // Obtenemos el nombre de la nueva imagen.
    const newImgName = req.file.filename + extension;
    // Obtenemos la ruta donde estará, adjuntándole la extensión.
    const newImgPath = req.file.path + extension;
    /// Movemos la imagen para que reciba la extensión.
    fs.renameSync(req.file.path, newImgPath);
    //Modificamos el BODY para incluir en nombre de la img en la BBDD.
    req.body.img_trip = newImgName;

    req.body.user_id = req.user.id;


    // console.log(req.file, req.body);
    console.log(req.body);
    try {
        const [result] = await create(req.body);
        res.json(result)
    } catch (error) {
        console.log(error);
        res.json({ fatal: error.message });
    }
});

//POST ITINERARY ON TRIPS
router.post('/itinerary', async (req, res) => {
    try {
        const [response] = await createItinerary(req.body.it_description, req.body.it_date_begin, req.body.it_date_end, req.body.trip_id);
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

//POST NEW COMMENT
router.post('/comment/new', checkToken, async (req, res) => {

    try {
        const [response] = await createComment(req.body.message, req.body.trip_id, req.user.id);
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

//POST REQUEST TO A TRIP
router.post('/request', checkToken, async (req, res) => {
    try {
        const [response] = await createRequest(req.user.id, req.body.trips_id, req.body.user_status)
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});


//////////////////PUT//////////////////

router.put('/:tripId', async (req, res) => {
    const { tripId } = req.params;
    try {
        const [result] = await editById(tripId, req.body);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

//MANAGE USER REQUEST 
router.put('/:tripId/:userId', async (req, res) => {
    const { tripId, userId } = req.params;
    try {
        const [result] = await manageRequest(tripId, userId, req.body);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

//////////////////DELETE//////////////////

router.delete('/:tripId', async (req, res) => {
    const { tripId } = req.params;
    try {
        const [result] = await deleteById(tripId);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});




module.exports = router;