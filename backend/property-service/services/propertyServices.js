const {
    getProperty,
    getAllProperties,
    createProperty,
    updateProperty,
    deleteProperty
} = require('../dataAccessLogic/propertyDal');
const { v4: uuidv4 } = require('uuid');

const getPropertyService = async (property_id) => {
    try {
        const response = await getProperty(property_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Property not found", errorStatus: 404 };
        }
        return { message: "Property fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting property: ${error}` };
    }
};

const getAllPropertiesService = async () => {
    try {
        const response = await getAllProperties();

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Properties not found", errorStatus: 404 };
        }
        return { message: "Properties fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting properties: ${error}` };
    }
};

const createPropertyService = async (
    purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
    property_id, property_title, date_listed, property_description, property_history, 
    property_images, longitude, latitude, user_id, builder_id, location_id, property_subtype_id
) => {
    try {
        const response = await createProperty(
            purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
            property_id, property_title, date_listed, property_description, property_history, 
            property_images, longitude, latitude, user_id, builder_id, location_id, property_subtype_id
        );

        if (response.dbStatus === 500) {
            return { error: "DB error." };
        } else if (response.dbStatus === 404) {
            return { error: "Cannot create property" };
        }

        return { message: "Property created.", response: property_id };
    } catch (error) {
        return { error: `Server/service error while creating property: ${error}` };
    }
};

const updatePropertyService = async (
    purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
    property_id, property_title, date_listed, property_description, property_history, 
    property_images, longitude, latitude, user_id, builder_id, location_id, property_subtype_id
) => {
    try {
        const response = await updateProperty(
            purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
            property_id, property_title, date_listed, property_description, property_history, 
            property_images, longitude, latitude, user_id, builder_id, location_id, property_subtype_id
        );

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Property not found", errorStatus: 404 };
        }
        return { message: "Property updated.", response: response.response, okStatus: 200 };
    } catch (error) {
        return { error: `Server/service error while updating property: ${error}` };
    }
};

const deletePropertyService = async (property_id) => {
    try {
        const response = await deleteProperty(property_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Property not found", errorStatus: 404 };
        }
        return { message: "Property deleted.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while deleting property: ${error}` };
    }
};

module.exports = {
    getPropertyService,
    getAllPropertiesService,
    createPropertyService,
    updatePropertyService,
    deletePropertyService,
};
