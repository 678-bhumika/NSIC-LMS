import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-blue-500 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-6 border-b border-white/30">
        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo} alt="logo" />
          </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Want to know more ? <br/>Click here for additional information :</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li><a href="https://www.nsic.co.in" target="_blank" rel="noopener noreferrer">Home</a></li>
            <li><a href="https://www.nsic.co.in/Corporate/AboutUs" target="_blank" rel="noopener noreferrer">About us</a></li>
            <li><a href="https://www.nsic.co.in/Corporate/ContactUs" target="_blank" rel="noopener noreferrer">Contact us</a></li>
            <li><a href="https://www.nsic.co.in/Info/PrivacyPolicies" target="_blank" rel="noopener noreferrer">Privacy policy</a></li>
          </ul>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-white/60">Copyright 2025 @ The National Small Industries Corporation. All Right Reserved.</p>
    </footer>
  )
}

export default Footer
