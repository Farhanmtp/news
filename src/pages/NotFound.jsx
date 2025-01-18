import React from 'react'
import SeeMore from '../components/SeeMore'

function NotFound() {
  return (
    <div className='pt-20'>
        <h1 className="text-title dark:text-white light:text-daygray mb-2">Page Not Found!</h1>
        
        <SeeMore button="Load More" text="Get more news based on your interests" />
    </div>
  )
}

export default NotFound