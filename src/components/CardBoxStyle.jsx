import React from 'react'
import { Link } from 'react-router-dom'

function NewsCard() {
  return (
    <Link>
        <div className="rounded-lg dark:bg-darkgray600 bg-white p-6 space-y-4 hover:shadow-xl transition-all">
            <div className='bg-cover bg-norepeat bg-center w-full h-[200px] rounded-lg' style={{backgroundImage:"url('https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg')"}}></div>

            <h2 
            className="dark:text-white text-heading font-medium leading-6">
                Babar Azam among nominees for ICC Mens T20I Cricketer of the Year
            </h2>

            <p className="text-regular dark:text-lightgray400">6 hours ago · Author</p>
        </div>
    </Link>
  )
}

export default NewsCard