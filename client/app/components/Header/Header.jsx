"use client"

import "./header.css";
import React, { useContext, useEffect, useState } from 'react'
import { FaBars } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { IoPlayBack } from "react-icons/io5";
import { ToggleContext } from '../../contextProviders/ToggleContextProvider'
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { apiReq } from "../../utils/fetch";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { io } from "socket.io-client";

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()

  const { 
    sidebarToggle, 
    handleSidebarToggle,
    headerLinkToggle,
    profileDropDownToggle,
    handleHeaderLinkToggle,
    handleProfileDropDownToggle
  } = useContext(ToggleContext)
  const [user_id, setUser_id] = useState(null)
  const [first_name, setF_name] = useState(null)
  const [last_name, setL_name] = useState(null)

  useEffect(() => {
    try {
      const uid = localStorage.getItem("user_id")
      const fname = localStorage.getItem("first_name")
      const lname = localStorage.getItem("last_name")
      
      setUser_id(uid)
      setF_name(fname[0])
      setL_name(lname[0])
      const user_id = localStorage.getItem("user_id");
    const socket = io("http://localhost:8000",{
      auth: {
        token: user_id,
      },
    });
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on('onlineUsers', (data) => {
      console.log(data)
    })
    
    socket.on('newNotification', ({sender_id}) => {
      router.push(`/chat/${sender_id}`)
    })
    
    
    
    
  }
     catch (error) {
      console.log(error)
    }
  }, [])

  const handleSignout = async () => {
    const res = await apiReq(8000, 'signout', null, 'POST', null)
    localStorage.removeItem("user_id")
    localStorage.removeItem("first_name")
    localStorage.removeItem("last_name")
  }

  const handleSignoutClick = (e) => {
    e.preventDefault()

    handleSignout()
    handleProfileDropDownToggle()
    router.push('/')
  }

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
        <Link onClick={() => handleHeaderLinkToggle("home")} href="/" className={`header-link ${headerLinkToggle === "home" ? 'active' : ''}`}>Home</Link>
        <Link onClick={() => handleHeaderLinkToggle("contacts")} href='/contact' className={`header-link ${headerLinkToggle === "contacts" ? 'active' : ''}`}>Contacts</Link>
        <Link onClick={() => handleHeaderLinkToggle("new-projects")} href='/new-projects' className={`header-link ${headerLinkToggle === "new-projects" ? 'active' : ''}`}>New Projects</Link>
      </div>

      <div className="user-icon signin-header-btn">
        {
          user_id ?
            <div onClick={handleProfileDropDownToggle} id="profile-logged-in">
              <p id="profile-logged-in-name">{first_name}{last_name}</p>
              {
                profileDropDownToggle ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />
              }
            </div>
          : 
            <Link href="/signin" className="header-signin-btn">Signin</Link>
        }
      </div>

      {
        profileDropDownToggle &&
        <div id="profile-drop-down">
          <div id='profile-drop-down-div'>
            <Link onClick={handleProfileDropDownToggle} id="drop-down-profile-btn" href='/profile'>My Profile</Link>
            <Link onClick={handleProfileDropDownToggle} id="drop-down-properties-btn" href='/my-properties'>My Properties</Link>
            <hr height='1px' width='90%' color="lightgray" />
            <div onClick={handleSignoutClick} id="drop-down-logout-btn">Logout</div>
          </div>
        </div>
      }
    </div>
  )
}
