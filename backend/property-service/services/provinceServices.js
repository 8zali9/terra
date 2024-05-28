const {
    getProvinceById,
    getAllProvinces,
    createProvince,
    updateProvince,
    deleteProvince
} = require('../dataAccessLogic/provinceDal');
const { v4: uuidv4 } = require('uuid');

const getProvinceByIdService = async (province_id) => {
    try {
        const response = await getProvinceById(province_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Province not found", errorStatus: 404 };
        }
        return { message: "Province fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting province: ${error}` };
    }
};

const getAllProvincesService = async () => {
    try {
        const response = await getAllProvinces();

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Provinces not found", errorStatus: 404 };
        }
        return { message: "Provinces fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting provinces: ${error}` };
    }
};

const createProvinceService = async (province_name) => {
    try {
        const province_id = uuidv4();
        const response = await createProvince(province_id, province_name);

        if (response.dbStatus === 500) {
            return { error: "DB error." };
        } else if (response.dbStatus === 404) {
            return { error: "Cannot create province" };
        }

        return { message: "Province created.", response: province_name };
    } catch (error) {
        return { error: `Server/service error while creating province: ${error}` };
    }
};

const updateProvinceService = async (province_name, province_id) => {
    try {
        const response = await updateProvince(province_name, province_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Province not found", errorStatus: 404 };
        }
        return { message: "Province updated.", response: response.response, okStatus: 200 };
    } catch (error) {
        return { error: `Server/service error while updating province: ${error}` };
    }
};

const deleteProvinceService = async (province_id) => {
    try {
        const response = await deleteProvince(province_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Province not found", errorStatus: 404 };
        }
        return { message: "Province deleted.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while deleting province: ${error}` };
    }
};

module.exports = {
    getProvinceByIdService,
    getAllProvincesService,
    createProvinceService,
    updateProvinceService,
    deleteProvinceService,
};
