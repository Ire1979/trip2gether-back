const getAllUsers = () => {
    return db.query('SELECT * FROM users');
}

const createUser = ({
    name, surname, username, email, password, phone, hobbies, personality, birth_date, rating, img_user }) => {
    return db.query(
        'INSERT INTO users (name, surname, username, email, password, phone, hobbies, personality, birth_date, img_user) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [name, surname, username, email, password, phone, hobbies, personality, birth_date, img_user]);
}

const editByUserId = (userId, { name, surname, username, email, password, phone, hobbies, personality, birth_date, rating }) => {
    return db.query('UPDATE users SET name = ?, surname = ?, username = ?, email = ?, password = ?, phone = ?, hobbies = ?, personality = ?, birth_date = ?, rating = ? WHERE id = ?', [name, surname, username, email, password, phone, hobbies, personality, birth_date, rating, userId]);
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