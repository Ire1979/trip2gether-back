const getAllUsers = () => {
    return db.query('SELECT * FROM users');
}

const createUser = ({
    name, surname, username, email, password, phone, hobbies, personality, birth_date, rating }) => {
    return db.query(
        'INSERT INTO users (name, surname, username, email, password, phone, hobbies, personality, birth_date, rating) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [name, surname, username, email, password, phone, hobbies, personality, birth_date, rating]);
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

module.exports = { getAllUsers, createUser, editByUserId, deleteByUserId, getUserById, getByEmail }