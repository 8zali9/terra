"use client";

import React from 'react'
import First from './components/Homepage/first/First'
import Second from './components/Homepage/second/Second';

export default function page() {
  return (
    <main className='main-page'>
      <First />
      <Second />
    </main>
  )
}
