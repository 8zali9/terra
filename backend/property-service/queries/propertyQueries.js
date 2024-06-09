const getAllPropertiesQuery = `
    select *
    from Property
`;

const getPropertyQuery = `
    select p.*, u.first_name, u.last_name, u.phone_number, l.location_name, b.builder_name
    from Property p
    join user u on p.user_id = u.user_id
    join location l on p.location_id = l.location_id
    join builder b on p.builder_id = b.builder_id
    where property_id = ?
`;

const getUserPropertiesQuery = `
    select * 
    from Property
    where user_id = ?
`

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
        builder_id = ?, location_id = ?, property_subtype_id = ?
    where 
        property_id = ? 
        and
        user_id = ?
`;


const deletePropertyQuery = `
        delete from Property
        where 
            property_id = ? 
            and
            user_id = ?
`;

const searchPropertyByFilterQuery = `
    select * from Property p
    where p.property_subtype_id = ? or
    exists (
        select * from location
        where location_name = ?
    ) or
    p.price between ? and ? or
    p.bedrooms = ?
`;

module.exports = {
    getAllPropertiesQuery,
    getPropertyQuery,
    getUserPropertiesQuery,
    createPropertyQuery,
    updatePropertyQuery,
    deletePropertyQuery,
    searchPropertyByFilterQuery
}