import React from 'react'

export default function User() {
    return (
        <div className=' h-screen'>
            <div className=' bg-[#D6EBE4] h-[25%] text-center mx-auto w-full'>
                <div className='  font-extrabold pt-2 text-7xl '>
                    TERRA
                    <p className='font-extrabold text-[85px] inline-block mx-auto text-[#ED6755]'>.</p>
                </div>
            </div>

            <div className='h-[50%]'>
            
            </div>



            <div className=' bg-[#D6EBE4] h-[25%] text-center mx-auto w-full'>

            </div>




            <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 p-8 z-10 shadow-md text-center items-center  w-[60%] broder-2 bg-white rounded-lg '>
                    <h1 className=' font-semibold text-3xl p-4 '>Abdul Rafay's Profile</h1>
                    <div className='flex'>
                        <div className=' align-middle pl-10 w-[30%]'>
                            <img src='./icons/profile-avatar.png' alt="" width='200px' height='200px' srcset="" />
                        </div>

                        <div className='w-[70%] '>
                            <form action="#" className=' space-y-3'>
                                <div className=' space-y-3'>
                                    <label htmlFor="firstName" className=' font-semibold mr-3'>First Name:</label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        required
                                        className="relative mx-auto w-[50%] h-[40px]   rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                        placeholder="Your First Name"
                                    /> <br />
                                    <label htmlFor="lastName" className=' font-semibold mr-3'>Last Name:</label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        required
                                        className="relative  mx-auto w-[50%] h-[40px]  rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                        placeholder="Your Last Name"
                                    /> <br />
                                    <label htmlFor="email" className=' font-semibold mr-3 p-4'>Email:       </label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="relative   mx-auto w-[50%] h-[40px] rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                        placeholder="Your Email"
                                    /> <br />
                                    <label htmlFor="password" className=' font-semibold mr-3 p-1'>Password:</label>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        className="relative   mx-auto w-[50%] h-[40px] rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                        placeholder="Your Password"
                                    /> <br />
                                    <label htmlFor="contact" className=' font-semibold mr-3 p-2'>Contact:</label>
                                    <input
                                        name="contact"
                                        type="number"
                                        required
                                        className="relative   mx-auto w-[50%] h-[40px] rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                        placeholder="Your Contact Number"
                                    /> <br />
                                </div>
                                {/* Button */}
                                <button
                                    type="submit"
                                    className="mt-10 flex w-[150px] mx-auto justify-center rounded-md bg-[#ED6755] py-3 px-3 text-sm font-semibold text-white hover:bg-[#d0796d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                                >
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">

                                    </span>
                                    Save
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
        </div>
    )
}