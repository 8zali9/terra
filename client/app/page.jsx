"use client";

import Header from './components/Header/Header';
// import React, { useEffect, useState } from 'react'
import First from './components/Homepage/first/First'
import Second from './components/Homepage/second/Second';

export default function page() {
  // const [res, setRes] = useState("hello")

  // useEffect(() => {
  //   async function run() {
  //     const response = await fetch('http://localhost:5000/api/any-resource/', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       const data = await response.json();
  //       setRes(data.hello);
  //     }

  //     run()
  // }, [])

  return (
    <>
      <Header />
      <main className='main-page'>
        <First />
        <Second />
        {/* <div className='div'>
        {res}
        </div> */}
      </main>
    </>
  )
}
