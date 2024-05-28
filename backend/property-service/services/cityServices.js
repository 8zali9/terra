const {
    getCityById,
    getAllCities,
    createCity,
    updateCity,
    deleteCity
} = require('../dataAccessLogic/cityDal');
const { v4: uuidv4 } = require('uuid');

const getCityByIdService = async (city_id) => {
    try {
        const response = await getCityById(city_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "City not found", errorStatus: 404 };
        }
        return { message: "City fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting city: ${error}` };
    }
};

const getAllCitiesService = async () => {
    try {
        const response = await getAllCities();

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Cities not found", errorStatus: 404 };
        }
        return { message: "Cities fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting cities: ${error}` };
    }
};

const createCityService = async (city_name, province_id) => {
    try {
        const city_id = uuidv4();
        const response = await createCity(city_id, city_name, province_id);

        if (response.dbStatus === 500) {
            return { error: "DB error." };
        } else if (response.dbStatus === 404) {
            return { error: "Cannot create city" };
        }

        return { message: "City created.", response: city_name };
    } catch (error) {
        return { error: `Server/service error while creating city: ${error}` };
    }
};

const updateCityService = async (city_name, province_id, city_id) => {
    try {
        const response = await updateCity(city_name, province_id, city_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "City not found", errorStatus: 404 };
        }
        return { message: "City updated.", response: response.response, okStatus: 200 };
    } catch (error) {
        return { error: `Server/service error while updating city: ${error}` };
    }
};

const deleteCityService = async (city_id) => {
    try {
        const response = await deleteCity(city_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "City not found", errorStatus: 404 };
        }
        return { message: "City deleted.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while deleting city: ${error}` };
    }
};

module.exports = {
    getCityByIdService,
    getAllCitiesService,
    createCityService,
    updateCityService,
    deleteCityService,
};
