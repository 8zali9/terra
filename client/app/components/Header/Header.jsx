"use client"

import "./header.css";
import React, { useContext } from 'react'
import { FaBars } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoPlayBack } from "react-icons/io5";
import { ToggleContext } from '../../contextProviders/ToggleContextProvider'
import Link from "next/link";

export default function Header() {
  const { sidebarToggle, handleSidebarToggle } = useContext(ToggleContext)

  return (
    <div id='header'>
      <div className="header-logo-sidebar">
        {/* {
          <div
            onClick={handleSidebarToggle}
            className={`sidebar-icon ${sidebarToggle ? "sidebar-active" : ""}`}
          >
            {sidebarToggle ? <FaBars /> : <IoPlayBack />}
          </div>
        } */}
        <div className="header-logo">
          <p className='header-logo-name'>TERRA</p>
          <GoDotFill color="rgba(255, 94, 0, 0.863)" />
        </div>
      </div>

      <div id='header-links'>
        <Link href="/" className="header-link">Home</Link>
        <p className="header-link">About</p>
        <Link href='/contact' className="header-link">Contacts</Link>
        <Link href='/new-projects' className="header-link">New Projects</Link>
      </div>

      <div id="header-signs-property-div">
        <div className="user-icon signin-header-btn">
          <Link href="/signin" className="header-signin-btn">Signin</Link>
        </div>
        {/* <Link href="/add-property" className="header-add-property-btn">
          Add property
        </Link> */}
      </div>
    </div>
  )
}