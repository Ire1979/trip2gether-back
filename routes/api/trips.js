const { getAll, create, editById, deleteById, getTripById, getTripsByDestination } = require('../../models/trips.model');

const router = require('express').Router();

/////////PETICIONES BÁSICAS/////////

router.get('/', async (req, res) => {
    const [trip] = await getAll();
    res.json(trip);
});

router.post('/', async (req, res) => {
    try {
        const [result] = await create(req.body);
        res.json(result)
    } catch (error) {
        res.json({ fatal: error.message })
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
    res.json(trip);
})

//GET TRIPS BY DESTINATION --NO FUNCIONA--
router.get('/:destination', async (req, res) => {
    try {
        const [trips] = await getAll();

        for (let destination of destinations) {
            const [destination] = await getTripsByDestination(trips.destination);
            trips.destination = destination;
        }
        res.json(trips);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});



module.exports = router;