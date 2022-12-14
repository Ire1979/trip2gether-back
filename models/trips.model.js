const { strToBool } = require("../helpers/utils");

const getAll = () => {
    return db.query('SELECT * FROM trips');
}

const create = ({
    destination, min_traveler, max_traveler, min_age, max_age, departure_date, duration, price, description, img_trip, flights, hotel, meals, excursions, rent_car, insurance, user_id }) => {
    return db.query(
        'INSERT INTO trips (destination, min_traveler, max_traveler, min_age, max_age, departure_date, duration, price, description, img_trip, flights, hotel, meals, excursions, rent_car, insurance, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [destination, min_traveler, max_traveler, min_age, max_age, departure_date, duration, price, description, img_trip, strToBool(flights), strToBool(hotel), strToBool(meals), strToBool(excursions), strToBool(rent_car), strToBool(insurance), user_id]);
}

const editById = (tripId, { destination, min_traveler, max_traveler, min_age, max_age, departure_date, duration, price, description }) => {
    return db.query('UPDATE trips SET destination = ?, min_traveler = ?, max_traveler = ?, min_age = ?, max_age = ?, departure_date = ?, duration = ?, price = ?, description = ? WHERE id = ?', [destination, min_traveler, max_traveler, min_age, max_age, departure_date, duration, price, description, tripId]);
}

const deleteById = (tripId) => {
    return db.query('DELETE FROM trips WHERE id = ?', [tripId]);
}

const getTripById = (tripId) => {
    return db.query(`SELECT * FROM trips t
    JOIN users u ON t.user_id = u.id
    where t.id = ?`, [tripId]);
}

const getTripsByDestination = (destination) => {
    return db.query('SELECT * FROM trips WHERE destination = ?', [destination]);
}

const getTripsByUser = (userId) => {
    return db.query('SELECT t.* FROM users_has_trips ut JOIN trips t ON t.id = ut.trips_id WHERE ut.users_id = ?', [userId]);
}

module.exports = { getAll, create, editById, deleteById, getTripById, getTripsByDestination, getTripsByUser }