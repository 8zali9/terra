const { db } = require('../conn_db/connect');
const { dbStatusObject, accessData } = require('./dbStatus');
require('dotenv').config();
const util = require('util');
const {
    getAllPropertyTypesQuery,
    getPropertyTypeByIdQuery,
    createPropertyTypeQuery,
    updatePropertyTypeQuery,
    deletePropertyTypeQuery
} = require('../queries/propertyTypeQueries');

const getPropertyTypeById = async (property_type_id) => {
    return await accessData(getPropertyTypeByIdQuery, [property_type_id]);
};

const getAllPropertyTypes = async () => {
    return await accessData(getAllPropertyTypesQuery);
};

const createPropertyType = async (property_type_id, property_type_name) => {
    return await accessData(createPropertyTypeQuery, [property_type_id, property_type_name]);
};

const updatePropertyType = async (property_type_name, property_type_id) => {
    return await accessData(updatePropertyTypeQuery, [property_type_name, property_type_id]);
};

const deletePropertyType = async (property_type_id) => {
    return await accessData(deletePropertyTypeQuery, [property_type_id]);
};

module.exports = {
    getPropertyTypeById,
    getAllPropertyTypes,
    createPropertyType,
    updatePropertyType,
    deletePropertyType
};
