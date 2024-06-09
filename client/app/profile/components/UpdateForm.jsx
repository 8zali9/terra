import React, { useContext, useEffect, useState } from 'react';
import { apiReq } from '../../utils/fetch';
import { ProfileContext } from '../context/ContextProvider';
import { toast } from 'react-toastify';

export default function UpdateForm() {
    const {
        first_name, last_name, email, phone_number, password, user_profile_image, isDisabled,
        setFirst_name, setLast_name, setEmail, setPhone_number, setPassword, setUser_profile_image
    } = useContext(ProfileContext);

    const [image, setImage] = useState()

    const handleImageFileChange = async (event) => {
        const file = event.target.files[0];
        await setImage(file);
    };

    const handleUserUpdate = async (event) => {
        event.preventDefault();

        const user_id = localStorage.getItem("user_id");

        if (image) {
            try {
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onloadend = async () => {
                    const base64Image = reader.result.split(',')[1];

                    const response = await fetch('/api/userProfileUpload', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ base64Image, user_id })
                    });

                    if (!response.ok) {
                        throw new Error('Image upload failed');
                    }
                    toast.success('Image uploaded successfully');

                    try {
                        await setUser_profile_image(`https://k4terrastorage.blob.core.windows.net/terra-user-images/user-${user_id}/profile.jpeg`);
                        const res = await apiReq(
                            8000,
                            'terra.user-service/update.user',
                            user_id,
                            'PUT',
                            { first_name, last_name, email, password, phone_number, user_profile_image }
                        );
            
                        if (await(res.status) === 200) {
                            toast.success("Profile updated");
                            setTimeout(function() {
                                location.reload()
                            }, 2000);
                        } else {
                            toast.error("Error updating your details");
                        }
                    } catch (error) {
                        toast.error("Error updating your details");
                    }
                };
            } catch (error) {
                toast.error('Image upload failed');
            }
        }
    };

    return (
        <form onSubmit={handleUserUpdate} id='user-details'>
            <div id='left-details'>
                {
                    user_profile_image &&
                    <img
                        id='profile-img'
                        src={
                            typeof user_profile_image === 'string' ? user_profile_image : URL.createObjectURL(user_profile_image)
                        } alt='profile' />
                }
                <input
                    id='profile-input'
                    type="file"
                    name='file'
                    accept="image/*"
                    onChange={handleImageFileChange}
                />
            </div>

            <div id='right-details'>
                <div className='user-detail-segment'>
                    <h4 className='segment-heading'>First Name</h4>
                    <input
                        className='user-details-input'
                        type="text"
                        onChange={(e) => setFirst_name(e.target.value)}
                        value={first_name} />
                </div>

                <div className='user-detail-segment'>
                    <h4 className='segment-heading'>Last Name</h4> 
                    <input
                    className='user-details-input'
                    type="text"
                    onChange={(e) => setLast_name(e.target.value)}
                    value={last_name} />
                </div>

                <div className='user-detail-segment'>
                    <h4 className='segment-heading'>Email</h4> 
                    <input
                    className='user-details-input'
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
                </div>

                <div className='user-detail-segment'>
                    <h4 className='segment-heading'>phone_number</h4>
                    <input
                    className='user-details-input'
                    type="number"
                    onChange={(e) => setPhone_number(e.target.value)}
                    value={phone_number} />
                </div>

                <div className='user-detail-segment'>
                    <h4 className='segment-heading'>Password</h4> 
                    <input
                    className='user-details-input'
                    type="text"
                    placeholder='your new password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} />
                </div>

                <div id='user-details-btn'>
                    <button disabled={isDisabled} type='submit' className={`user-details-update-btn ${isDisabled ? 'disabled-upd-btn' : 'active-upd-btn'}`}>Save</button>
                </div>

            </div>

        </form>
    );
}