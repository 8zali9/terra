"use client";

import Header from '../components/Header/Header';
import First from '../components/Homepage/first/First'
import Second from '../components/Homepage/second/Second';
import './contact.css'

export default function page() {

  return (
    <>
      <Header />
      <main className='main-page'>
        <First />
        <Second />
      </main>
    </>
  )
}
