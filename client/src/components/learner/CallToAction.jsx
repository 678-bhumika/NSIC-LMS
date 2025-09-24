import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
      <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">
        Learn anything, anytime, anywhere
      </h1>
      <p className="text-gray-500 sm:text-sm">
        Empowering learners and businesses with flexible, high-quality courses <br />
        designed to enhance skills, boost careers, and drive growth – all at your convenience.
      </p>
      <div className="flex items-center font-medium gap-6 mt-4">
        <Link to="/course-list">
          <button className="px-10 py-3 rounded-md text-white bg-blue-600">
            Get started
          </button>
        </Link>
      </div>
    </div>
  )
}

export default CallToAction
