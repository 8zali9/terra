"use client"

import React, { useState } from 'react'
import './add-property.css'
import { apiReq } from '../utils/fetch'
import Header from '../components/Header/Header'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function AddUpdatePropertyForm() {
    const router = useRouter()

    const [purpose, setPurpose] = useState("")
    const [price, setPrice] = useState(0)
    const [on_installment, setOn_installment] = useState()
    const [installment_rate, setInstallment_rate] = useState("")
    const [bedrooms, setBedrooms] = useState()
    const [bathrooms, setBathrooms] = useState("")
    const [area, setArea] = useState("")
    const [property_title, setProperty_title] = useState("")
    const [date_listed, setDate_listed] = useState(null)
    const [property_description, setProperty_description] = useState("")
    const [property_history, setproperty_history] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [latitude, setLatitude] = useState(null)
    const [user_id, setUser_id] = useState(null)
    const [builder_name, setBuilder_name] = useState("")
    const [location_name, setLocation_name] = useState("")
    const [property_subtype_id, setProperty_subtype_id] = useState(1)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const currDate = new Date().toISOString().slice(0, 10)
        setDate_listed()
        const uid = localStorage.getItem("user_id")

        try {
            if (!uid) {
                throw new Error("Signin please")
            }
            setUser_id(uid)
            const res = await apiReq(
                8000,
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
                    date_listed: currDate,
                    property_description,
                    property_history,
                    longitude,
                    latitude,
                    user_id: uid,
                    builder_name,
                    location_name,
                    property_subtype_id
                }
            )

            const result = await res.json()

            if (res.status === 201) {
                toast.success("Ad posted")
            } else {
                toast.error("Something went wrong")
            }
        } catch (error) {
            toast.error(error)
        }

    }

  return (
    <div id='add-property-main-pg'>
        <Header />
        <h3 id='add-property-main-head'><u>List an ad for sale</u></h3>
        <form id='add-property-form' onSubmit={handleSubmit}>
            <div id='add-property-form-main-div'>

                <div id='add-p-title-purpose-div'>
                    <div id='property-title-div' className='add-property-form-inner-divs'>
                        <label htmlFor="property-title">Property Title</label>
                        <input type="text" id="property-title" value={property_title} onChange={(e) => setProperty_title(e.target.value)}/>
                    </div>

                    <div id='purpose-div' className='add-property-form-inner-divs'>
                        <label htmlFor="purpose">Purpose</label>
                        <input type="text" id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)}/>
                    </div>
                </div>

                <div className='add-property-form-inner-divs' id='property-description-div'>
                    <label htmlFor="property-description">Property Description</label>
                    <input type="text" id="property-description" value={property_description} onChange={(e) => setProperty_description(e.target.value)}/>
                </div>

                <div id='flex-display'>
                    <div id='flex-display-first-div'>
                        <div id='bed-bath-area-div'>
                            <div className='add-property-form-inner-divs'>
                                <label htmlFor="bedrooms">Bedrooms</label>
                                <input type="number" id="bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}/>
                            </div>

                            <div className='add-property-form-inner-divs'>
                                <label htmlFor="bathrooms">Bathrooms</label>
                                <input type="number" id="bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}/>
                            </div>

                            <div className='add-property-form-inner-divs'>
                                <label htmlFor="area">Area</label>
                                <input type="number" id="area" value={area} onChange={(e) => setArea(e.target.value)}/>
                            </div>

                            <div id='builder-name-div' className='add-property-form-inner-divs'>
                                <label htmlFor="builder-name">Builder name</label>
                                <input type="text" id="builder-name" value={builder_name} onChange={(e) => setBuilder_name(e.target.value)}/>
                            </div>
                        </div>

                        <div id='price-installment-div'>
                            <div id='location-name-div' className='add-property-form-inner-divs'>
                                <label htmlFor="location-name">Location name</label>
                                <input type="text" id="location-name" value={location_name} onChange={(e) => setLocation_name(e.target.value)}/>
                            </div>

                            <div id='price-div' className='add-property-form-inner-divs'>
                                <label htmlFor="price">Price</label>
                                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                            </div>

                            <div id='on-installment-div' className='add-property-form-inner-divs'>
                                <label htmlFor="on-installment">On Installment</label>
                                <input type="number" id="on-installment" value={on_installment} onChange={(e) => setOn_installment(e.target.value)}/>
                            </div>

                            <div id='installment_rate-div' className='add-property-form-inner-divs'>
                                <label htmlFor="installment_rate">Installment Rate</label>
                                <input type="number" id="installment_rate" value={installment_rate} onChange={(e) => setInstallment_rate(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    <div id='property-subtype-id-div flex-display-first-div' className='add-property-form-inner-divs'>
                        <label htmlFor="property-subtype-id">Property subtype</label>
                        <input type="number" id="property-subtype-id" value={property_subtype_id} onChange={(e) => setProperty_subtype_id(e.target.value)}/>
                    </div>
                </div>

                {/* <div className='add-property-form-inner-divs'>
                    <label htmlFor="property-history">Property history</label>
                    <input type="text" id="property-history" value={property_history} onChange={(e) => setproperty_history(e.target.value)}/>
                </div>

                <div className='add-property-form-inner-divs'>
                    <label htmlFor="longitude">Longitude</label>
                    <input type="number" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
                </div>

                <div className='add-property-form-inner-divs'>
                    <label htmlFor="latitude">Latitude</label>
                    <input type="number" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
                </div> */}

                <button id='add-property-btn' type='submit'>Add</button>
            </div>
        </form>
    </div>
  )
}