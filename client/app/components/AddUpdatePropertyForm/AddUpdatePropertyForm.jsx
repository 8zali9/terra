import React, { useState } from 'react'
import './add-property.css'
import { apiReq } from '../../utils/fetch'

export default function AddUpdatePropertyForm() {
    const [purpose, setPurpose] = useState("")
    const [price, setPrice] = useState(0)
    const [on_installment, setOn_installment] = useState()
    const [installment_rate, setInstallment_rate] = useState("")
    const [bedrooms, setBedrooms] = useState()
    const [bathrooms, setBathrooms] = useState("")
    const [area, setArea] = useState("")
    const [property_title, setProperty_title] = useState("")
    const [date_listed, setDate_listed] = useState("")
    const [property_description, setProperty_description] = useState("")
    const [property_history, setproperty_history] = useState(null)
    const [longitude, setLongitude] = useState("")
    const [latitude, setLatitude] = useState("")
    const [user_id, setUser_id] = useState("")
    const [builder_name, setBuilder_name] = useState("")
    const [location_name, setLocation_name] = useState("")
    const [property_subtype_id, setProperty_subtype_id] = useState(1)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const uid = localStorage.getItem("user_id")
            if (!uid) {
                throw new Error("Signin please")
            }
            setUser_id(uid)
            const res = await apiReq(
                8020, 
                'terra.property-service/create.property',
                null,
                'POST',
                {
                    purpose,
                    price,
                    on_installment,
                    installment_rate,
                    bedrooms,
                    bathrooms,
                    area,
                    property_title,
                    date_listed,
                    property_description,
                    property_history,
                    longitude,
                    latitude,
                    user_id,
                    builder_name,
                    location_name,
                    property_subtype_id
                }
            )

            const result = await res.json()

            if (res.status === 201) {
                console.log(result)
            } else {
                console.log("error", result)
            }
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <div id='add-property-main-pg'>
        <h3>List an ad for sale</h3>
        <form id='add-property-form' onSubmit={handleSubmit}>
            <div id='add-property-form-main-div'>

                <div>
                    <label htmlFor="property-title">Property Title</label>
                    <input type="text" id="property-title" value={property_title} onChange={(e) => setProperty_title(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="purpose">Purpose</label>
                    <input type="text" id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="property-description">Property Description</label>
                    <input type="text" id="property-description" value={property_description} onChange={(e) => setProperty_description(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="bedrooms">Bedrooms</label>
                    <input type="number" id="bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="bathrooms">Bathrooms</label>
                    <input type="number" id="bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="area">Area</label>
                    <input type="number" id="area" value={area} onChange={(e) => setArea(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="on-installment">On Installment</label>
                    <input type="number" id="on-installment" value={on_installment} onChange={(e) => setOn_installment(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="installment_rate">Installment Rate</label>
                    <input type="" id="installment_rate" value={installment_rate} onChange={(e) => setInstallment_rate(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="date-listed">date Listed</label>
                    <input type="date" id="date-listed" value={date_listed} onChange={(e) => setDate_listed(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="property-history">Property history</label>
                    <input type="text" id="property-history" value={property_history} onChange={(e) => setproperty_history(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="longitude">Longitude</label>
                    <input type="number" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="latitude">Latitude</label>
                    <input type="number" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="builder-name">Builder name</label>
                    <input type="text" id="builder-name" value={builder_name} onChange={(e) => setBuilder_name(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="location-name">Location name</label>
                    <input type="text" id="location-name" value={location_name} onChange={(e) => setLocation_name(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="property-subtype-id">Property subtype</label>
                    <input type="number" id="property-subtype-id" value={property_subtype_id} onChange={(e) => setProperty_subtype_id(e.target.value)}/>
                </div>
                <button type='submit'></button>
            </div>
        </form>
    </div>
  )
}