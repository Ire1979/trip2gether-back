const getAllUsers = () => {
    return db.query('SELECT * FROM users');
}

const createUser = ({
    name, surname, username, email, password, phone, hobbies, personality, birth_date, rating }) => {
    return db.query(
        'INSERT INTO users (name, surname, username, email, password, phone, hobbies, personality, birth_date) VALUES (?,?,?,?,?,?,?,?,?)',
        [name, surname, username, email, password, phone, hobbies, personality, birth_date]);
}

const editByUserId = (userId, { name, surname, username, phone, hobbies, personality, birth_date }) => {
    return db.query('UPDATE users SET name = ?, surname = ?, username = ?, phone = ?, hobbies = ?, personality = ?, birth_date = ? WHERE id = ?', [name, surname, username, phone, hobbies, personality, birth_date, userId]);
}

const deleteByUserId = (userId) => {
    return db.query('DELETE FROM users WHERE id = ?', [userId]);
}

const getUserById = (userId) => {
    return db.query('SELECT * FROM users WHERE id = ?', [userId]);
}

const getByEmail = (email) => {
    return db.query('SELECT * FROM USERS WHERE email = ?', [email]);
}

const getUsersByTrip = (tripId) => {
    return db.query('SELECT u.* FROM users_has_trips ut JOIN users u ON u.id = ut.users_id WHERE ut.trips_id = ?', [tripId]);
}

module.exports = { getAllUsers, createUser, editByUserId, deleteByUserId, getUserById, getByEmail, getUsersByTrip }