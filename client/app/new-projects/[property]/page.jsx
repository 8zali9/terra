"use client";

import { io } from "socket.io-client";
import React, { useEffect, useState } from 'react';
import { apiReq } from '../../utils/fetch';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Header from "@/app/components/Header/Header";

export default function Page({ params }) {
    const [propertyDetails, setPropertyDetails] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user_id, setUser_id] = useState("");

    useEffect(() => {
        setUser_id(localStorage.getItem('user_id'));

        const fetchPropertyDetails = async () => {
            try {
                const property_id = params.property;
                const res = await apiReq(8000, 'terra.property-service/get.property', property_id, 'GET', null);
                const result = await res.json();
                setPropertyDetails(result.response[0]);
            } catch (error) {
                toast.error(error.toString());
            }
        };

        const initializeSocket = () => {
            const userId = localStorage.getItem('user_id'); // Ensure this is the most recent value
            const socket = io("http://localhost:8000", {
                auth: {
                    token: userId,
                },
            });

            socket.on("connect", () => {
                console.log(socket.id); // x8WIv7-mJelg7on_ALbx
            });

            socket.on('onlineUsers', (data) => {
                setOnlineUsers(data);
            });
        };

        setLoading(true);
        fetchPropertyDetails();
        initializeSocket();
        setLoading(false);
    }, [params.property]); // Ensure to re-run effect when params.property changes

    const copyToClipboard = async (phone_number) => {
        try {
            await navigator.clipboard.writeText(phone_number);
            toast.dark('Copied');
        } catch (err) {
            toast.info('Cannot copy.');
        }
    };

    return (
        <>
            <Header />
            <div className='m-10 mt-4 p-6 flex gap-16'>
                {/* left side */}
                {propertyDetails && (
                    <div className='w-[70%]'>
                        {/* <p>{propertyDetails.user_id} this {user_id}</p> */}
                        {/* picture and graphical */}
                        <div className=' w-full'>
                            <p className=' font-semibold mb-3'>{propertyDetails.property_title}</p>
                            <img className="rounded-lg w-[100%]" id='user-property-img' src={propertyDetails.property_images && propertyDetails.property_images[0] ? propertyDetails.property_images[0] : '/imgs/1.jpg'} alt="Property" />
                        </div>
                        <div className=' flex justify-between mt-8'>
                            {/* money and location */}
                            <div className=' space-y-4'>
                                <h1 className='font-semibold text-3xl'>RS. {propertyDetails.price}</h1>
                                <div className=' align-middle flex'>
                                    <img src='/icons/pin.png' width={30} alt="location"/>
                                    <p className='font-medium text-sm pt-1 '>KDA Officers Society, Karachi</p>
                                </div>
                            </div>
                            {/* room detail */}
                            <div className='flex gap-3 justify-between text-center items-center '>
                                {/* bed */}
                                <div>
                                    <img src='/icons/Bedroom-icon.png' width={30} alt="bedroom"/>
                                    <p>{propertyDetails.bedrooms} Beds</p>
                                </div>
                                {/* WC */}
                                <div>
                                    <img src='/icons/bathroom-icon.png' width={30} alt="bathroom"/>
                                    <p>{propertyDetails.bathrooms} Baths</p>
                                </div>
                                {/* area */}
                                <div className='text-center items-center'>
                                    <img src='/icons/area-icon.png' width={30} alt="area"/>
                                    <p>{propertyDetails.area} sq. yd.</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Description */}
                        <div className='border-[#ED6755]  rounded-lg border-2 mt-20 p-4'>
                            <h1 className=' font-semibold text-3xl mb-6'>Description</h1>
                            <div className=' text-gray-500 text-sm'>
                                <p>{propertyDetails.purpose}</p>
                                <p>{propertyDetails.property_description}</p>
                                <p>Date Listed: {propertyDetails.date_listed}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Right side */}
                {propertyDetails && (
                    <div className=' rounded-lg border-2 border-[#ED6755] w-[25%] p-4 font-semibold text-center h-[400px] mt-10'>
                        <p className=' font-semibold'>Posted By</p>
                        {/* username and pic */}
                        <div className=' my-3 mx-2 flex  mb-16'>
                            <img src='/icons/profile-avatar.png' width={70} alt="profile"/>
                            <div className=' ml-3 pt-4 font-semibold'>
                                <p className="mt-2">{propertyDetails.first_name} {propertyDetails.last_name}</p>
                            </div>
                        </div>
                        {/* Phone Number Button */}
                        <button
                            onClick={() => copyToClipboard(propertyDetails.phone_number)}
                            className="group relative flex w-[90%] gap-3 mx-auto justify-center mb-6 rounded-md bg-[#ED6755] py-3 px-3 text-sm font-semibold text-white hover:bg-[#d0796d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            <img src='/icons/call-icon.png' width={23} alt="call"/>
                            Copy Phone Number
                        </button>
                        OR
                        {/* CHAT Button */}
                        <button
                            className="group relative flex gap-3 w-[90%] mt-6 mx-auto justify-center mb-8 border-[#ED6755]  border-2 rounded-md bg-white py-3 px-3 text-sm font-semibold text-black hover:bg-[#d0796d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            <img src='/icons/chat-icon.png' width={23} alt="chat"/>
                            {onlineUsers.includes(propertyDetails.user_id) && propertyDetails.user_id !== user_id ? (
                                <Link id='property-owner-section-chat-btn' href={`/chat/${propertyDetails.user_id}`}>Have a Chat</Link>
                            ) : (
                                <div>Owner is not online</div>
                            )}
                        </button>
                    </div>
                )}
            </div>
            {propertyDetails && (
                <p className=" font-semibold text-center mb-2">&copy; Terra 2024 CSIT NEDUET</p>
            )}
        </>
    );
}
