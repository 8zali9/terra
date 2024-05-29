"use client"

import "./header.css";
import React, { useContext } from 'react'
import { FaBars } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoPlayBack } from "react-icons/io5";
import { ToggleContext } from '../../contextProviders/ToggleContextProvider'
import Link from "next/link";
import { usePathname  } from 'next/navigation'

export default function Header() {
  const path = usePathname()

  const { sidebarToggle, handleSidebarToggle } = useContext(ToggleContext)

  return (
    <div className='header'>
      <div className="header-logo-sidebar">
        {
          path == '/new-projects' &&
          <div
            onClick={handleSidebarToggle}
            className={`sidebar-icon ${sidebarToggle ? "sidebar-active" : ""}`}
          >
            {sidebarToggle ? <FaBars /> : <IoPlayBack />}
          </div>
        }
        <div className="header-logo">
          <p className='header-logo-name'>TERRA</p>
          <GoDotFill color="rgba(255, 94, 0, 0.863)" />
        </div>
      </div>

      <div className='header-links'>
        <Link href="/" className="header-link">Home <RiArrowDropDownLine /></Link>
        <p className="header-link">About <RiArrowDropDownLine /></p>
        <Link href='/contact' className="header-link">Contacts <RiArrowDropDownLine /></Link>
        <Link href='/new-projects' className="header-link">New Projects <RiArrowDropDownLine /></Link>
      </div>

      <div className="header-signs-property-div">
        <div className="header-signs-btn">
          <Link href="/signin" className="header-signin-btn">Signin</Link>
          <Link href="/signup" className="header-signup-btn">Signup</Link>
        </div>
        <Link href="/add-property" className="header-add-property-btn">
          Add property
        </Link>
      </div>
    </div>
  )
}