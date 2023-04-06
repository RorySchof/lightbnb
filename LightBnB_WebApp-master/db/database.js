const { Pool } = require('pg');
const properties = require("./json/properties.json");
const users = require("./json/users.json");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});

const getUserWithEmail = function (email) {
  return pool.query(`
    SELECT *
    FROM users
    WHERE email = $1;
  `, [email])
  .then(res => res.rows[0])
  .catch(err => null);
};

const getUserWithId = function (id) {
  return pool.query(`
    SELECT *
    FROM users
    WHERE id = $1;
  `, [id])
  .then(res => res.rows[0])
  .catch(err => null);
};

const addUser = function (user) {
  return pool.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [user.name, user.email, user.password])
  .then(res => res.rows[0])
  .catch(err => null);
};

const getAllReservations = function (guest_id, limit = 10) {
  return pool.query(`
    SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, avg(rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;
  `, [guest_id, limit])
  .then(res => res.rows)
  .catch(err => null);
};

// const getAllReservations = function (guest_id, limit = 10) {
//   return getAllProperties(null, limit);
// };

const getAllProperties = function (options, limit = 10) {
  return pool.query(`
    SELECT *
    FROM properties
    LIMIT $1;
  `, [limit])
  .then(res => res.rows)
  .catch(err => null);
};

const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};


