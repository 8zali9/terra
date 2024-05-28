const { db } = require('../conn_db/connect');
const { dbStatusObject, accessData } = require('./dbStatus');
require('dotenv').config();
const util = require('util');
const {
    getAllProvincesQuery,
    getProvinceByIdQuery,
    createProvinceQuery,
    updateProvinceQuery,
    deleteProvinceQuery
} = require('../queries/provinceQueries');

const getProvinceById = async (province_id) => {
    return await accessData(getProvinceByIdQuery, [province_id]);
};

const getAllProvinces = async () => {
    return await accessData(getAllProvincesQuery);
};

const createProvince = async (province_id, province_name) => {
    return await accessData(createProvinceQuery, [province_id, province_name]);
};

const updateProvince = async (province_name, province_id) => {
    return await accessData(updateProvinceQuery, [province_name, province_id]);
};

const deleteProvince = async (province_id) => {
    return await accessData(deleteProvinceQuery, [province_id]);
};

module.exports = {
    getProvinceById,
    getAllProvinces,
    createProvince,
    updateProvince,
    deleteProvince
};
