const {
    getBuilderByName,
    getAllBuilders,
    createBuilder,
    updateBuilder,
    deleteBuilder
} = require('../dataAccessLogic/builderDal');
const { v4: uuidv4 } = require('uuid');

const getBuilderByNameService = async (builder_name) => {
    try {
        const response = await getBuilderByName(builder_name);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Builder not found", errorStatus: 404 };
        }
        return { message: "Builder fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting builder: ${error}` };
    }
};

const getAllBuildersService = async () => {
    try {
        const response = await getAllBuilders();

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Builders not found", errorStatus: 404 };
        }
        return { message: "Builders fetched.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while getting builders: ${error}` };
    }
};

const createBuilderService = async (builder_name, builder_website) => {
    try {
        const builder_id = uuidv4();
        const response = await createBuilder(builder_id, builder_name, builder_website);

        if (response.dbStatus === 500) {
            return { error: "DB error." };
        } else if (response.dbStatus === 404) {
            return { error: "Cannot create builder", errorStatus: 500 };
        }

        return { message: "Builder created.", response: builder_name };
    } catch (error) {
        return { error: `Server/service error while creating builder: ${error}` };
    }
};

const updateBuilderService = async (builder_name, builder_website, builder_id) => {
    try {
        const response = await updateBuilder(builder_name, builder_website, builder_id);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Builder not found", errorStatus: 404 };
        }
        return { message: "Builder updated.", response: response.response, okStatus: 200 };
    } catch (error) {
        return { error: `Server/service error while updating builder: ${error}` };
    }
};

const deleteBuilderService = async (builder_name) => {
    try {
        const response = await deleteBuilder(builder_name);

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 };
        } else if (response.dbStatus === 404) {
            return { error: "Builder not found", errorStatus: 404 };
        }
        return { message: "Builder deleted.", response: response.response };
    } catch (error) {
        return { error: `Server/service error while deleting builder: ${error}` };
    }
};

module.exports = {
    getBuilderByNameService,
    getAllBuildersService,
    createBuilderService,
    updateBuilderService,
    deleteBuilderService,
};
