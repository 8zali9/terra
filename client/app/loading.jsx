"use client"

import React, { useEffect } from 'react'
import { GoDotFill } from "react-icons/go";
import './loading.css'

export default function loading() {
    useEffect(() => {
        const applyId = () => {
            const element = document.getElementById('loading-inner-div');
            setTimeout(() => {
                element.classList.add("active-loading-div")
            }, 500);
        }
        applyId()
    })
  return (
    <div id="loading-page">
        <div id='loading-inner-div'>
            <p id='loading-head'>TERRA</p>
            <GoDotFill color="rgba(255, 94, 0, 0.863)" />
        </div>
    </div>
  )
}
