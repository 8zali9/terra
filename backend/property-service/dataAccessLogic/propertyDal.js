const { dbStatusObject, accessData } = require('../utils/dbStatus');
require('dotenv').config()
const util = require('util')
const {
    getAllPropertiesQuery,
    getPropertyQuery,
    getUserPropertiesQuery,
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

const getUserProperties = async (user_id) => {
    return await accessData(getUserPropertiesQuery, [user_id])
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

const updateProperty = async(
    purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
    property_title, date_listed, property_description, property_history, property_images,
    longitude, latitude, builder_id, location_id, property_subtype_id, property_id, user_id
) => {
    return await accessData(updatePropertyQuery, [
        purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
        property_title, date_listed, property_description, property_history, property_images,
        longitude, latitude, builder_id, location_id, property_subtype_id, property_id, user_id
    ])
}

const deleteProperty = async(property_id, user_id) => {
    return await accessData(deletePropertyQuery, [property_id, user_id])
}

module.exports = {
    getProperty,
    getAllProperties,
    getUserProperties,
    createProperty,
    updateProperty,
    deleteProperty
}