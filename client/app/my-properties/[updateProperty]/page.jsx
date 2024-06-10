"use client"

import React, { useEffect, useState } from 'react';
import './add-property.css';
import { apiReq, apiReqByUserAndProperty } from '../../utils/fetch';
import Header from '../../components/Header/Header';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function AddUpdatePropertyForm({ params }) {
    const router = useRouter();
    const [purpose, setPurpose] = useState("");
    const [price, setPrice] = useState(0);
    const [on_installment, setOn_installment] = useState(0);
    const [installment_rate, setInstallment_rate] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [area, setArea] = useState(0);
    const [property_title, setProperty_title] = useState("");
    const [date_listed, setDate_listed] = useState("");
    const [property_description, setProperty_description] = useState("");
    const [property_history, setproperty_history] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [user_id, setUser_id] = useState("");
    const [builder_name, setBuilder_name] = useState("");
    const [location_name, setLocation_name] = useState("DHA Phase 6");
    const [property_subtype_id, setProperty_subtype_id] = useState(1);
    const [property_images, setproperty_images] = useState([]);
    const [image1, setImage1] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [fetchedLocations, setFetchedLocations] = useState([]);
    const [userPropertyDetails, setUserPropertyDetails] = useState(null);

    useEffect(() => {
        const fetchAllLocations = async () => {
            try {
                const res = await apiReq(8000, 'terra.property-service/get.allLocations', null, 'GET', null);
                const result = await res.json();
                if (!result) {
                    toast.error("Cannot fetch locations");
                }
                setFetchedLocations(result.response);
            } catch (error) {
                toast.error("Cannot fetch locations");
            }
        };
        fetchAllLocations();
    }, []);

    useEffect(() => {
        const fetchUserPropertyDetails = async () => {
            try {
                const propertyToUpdate = params.updateProperty;
                const res = await apiReq(8000, 'terra.property-service/get.property', propertyToUpdate, 'GET', null);
                const result = await res.json();
                setUserPropertyDetails(result.response[0]);
            } catch (error) {
                toast.error("Error getting your property. Try reloading");
            }
        };
        fetchUserPropertyDetails();
    }, [params.updateProperty]);

    useEffect(() => {
        if (userPropertyDetails) {
            console.log(userPropertyDetails);
            setPurpose(userPropertyDetails.purpose);
            setPrice(userPropertyDetails.price);
            setOn_installment(userPropertyDetails.on_installment);
            setInstallment_rate(userPropertyDetails.installment_rate);
            setBedrooms(userPropertyDetails.bedrooms);
            setBathrooms(userPropertyDetails.bathrooms);
            setArea(userPropertyDetails.area);
            setProperty_title(userPropertyDetails.property_title);
            setDate_listed(new Date().toISOString().slice(0, 10));
            setProperty_description(userPropertyDetails.property_description);
            setproperty_history(userPropertyDetails.property_history);
            setLongitude(userPropertyDetails.longitude);
            setLatitude(userPropertyDetails.latitude);
            setUser_id(userPropertyDetails.user_id);
            setBuilder_name(userPropertyDetails.builder_name);
            setLocation_name(userPropertyDetails.location_name);
            setProperty_subtype_id(userPropertyDetails.property_subtype_id);

            setproperty_images(userPropertyDetails.property_images || []);
        }
    }, [userPropertyDetails]);

    const handleFileChange = (e, setImage) => {
        const file = e.target.files[0];
        if (!file) {
            setImage1(property_images[0] || null);
        } else {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uid = localStorage.getItem("user_id");
        setUser_id(uid);
    
        const currDate = new Date().toISOString().slice(0, 10);
        setDate_listed(currDate);
    
        if (price <= 0 || bedrooms <= 0 || bathrooms <= 0 || area <= 0) {
            toast.error("Please enter valid details");
            return;
        }
    
        if (!image1) {
            try {
                const propertyToUpdate = params.updateProperty;
                const res = await apiReqByUserAndProperty(
                    8000,
                    'terra.property-service/update.property',
                    user_id,
                    propertyToUpdate,
                    'PUT',
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
                        property_images: JSON.stringify(property_images),
                        longitude,
                        latitude,
                        user_id: uid,
                        builder_name,
                        location_name,
                        property_subtype_id
                    }
                );
    
                const result = await res.json();
    
                if (res.status === 200) {
                    toast.success("Property updated successfully");
                    router.push('/my-properties');
                } else {
                    toast.error("Error updating the property");
                }
            } catch (error) {
                toast.error("Error updating the property");
            }
            return;
        }
    
        const images = [image1];
        const base64Images = await Promise.all(images.map(img => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
        })));
    
        try {
            const response = await fetch('/api/propertyImageUpdate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ base64Images, user_id: uid })
            });
    
            if (!response.ok) {
                throw new Error('Image upload failed');
            } else {
                const data = await response.json();
                const { imagePaths } = data;
    
                try {
                    const propertyToUpdate = params.updateProperty;
                    const res = await apiReqByUserAndProperty(
                        8000,
                        'terra.property-service/update.property',
                        user_id,
                        propertyToUpdate,
                        'PUT',
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
                            property_images: JSON.stringify(imagePaths),
                            longitude,
                            latitude,
                            user_id: uid,
                            builder_name,
                            location_name,
                            property_subtype_id
                        }
                    );
    
                    const result = await res.json();
    
                    if (res.status === 200) {
                        toast.success("Property updated successfully");
                        router.push('/my-properties');
                    } else {
                        toast.error("Error updating the property");
                    }
                } catch (error) {
                    toast.error("Error updating the property");
                }
            }
        } catch (error) {
            toast.error('Image upload failed');
        }
    };
    

    const handleToggleInstallment = () => {
        setOn_installment(prev => prev === 0 ? 1 : 0);
        if (on_installment === 1) {
            setInstallment_rate(0);
        }
    };

    return (
        <div id='add-property-main-pg'>
            <Header />
            <h3 id='add-property-main-head'><u>Update Property Listing</u></h3>
            <form id='add-property-form' onSubmit={handleSubmit}>
                <div id='add-property-form-main-div'>
                    <div id='add-p-title-purpose-div'>
                        <div id='property-title-div' className='add-property-form-inner-divs'>
                            <label htmlFor="property-title">Property Title</label>
                            <input required type="text" id="property-title" value={property_title} onChange={(e) => setProperty_title(e.target.value)} />
                        </div>
                        <div id='purpose-div' className='add-property-form-inner-divs'>
                            <label htmlFor="purpose">Purpose</label>
                            <select required id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                                <option value="For rent">For Rent</option>
                                <option value="For sale">For Sale</option>
                            </select>
                        </div>
                    </div>
                    <div className='add-property-form-inner-divs' id='property-description-div'>
                        <label htmlFor="property-description">Property Description</label>
                        <input required type="text" id="property-description" value={property_description} onChange={(e) => setProperty_description(e.target.value)} />
                    </div>
                    <div id='flex-display'>
                        <div id='flex-display-first-div'>
                            <div id='bed-bath-area-div'>
                                <div className='add-property-form-inner-divs'>
                                    <label htmlFor="bedrooms">Bedrooms</label>
                                    <input required type="number" id="bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
                                </div>
                                <div className='add-property-form-inner-divs'>
                                    <label htmlFor="bathrooms">Bathrooms</label>
                                    <input required type="number" id="bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
                                </div>
                                <div className='add-property-form-inner-divs'>
                                    <label htmlFor="area">Area</label>
                                    <input required type="number" id="area" value={area} onChange={(e) => setArea(e.target.value)} />
                                </div>
                                <div id='builder-name-div' className='add-property-form-inner-divs'>
                                    <label htmlFor="builder-name">Builder name</label>
                                    <input required type="text" id="builder-name" value={builder_name} onChange={(e) => setBuilder_name(e.target.value)} />
                                </div>
                            </div>
                            <div id='price-installment-location-div'>
                                <div className='add-property-form-inner-divs'>
                                    <label htmlFor="price">Price</label>
                                    <input required type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className='add-property-form-inner-divs'>
                                    <label htmlFor="on_installment">On Installment</label>
                                    <button type="button" id="on_installment" onClick={handleToggleInstallment}>
                                        {on_installment === 1 ? "Yes" : "No"}
                                    </button>
                                </div>
                                <div className='add-property-form-inner-divs'>
                                    <label htmlFor="installment_rate">Installment Rate</label>
                                    <input required type="number" id="installment_rate" value={installment_rate} onChange={(e) => setInstallment_rate(e.target.value)} disabled={on_installment === 0} />
                                </div>
                                <div id='location-name-div' className='add-property-form-inner-divs'>
                                    <label htmlFor="location-name">Location name</label>
                                    <select required id="location-name" value={location_name} onChange={(e) => setLocation_name(e.target.value)}>
                                        {fetchedLocations.length ? fetchedLocations.map((loc) => (
                                            <option key={loc.location_id} value={loc.location_name}>{loc.location_name}</option>
                                        )) : <option value="DHA Phase 6">DHA Phase 6</option>}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id='flex-display-second-div'>
                            <div className='add-property-form-inner-divs' id='p-images-main-div'>
                                <label id='p-images-lbl'>Property Image</label>

                                {property_images && property_images.length > 0 ? (
                                    <div className="image-preview">
                                        <img src={property_images[0]} alt="Property" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} />
                                    </div>
                                ) : (
                                    <p>No image available</p>
                                )}

                                <div id='p-images-div'>
                                    <input required type="file" id="image1" accept="image/*" onChange={(e) => handleFileChange(e, setImage1)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button id='add-property-btn' disabled={isDisabled}>Update Property</button>
                </div>
            </form>
        </div>
    );
}
