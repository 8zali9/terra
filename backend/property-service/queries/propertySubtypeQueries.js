const createPropertySubtypeQuery = `
    INSERT INTO PropertySubtype (
        property_subtype_id, property_subtype_name, property_type_id
    ) VALUES (
        ?, ?, ?
    )
`;

const getPropertySubtypeByIdQuery = `
    SELECT *
    FROM PropertySubtype
    WHERE property_subtype_id = ?
`;

const getAllPropertySubtypesQuery = `
    SELECT *
    FROM PropertySubtype
`;

const updatePropertySubtypeQuery = `
    UPDATE PropertySubtype
    SET property_subtype_name = ?, property_type_id = ?
    WHERE property_subtype_id = ?
`;

const deletePropertySubtypeQuery = `
    DELETE FROM PropertySubtype
    WHERE property_subtype_id = ?
`;

module.exports = {
    createPropertySubtypeQuery,
    getPropertySubtypeByIdQuery,
    getAllPropertySubtypesQuery,
    updatePropertySubtypeQuery,
    deletePropertySubtypeQuery
}