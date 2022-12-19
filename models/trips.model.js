const { strToBool } = require("../helpers/utils");

const getAll = () => {
    return db.query('SELECT * FROM trip2gether.trips ORDER BY departure_date ASC');
}

const create = ({
    destination, min_traveler, max_traveler, min_age, max_age, departure_date, duration, price, description, img_trip, flights, hotel, meals, excursions, rent_car, insurance, lat, lng, user_id }) => {
    return db.query(
        'INSERT INTO trips (destination, min_traveler, max_traveler, min_age, max_age, departure_date, duration, price, description, img_trip, flights, hotel, meals, excursions, rent_car, insurance, lat, lng, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [destination, min_traveler, max_traveler, min_age, max_age, departure_date, duration, price, description, img_trip, strToBool(flights), strToBool(hotel), strToBool(meals), strToBool(excursions), strToBool(rent_car), strToBool(insurance), lat, lng, user_id]);
}

const editById = (tripId, { destination, min_traveler, max_traveler, min_age, max_age, departure_date, duration, price, description }) => {
    return db.query('UPDATE trips SET destination = ?, min_traveler = ?, max_traveler = ?, min_age = ?, max_age = ?, departure_date = ?, duration = ?, price = ?, description = ? WHERE id = ?', [destination, min_traveler, max_traveler, min_age, max_age, departure_date, duration, price, description, tripId]);
}

const deleteById = (tripId) => {
    return db.query('DELETE FROM trips WHERE id = ?', [tripId]);
}

const getTripById = (tripId) => {
    return db.query(`SELECT * FROM trips t
    LEFT JOIN users u ON t.user_id = u.id
    where t.id = ?`, [tripId]);
}

const getTripsByDestination = (destination) => {
    return db.query('SELECT * FROM trips WHERE destination = ?', [destination]);
}

const getAllDestinations = (destination) => {
    return db.query('SELECT destination AS name FROM trips', [destination]);
}

const getTripsSuscribedByUser = (userId) => {
    return db.query('SELECT t.* FROM users_has_trips ut JOIN trips t ON t.id = ut.trips_id WHERE ut.users_id = ?', [userId]);
}

const getTripsCreatedByUser = (userId) => {
    return db.query('SELECT * FROM trips WHERE user_id = ?', [userId]);
}

const createComment = (
    message, trip_id, user_id
) => {
    return db.query(
        'INSERT INTO comments (message, trip_id, user_id) VALUES (?,?,?)', [message, trip_id, user_id])
}

const createItinerary = (it_description, it_date_begin, it_date_end, trip_id) => {
    return db.query('INSERT INTO itinerary (it_description, it_date_begin, it_date_end, trip_id) VALUES (?, ?, ?, ?)', [it_description, it_date_begin, it_date_end, trip_id])
}

const getCommentsByTrips = (tripId) => {
    return db.query('SELECT * FROM comments c join users u on c.user_id = u.id WHERE trip_id = ?', [tripId])
}

const createRequest = (users_id, trips_id, user_status) => {
    return db.query('INSERT INTO users_has_trips (users_id, trips_id, user_status)values (?, ?, ?)', [users_id, trips_id, user_status])
}

const getGeometry = (tripId) => {
    return db.query('SELECT lat, lng FROM trips WHERE id = ?', [tripId])
}



module.exports = { getAll, create, editById, deleteById, getTripById, getTripsByDestination, getTripsCreatedByUser, createComment, getCommentsByTrips, getAllDestinations, getTripsSuscribedByUser, createItinerary, createRequest, getGeometry }
