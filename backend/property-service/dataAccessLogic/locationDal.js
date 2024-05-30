const { db } = require('../conn_db/connect');
const { dbStatusObject, accessData } = require('./dbStatus');
require('dotenv').config();
const util = require('util');
const {
    getAllLocationsQuery,
    getLocationByNameQuery,
    createLocationQuery,
    updateLocationQuery,
    deleteLocationQuery
} = require('../queries/locationQueries');

const getLocationByName = async (location_name) => {
    return await accessData(getLocationByNameQuery, [location_name]);
};

const getAllLocations = async () => {
    return await accessData(getAllLocationsQuery);
};

const createLocation = async (location_id, location_name, city_id) => {
    return await accessData(createLocationQuery, [location_id, location_name, city_id]);
};

const updateLocation = async (location_name, city_id, location_id) => {
    return await accessData(updateLocationQuery, [location_name, city_id, location_id]);
};

const deleteLocation = async (location_id) => {
    return await accessData(deleteLocationQuery, [location_id]);
};

module.exports = {
    getLocationByName,
    getAllLocations,
    createLocation,
    updateLocation,
    deleteLocation
};
