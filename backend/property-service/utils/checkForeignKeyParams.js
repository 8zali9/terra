const {
    getBuilderByNameService,
    createBuilderService,
} = require('../services/builderServices')
const {
    getPropertySubtypeByIdService,
} = require('../services/propertySubtypeServices')
const { getLocationByNameService } = require('../services/locationServices')

const checkBuilder = async (builder_name) => {
    const builder = await getBuilderByNameService(builder_name)
    let createNewBuilder;
    if (builder.errorStatus === 404) {
        createNewBuilder = await createBuilderService(builder_name, null);
        if (createNewBuilder.errorStatus === 500) {
            throw new Error("Cannot create new builder")
        }
        return createNewBuilder
    } else {
        return builder.response[0].builder_id
    }
}

const checkPropertySubType = async (propertysubtype_id) => {
    const subtype = await getPropertySubtypeByIdService(propertysubtype_id)
    if (subtype.error) {
        throw new Error("Invalid Property Subtype")
    }
    return subtype
}

const checkLocation = async (location_name) => {
    const location = await getLocationByNameService(location_name)
    if (location.error) {
        throw new Error("Invalid Location")
    }
    console.log("location", location)
    return location
}

module.exports = {
    checkBuilder,
    checkPropertySubType,
    checkLocation
}