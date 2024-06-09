"use client"

import React from 'react'
export default function PropertyDetail() {
    return (
        <div className='m-10 p-6 flex gap-16' >
            {/* left side */}
            <div className=' w-[70%]'>
                {/* picture and graphical */}
                <div className=' w-full'>
                    <p className=' font-semibold mb-3'>Beautiful house near xyz park. Located adjacent to masjid.</p>
                    <img src='./icons/house.png' alt="" srcset="" />
                </div>
                <div className=' flex justify-between mt-8'>
                    {/* money and location */}
                    <div className=' space-y-4'>
                        <h1 className='font-semibold text-3xl'>RS 12,00,000</h1>
                        <div className=' align-middle flex'>
                            <img src='./icons/pin.png' width={30} />
                            <p className='font-medium text-sm pt-1 '>KDA Officers Society, Karachi</p>
                        </div>
                    </div>
                    {/* room detail */}
                    <div className='flex gap-3 justify-between text-center items-center '>
                        {/* bed */}
                        <div>
                            <img src='./icons/Bedroom-icon.png' width={30} />
                            <p>4 Beds</p>
                        </div>
                        {/* WC */}
                        <div>
                            <img src='./icons/bathroom-icon.png' width={30} />
                            <p>4 Baths</p>
                        </div>
                        {/* area */}
                        <div className='text-center items-center'>
                            <img src='./icons/area-icon.png' width={30} />
                            <p>300 sq. yd.</p>
                        </div>
                    </div>
                </div>
                

                {/* Description */}
                <div className='border-[#ED6755]  rounded-lg border-2 mt-20 p-4'>
                    <h1 className=' font-semibold text-3xl mb-6'>Description</h1>
                    <div className=' text-gray-500 text-sm'>
                        <p>Exclusive Rental Listing By 'Mister Estate Holdings'</p><br />
                        <p>Property Type- Commercial Use Bungalow <br />Covered Area- 1000 Square Yards <br />Occupancy Status- Vacant <br />Neighborhood- KDA Scheme 1, District East, Karachi <br /> Nearby Localities and Landmarks- Karsaz, Naval Housing Scheme, Shahrah-e-Faisal, PECHS, Defence Officers Housing Scheme (DOHS), Army Officers Housing Scheme (AOHS), KDA Officers Society and National Stadium </p><br />
                        <p>Monthly Rent- PKR 900,000</p><br />
                        <p>Property Specifications
                            <ul className=' list-disc list-inside'>
                                <li>Carpeted area of 12,000 Sqft approximately</li>
                                <li> Upper level comprises of 8 rooms</li>
                                <li> Supplementary bathrooms built outside</li>
                                <li>Multiple entry points to enter the property</li>
                                <li> Situated on main Tipu Sultan Road off Karsaz </li>

                            </ul>
                        </p><br />
                        <p>For scheduling site visit, interested organizations having the said budget shall reserve their appointment at least a day in advance on the specified contact number during office hours. </p><br />
                    </div>

                </div>

            </div>

            {/* Right side */}
            <div className=' rounded-lg border-2 border-[#ED6755] w-[25%] p-4 font-semibold text-center h-[400px] mt-10'>
                <p className=' font-semibold'>Posted By</p>
                {/* username and pic */}
                <div className=' my-3 mx-2 flex  mb-16'>
                    <img src='./icons/profile-avatar.png' width={70} alt="" />
                    <div className=' ml-3 pt-4 font-semibold'>
                        <p>Abdul Rafay</p>
                        <a href="#" className=' underline'>See Profile {">"}</a>

                    </div>
                </div>
                {/* Phone Number Button */}
                <button
                    className="group relative flex w-[90%] gap-3 mx-auto justify-center mb-6 rounded-md bg-[#ED6755] py-3 px-3 text-sm font-semibold text-white hover:bg-[#d0796d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >

                    <img src='./icons/call-icon.png' width={23} />
                    Show Phone Number
                </button>
                OR
                {/* CHAT Button */}
                <button
                    className="group relative flex gap-3 w-[90%] mt-6 mx-auto justify-center mb-8 border-[#ED6755]  border-2 rounded-md bg-white py-3 px-3 text-sm font-semibold text-black hover:bg-[#d0796d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    <img src='./icons/chat-icon.png' width={23} />
                    Have A Chat
                </button>

            </div>
        </div>
    )
}