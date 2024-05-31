const { db } = require('../conn_db/connect');
const { dbStatusObject, accessData } = require('../utils/dbStatus');
require('dotenv').config();
const util = require('util');
const {
    getAllPropertySubtypesQuery,
    getPropertySubtypeByIdQuery,
    createPropertySubtypeQuery,
    updatePropertySubtypeQuery,
    deletePropertySubtypeQuery
} = require('../queries/propertySubtypeQueries');

const getPropertySubtypeById = async (property_subtype_id) => {
    return await accessData(getPropertySubtypeByIdQuery, [property_subtype_id]);
};

const getAllPropertySubtypes = async () => {
    return await accessData(getAllPropertySubtypesQuery);
};

const createPropertySubtype = async (property_subtype_id, property_subtype_name, property_type_id) => {
    return await accessData(createPropertySubtypeQuery, [property_subtype_id, property_subtype_name, property_type_id]);
};

const updatePropertySubtype = async (property_subtype_name, property_type_id, property_subtype_id) => {
    return await accessData(updatePropertySubtypeQuery, [property_subtype_name, property_type_id, property_subtype_id]);
};

const deletePropertySubtype = async (property_subtype_id) => {
    return await accessData(deletePropertySubtypeQuery, [property_subtype_id]);
};

module.exports = {
    getPropertySubtypeById,
    getAllPropertySubtypes,
    createPropertySubtype,
    updatePropertySubtype,
    deletePropertySubtype
};
