"use client";

import { apiReq } from '../utils/fetch';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../components/Header/Header';
import './profile.css'

export default function page() {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [password, setPassword] = useState("");
    const [user_profile_image, setUser_profile_image] = useState("");
    const [userDetails, setUserDetails] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [image, setImage] = useState(null);

    const [a, setA] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user_id = localStorage.getItem("user_id");
                if (!user_id) {
                    router.push("/signin");
                    throw new Error("Cookie settings lost, try signing in again");
                }

                const res = await apiReq(8000, 'terra.user-service/get.user', user_id, 'GET', null);
                const data = await res.json();

                if (res.status === 200) {
                    setUserDetails(data.response);
                } else {
                    toast.error(data.error);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchUser();
    }, [a]);

    useEffect(() => {
        console.log("this .........")
        if (userDetails) {
            setUser_profile_image(userDetails.user_profile_image);
            setFirst_name(userDetails.first_name);
            setLast_name(userDetails.last_name);
            setEmail(userDetails.email);
            setPhone_number(userDetails.phone_number);
        }
    }, [userDetails]);

    useEffect(() => {
        setIsDisabled(
            userDetails &&
            userDetails.first_name === first_name &&
            userDetails.last_name === last_name &&
            userDetails.email === email &&
            userDetails.phone_number === phone_number &&
            userDetails.user_profile_image === user_profile_image &&
            !image
        );
    }, [first_name, last_name, email, phone_number, user_profile_image, image, userDetails]);
    
    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);

        console.log("file", file)
    };

    const handleUserUpdate = async (event) => {
        event.preventDefault();

        const user_id = localStorage.getItem("user_id");

        const updateUserDetails = async (imagePath) => {
            try {
                const res = await apiReq(
                    8000,
                    'terra.user-service/update.user',
                    user_id,
                    'PUT',
                    {
                        first_name,
                        last_name,
                        email,
                        password,
                        phone_number,
                        user_profile_image: imagePath || user_profile_image
                    }
                );

                if (res.status === 200) {
                    toast.success("Profile updated");
                    setA(true)
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                } else {
                    toast.error("Error updating your details");
                }
            } catch (error) {
                toast.error("Error updating your details");
            }
        };

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
                    } else {
                        const data = await response.json();
                        const newImagePath = data.imagePath;
                        setUser_profile_image(newImagePath);
                        updateUserDetails(newImagePath);
                    }
                };
            } catch (error) {
                toast.error('Image upload failed');
            }
        } else {
            updateUserDetails();
        }
    };

    return (
        <div className='h-screen'>
            <Header />
            <div className='bg-[#D6EBE4] h-[25%] text-center mx-auto w-full'></div>
            <div className='h-[40%]'></div>
            <div className='bg-[#D6EBE4] h-[30%] text-center mx-auto w-full'></div>
            <div className='absolute mt-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 p-8 z-10 shadow-md text-center items-center w-[60%] border-2 bg-white rounded-lg'>
                {
                    userDetails &&
                    <h1 className='font-semibold text-3xl p-4'>{userDetails.first_name} {userDetails.last_name}'s Profile</h1>
                }
                <div className='flex'>
                    <div className='align-middle pl-10 w-[30%]'>
                        {
                            user_profile_image ? (
                                <div className='w-[12rem] h-[12rem] rounded-[50%]'>
                                    <img
                                    id='profile-present-img'
                                    className='rounded-[50%] object-cover overflow-hidden'
                                    src={user_profile_image}
                                    alt='profile'
                                    />
                                </div>
                            ) : (
                                <img src='./icons/profile-avatar.png' alt="profile" width='200px' height='300px' />
                            )
                        }
                        <input
                            className='mt-6'
                            type="file"
                            name='file'
                            accept="image/*"
                            onChange={handleImageFileChange}
                        />
                    </div>
                    <div className='w-[70%]'>
                        <form onSubmit={handleUserUpdate} className='space-y-3'>
                            {
                                userDetails && (
                                    <div className='space-y-3'>
                                        <label htmlFor="firstName" className='font-semibold mr-3'>First Name:</label>
                                        <input
                                            name="firstName"
                                            type="text"
                                            required
                                            className="relative mx-auto w-[50%] h-[40px] rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                            placeholder="Your First Name"
                                            onChange={(e) => setFirst_name(e.target.value)}
                                            value={first_name}
                                        /> <br />
                                        <label htmlFor="lastName" className='font-semibold mr-3'>Last Name:</label>
                                        <input
                                            name="lastName"
                                            type="text"
                                            required
                                            className="relative mx-auto w-[50%] h-[40px] rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                            placeholder="Your Last Name"
                                            onChange={(e) => setLast_name(e.target.value)}
                                            value={last_name}
                                        /> <br />
                                        <label htmlFor="email" className='font-semibold mr-3 p-4'>Email:</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            className="relative mx-auto w-[50%] h-[40px] rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                            placeholder="Your Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                        /> <br />
                                        <label htmlFor="password" className='font-semibold mr-3 p-1'>Password:</label>
                                        <input
                                            name="password"
                                            type="password"
                                            className="relative mx-auto w-[50%] h-[40px] rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                            placeholder="Edit your password..."
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                        /> <br />
                                        <label htmlFor="contact" className='font-semibold mr-3 p-2'>Contact:</label>
                                        <input
                                            name="contact"
                                            type="number"
                                            required
                                            className="relative mx-auto w-[50%] h-[40px] rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                            placeholder="Your Contact Number"
                                            onChange={(e) => setPhone_number(e.target.value)}
                                            value={phone_number}
                                        /> <br />
                                    </div>
                                )
                            }
                            <button
                                type="submit"
                                disabled={isDisabled}
                                className="mt-10 flex w-[150px] mx-auto justify-center rounded-md bg-[#ED6755] py-3 px-3 text-sm font-semibold text-white hover:bg-[#d0796d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
