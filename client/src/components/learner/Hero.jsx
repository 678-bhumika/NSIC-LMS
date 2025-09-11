import React from 'react'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70">

      <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto">Welcome to the official LMS website of NSIC !</h1>

      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
      A digital learning platform that provides entrepreneurs and MSMEs with structured training, expert guidance, and resources to drive growth and innovation.
      </p>

      <p className="md:hidden text-gray-500 max-w-sm mx-auto">
      A digital learning platform that provides entrepreneurs and MSMEs with structured training, expert guidance, and resources to drive growth and innovation.
      </p>

      <SearchBar/>

    </div>
  )
}

export default Hero
