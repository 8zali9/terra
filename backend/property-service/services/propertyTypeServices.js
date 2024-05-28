const {
    getPropertyTypeById,
    getAllPropertyTypes,
    createPropertyType,
    updatePropertyType,
    deletePropertyType
} = require('../dataAccessLogic/propertyTypeDal');
const { v4: uuidv4 } = require('uuid');

const getPropertyTypeByIdService = async (property_type_id) => {
    try {
        const response = await getPropertyTypeById(property_type_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Property type not found", errorStatus: 404 };
        }
        return { message: "Property type fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting property type: ${error}` };
    }
};

const getAllPropertyTypesService = async () => {
    try {
        const response = await getAllPropertyTypes();

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Property types not found", errorStatus: 404 };
        }
        return { message: "Property types fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting property types: ${error}` };
    }
};

const createPropertyTypeService = async (property_type_name) => {
    try {
        const property_type_id = uuidv4();
        const response = await createPropertyType(property_type_id, property_type_name);

        if (response.dbStatus === 500) {
            return { error: "DB error." };
        } else if (response.dbStatus === 404) {
            return { error: "Cannot create property type" };
        }

        return { message: "Property type created.", response: property_type_name };
    } catch (error) {
        return { error: `Server/service error while creating property type: ${error}` };
    }
};

const updatePropertyTypeService = async (property_type_name, property_type_id) => {
    try {
        const response = await updatePropertyType(property_type_name, property_type_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Property type not found", errorStatus: 404 };
        }
        return { message: "Property type updated.", response: response.response, okStatus: 200 };
    } catch (error) {
        return { error: `Server/service error while updating property type: ${error}` };
    }
};

const deletePropertyTypeService = async (property_type_id) => {
    try {
        const response = await deletePropertyType(property_type_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Property type not found", errorStatus: 404 };
        }
        return { message: "Property type deleted.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while deleting property type: ${error}` };
    }
};

module.exports = {
    getPropertyTypeByIdService,
    getAllPropertyTypesService,
    createPropertyTypeService,
    updatePropertyTypeService,
    deletePropertyTypeService,
};
