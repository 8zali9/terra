const createPropertyTypeQuery = `
    INSERT INTO Property_type (
        property_type_id, property_type_name
    ) VALUES (
        ?, ?
    )
`;

const getPropertyTypeByIdQuery = `
    SELECT *
    FROM Property_type
    WHERE property_type_id = ?
`;

const getAllPropertyTypesQuery = `
    SELECT *
    FROM Property_type
`;

const updatePropertyTypeQuery = `
    UPDATE Property_type
    SET property_type_name = ?
    WHERE property_type_id = ?
`;

const deletePropertyTypeQuery = `
    DELETE FROM Property_type
    WHERE property_type_id = ?
`;

module.exports = {
    createPropertyTypeQuery,
    getPropertyTypeByIdQuery,
    getAllPropertyTypesQuery,
    updatePropertyTypeQuery,
    deletePropertyTypeQuery
}