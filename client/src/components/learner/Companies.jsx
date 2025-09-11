import React from 'react'
import {assets} from '../../assets/assets'

const Companies = () => {
  return (
    <div className="pt-16">
      <p className="text-base text-gray-500">
        Trusted by learners from...
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5">
        <img src={assets.amul_logo} alt="Amul" className='w-20 md:w-28' />
        <img src={assets.khadi_logo} alt="Khadi India" className='w-20 md:w-28' />
        <img src={assets.lijjat_logo} alt="Lijjat Papad" className='w-20 md:w-28' />
        <img src={assets.coir_logo} alt="Coir Board" className='w-20 md:w-28' />
      </div>
    </div>
  )
}

export default Companies
