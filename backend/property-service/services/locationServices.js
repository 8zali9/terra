const {
    getLocationById,
    getAllLocations,
    createLocation,
    updateLocation,
    deleteLocation
} = require('../dataAccessLogic/locationDal');
const { v4: uuidv4 } = require('uuid');

const getLocationByIdService = async (location_id) => {
    try {
        const response = await getLocationById(location_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Location not found", errorStatus: 404 };
        }
        return { message: "Location fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting location: ${error}` };
    }
};

const getAllLocationsService = async () => {
    try {
        const response = await getAllLocations();

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Locations not found", errorStatus: 404 };
        }
        return { message: "Locations fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting locations: ${error}` };
    }
};

const createLocationService = async (location_name, city_id) => {
    try {
        const location_id = uuidv4();
        const response = await createLocation(location_id, location_name, city_id);

        if (response.dbStatus === 500) {
            return { error: "DB error." };
        } else if (response.dbStatus === 404) {
            return { error: "Cannot create location" };
        }

        return { message: "Location created.", response: location_name };
    } catch (error) {
        return { error: `Server/service error while creating location: ${error}` };
    }
};

const updateLocationService = async (location_name, city_id, location_id) => {
    try {
        const response = await updateLocation(location_name, city_id, location_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Location not found", errorStatus: 404 };
        }
        return { message: "Location updated.", response: response.response, okStatus: 200 };
    } catch (error) {
        return { error: `Server/service error while updating location: ${error}` };
    }
};

const deleteLocationService = async (location_id) => {
    try {
        const response = await deleteLocation(location_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Location not found", errorStatus: 404 };
        }
        return { message: "Location deleted.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while deleting location: ${error}` };
    }
};

module.exports = {
    getLocationByIdService,
    getAllLocationsService,
    createLocationService,
    updateLocationService,
    deleteLocationService,
};

