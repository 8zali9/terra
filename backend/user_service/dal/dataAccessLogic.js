const { db } = require('../conn_db/connect')
require('dotenv').config()
const util = require('util')
const {
    getUserQuery,
    createUserQuery,
    updateUserQuery,
    deleteUserQuery
} = require('../queries/user_queries')

const dbStatusObject = {
    ok: 200,
    notFound: 404,
    serverError: 500
}

util.promisify(db.query).bind(db)

const accessData = (query, queryParams) => {
    try {
        const result = query(query, queryParams)

        if (result.length === 0) {
            return { err: "void", dbStatus: dbStatusObject.notFound}
        }
        return {result, dbStatus: dbStatusObject.ok}
    } catch (error) {
        return { err: "server error", dbStatus: dbStatusObject.serverError}
    }
}

const getUser = (user_id) => {
    return accessData(getUserQuery, [user_id])
}

const createUser = (user_id, first_name, last_name, email, password, phone_number, user_profile_image) => {
    return accessData(createUserQuery, [user_id, first_name, last_name, email, password, phone_number, user_profile_image])
}

const updateUser = (first_name, last_name, email, password, phone_number, user_profile_image, user_id) => {
    return accessData(updateUserQuery, [first_name, last_name, email, password, phone_number, user_profile_image, user_id])
}

const deleteUser = (user_id) => {
    return accessData(deleteUserQuery, [user_id])
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}