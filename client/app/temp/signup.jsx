import React from 'react'

export default function signup() {
  return (
    <div className=' flex h-screen'>
      <div className=' bg-[#D6EBE4] w-[60%] text-center'>
        <div className=' w-[40%] font-extrabold text-5xl ml-0 mb-16 mr-4 mt-2'>
          TERRA
        <p className='font-extrabold text-[85px] inline-block ml-4 text-[#ED6755]'>.</p>
        </div>
        <img src='./icons/sign-icon.png' alt="" width='500px' srcset="" />
      </div>
      {/* FORM */}
      <div className=' bg-white w-[40%] m-10 items-center mx-auto space-y-6 align-middle'>
        <h1 className=' font-bold text-2xl text-[#ED6755] mx-auto text-center'>Sign Up For An Account</h1>
        <form action="#" className='space-y-6 mb-3'>
          <div className=' space-y-6'>
            <input
              name="firstName"
              type="text"
              required
              className="relative mx-auto w-[80%] h-[50px] block  rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
              placeholder="Your First Name"
            />
            <input
              name="lastName"
              type="text"
              required
              className="relative  mx-auto w-[80%] h-[50px] block rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
              placeholder="Your Last Name"
            />
            <input
              name="email"
              type="email"
              required
              className="relative block  mx-auto w-[80%] h-[50px] rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
              placeholder="Your Email"
            />
            <input
              name="password"
              type="password"
              required
              className="relative block  mx-auto w-[80%] h-[50px] rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
              placeholder="Your Password"
            />
            <input
              name="contact"
              type="number"
              required
              className="relative block  mx-auto w-[80%] h-[50px] rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset outline-[#ED6755] ring-[#ED6755] placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Your Contact Number"
            />
          </div>
          {/* Button */}
          <button
            type="submit"
           
            className="group relative flex w-[150px] mx-auto justify-center rounded-md bg-[#ED6755] py-3 px-3 text-sm font-semibold text-white hover:bg-[#d0796d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"

          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">

            </span>
            Sign up
          </button>




        </form>

      <div class="border-t-2 w-[90%] mx-auto border-[#ED6755] my-8"></div>
       
        <div className='mx-auto text-center'>
          Already have an account? <a href="#" className=' text-[#ED6755]'>Sign In</a>
          
          <br />
         
        </div>

      </div>



    </div>
  )
}