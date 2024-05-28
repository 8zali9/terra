const { db } = require('../conn_db/connect')
const {dbStatusObject, accessData} = require('./dbStatus')
require('dotenv').config()
const util = require('util')
const {
    getAllPropertiesQuery,
    getPropertyQuery,
    createPropertyQuery,
    updatePropertyQuery,
    deletePropertyQuery
} = require('../queries/propertyQueries')

const getProperty = async (property_id) => {
    return await accessData(getPropertyQuery, [property_id])
}

const getAllProperties = async () => {
    return await accessData(getAllPropertiesQuery)
}

const createProperty = async(
        purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
        property_id, property_title, date_listed, property_description, property_history, 
        property_images, longitude, latitude, user_id, builder_id, location_id, property_subtype_id
) => {
    return await accessData(createPropertyQuery, [
        purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
        property_id, property_title, date_listed, property_description, property_history, 
        property_images, longitude, latitude, user_id, builder_id, location_id, property_subtype_id
    ])
}

const updateProperty = async(first_name, last_name, email, password, phone_number, user_id) => {
    return await accessData(updatePropertyQuery, [first_name, last_name, email, password, phone_number, user_id])
}

const deleteProperty = async(property_id) => {
    return await accessData(deletePropertyQuery, [property_id])
}

module.exports = {
    getProperty,
    getAllProperties,
    createProperty,
    updateProperty,
    deleteProperty
}