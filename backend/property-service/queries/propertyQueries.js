const getAllPropertiesQuery = `
    select *
    from Property
`;

const getPropertyQuery = `
    select *
    from Property
    where property_id = ?
`;

const createPropertyQuery = `
    insert into Property (
        purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
        property_id, property_title, date_listed, property_description, property_history, 
        property_images, longitude, latitude, user_id, builder_id, location_id, property_subtype_id
    ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
`;


const updatePropertyQuery = `
    update Property
    set 
        purpose = ?, price = ?, on_installment = ?, installment_rate = ?, bedrooms = ?, 
        bathrooms = ?, area = ?, property_title = ?, date_listed = ?, property_description = ?, 
        property_history = ?, property_images = ?, longitude = ?, latitude = ?, 
        user_id = ?, builder_id = ?, location_id = ?, property_subtype_id = ?
    where property_id = ?
`;


const deletePropertyQuery = `
        delete from Property
        where property_id = ?
`;

module.exports = {
    getAllPropertiesQuery,
    getPropertyQuery,
    createPropertyQuery,
    updatePropertyQuery,
    deletePropertyQuery
}