const jwt = require('jsonwebtoken')
require('dotenv').config()
const mysql = require('mysql2')

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
})
const db = conn.promise()

const fetchQuery = `
    select *
    from User
    where user_id = ?
`;

const fetchUser = async (userID) => {
    try {
      const result = await db.query(fetchQuery, [userID]);
      if (result[0] === 0) {
        return { error: "User doesnt exist" }
      } else {
        return result[0];
      }
    } catch (error) {
      return {error};
    }
};

const authenticate = async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized. No Token" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await fetchUser(req.params.user_id)

        if (req.params.user_id && req.params.user_id != decodedToken.userID[0].user_id) {
            return res.status(403).json({ error: "Forbidden. You don't have access to this resource." })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ error: `Unauthorized. Invalid Token: ${error}` });
    }
}

module.exports = authenticate