const { db } = require('../conn_db/connect');
const { dbStatusObject, accessData } = require('../utils/dbStatus');
require('dotenv').config();
const util = require('util');
const {
    getAllCitiesQuery,
    getCityByIdQuery,
    createCityQuery,
    updateCityQuery,
    deleteCityQuery
} = require('../queries/cityQueries');

const getCityById = async (city_id) => {
    return await accessData(getCityByIdQuery, [city_id]);
};

const getAllCities = async () => {
    return await accessData(getAllCitiesQuery);
};

const createCity = async (city_id, city_name, province_id) => {
    return await accessData(createCityQuery, [city_id, city_name, province_id]);
};

const updateCity = async (city_name, province_id, city_id) => {
    return await accessData(updateCityQuery, [city_name, province_id, city_id]);
};

const deleteCity = async (city_id) => {
    return await accessData(deleteCityQuery, [city_id]);
};

module.exports = {
    getCityById,
    getAllCities,
    createCity,
    updateCity,
    deleteCity
};
