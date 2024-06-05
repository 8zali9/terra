const {
    getProperty,
    getAllProperties,
    getUserProperties,
    createProperty,
    updateProperty,
    deleteProperty,
    searchPropertyByFilter
} = require('../dataAccessLogic/propertyDal');
const { v4: uuidv4 } = require('uuid');
const { checkBuilder, checkPropertySubType, checkLocation } = require('../utils/checkForeignKeyParams');

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

const getUserPropertiesService = async (user_id) => {
    try {
        const response = await getUserProperties(user_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Properties not found", errorStatus: 404 };
        }
        return { message: "Property fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting properties of the user: ${error}` };
    }
};

const createPropertyService = async (
    purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
    property_title, date_listed, property_description, property_history, 
    property_images, longitude, latitude, user_id, builder_name, location_name, property_subtype_id
) => {
    try {
        // checks for foreign key validation/existence
        const builder = await checkBuilder(builder_name)
        const builder_id = builder.response[0].builder_id
        await checkPropertySubType(property_subtype_id)
        const locationCheck = await checkLocation(location_name)
        const location_id = locationCheck.response[0].location_id
        
        const property_id = uuidv4()
        const response = await createProperty(
            purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
            property_id, property_title, date_listed, property_description, property_history, 
            property_images, longitude, latitude, user_id, builder_id, location_id, property_subtype_id
        );
        console.log(response)
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
    property_title, date_listed, property_description, property_history, property_images,
    longitude, latitude, builder_name, location_name, property_subtype_id, property_id, user_id
) => {
    try {
        // checks for foreign key validation/existence
        const builder = await checkBuilder(builder_name)
        const builder_id = builder.response.builder_id
        await checkPropertySubType(property_subtype_id)
        const locationCheck = await checkLocation(location_name)
        const location_id = locationCheck.response.location_id

        const response = await updateProperty(
            purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
            property_title, date_listed, property_description, property_history, property_images,
            longitude, latitude, builder_id, location_id, property_subtype_id, property_id, user_id
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

const deletePropertyService = async (property_id, user_id) => {
    try {
        const response = await deleteProperty(property_id, user_id);

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

const searchPropertyByFilterService = async (property_subtype_id, location_name, minPrice, maxPrice, bedrooms) => {
    try {
        const response = await searchPropertyByFilter(property_subtype_id, location_name, minPrice, maxPrice, bedrooms)
        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Properties not found", errorStatus: 404 };
        }
        return { message: "Properties fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while fetching properties: ${error}` };
    }
}

module.exports = {
    getPropertyService,
    getAllPropertiesService,
    getUserPropertiesService,
    createPropertyService,
    updatePropertyService,
    deletePropertyService,
    searchPropertyByFilterService
};
