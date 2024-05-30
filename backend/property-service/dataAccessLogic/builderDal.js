const { db } = require('../conn_db/connect');
const { dbStatusObject, accessData } = require('./dbStatus');
require('dotenv').config();
const util = require('util');
const {
    getAllBuildersQuery,
    getBuilderByNameQuery,
    createBuilderQuery,
    updateBuilderQuery,
    deleteBuilderQuery
} = require('../queries/builderQueries');

const getBuilderByName = async (builder_name) => {
    return await accessData(getBuilderByNameQuery, [builder_name]);
};

const getAllBuilders = async () => {
    return await accessData(getAllBuildersQuery);
};

const createBuilder = async (builder_id, builder_name, builder_website) => {
    return await accessData(createBuilderQuery, [builder_id, builder_name, builder_website]);
};

const updateBuilder = async (builder_name, builder_website, builder_id) => {
    return await accessData(updateBuilderQuery, [builder_name, builder_website, builder_id]);
};

const deleteBuilder = async (builder_name) => {
    return await accessData(deleteBuilderQuery, [builder_name]);
};

module.exports = {
    getBuilderByName,
    getAllBuilders,
    createBuilder,
    updateBuilder,
    deleteBuilder
};
