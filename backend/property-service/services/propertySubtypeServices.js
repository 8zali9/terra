const {
    getPropertySubtypeById,
    getAllPropertySubtypes,
    createPropertySubtype,
    updatePropertySubtype,
    deletePropertySubtype
} = require('../dataAccessLogic/propertySubtypeDal');
const { v4: uuidv4 } = require('uuid');

const getPropertySubtypeByIdService = async (property_subtype_id) => {
    try {
        const response = await getPropertySubtypeById(property_subtype_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Property subtype not found", errorStatus: 404 };
        }
        return { message: "Property subtype fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting property subtype: ${error}` };
    }
};

const getAllPropertySubtypesService = async () => {
    try {
        const response = await getAllPropertySubtypes();

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Property subtypes not found", errorStatus: 404 };
        }
        return { message: "Property subtypes fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting property subtypes: ${error}` };
    }
};

const createPropertySubtypeService = async (property_subtype_name, property_type_id) => {
    try {
        const property_subtype_id = uuidv4();
        const response = await createPropertySubtype(property_subtype_id, property_subtype_name, property_type_id);

        if (response.dbStatus === 500) {
            return { error: "DB error." };
        } else if (response.dbStatus === 404) {
            return { error: "Cannot create property subtype" };
        }

        return { message: "Property subtype created.", response: property_subtype_name };
    } catch (error) {
        return { error: `Server/service error while creating property subtype: ${error}` };
    }
};

const updatePropertySubtypeService = async (property_subtype_name, property_type_id, property_subtype_id) => {
    try {
        const response = await updatePropertySubtype(property_subtype_name, property_type_id, property_subtype_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Property subtype not found", errorStatus: 404 };
        }
        return { message: "Property subtype updated.", response: response.response, okStatus: 200 };
    } catch (error) {
        return { error: `Server/service error while updating property subtype: ${error}` };
    }
};

const deletePropertySubtypeService = async (property_subtype_id) => {
    try {
        const response = await deletePropertySubtype(property_subtype_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Property subtype not found", errorStatus: 404 };
        }
        return { message: "Property subtype deleted.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while deleting property subtype: ${error}` };
    }
};

module.exports = {
    getPropertySubtypeByIdService,
    getAllPropertySubtypesService,
    createPropertySubtypeService,
    updatePropertySubtypeService,
    deletePropertySubtypeService,
};
