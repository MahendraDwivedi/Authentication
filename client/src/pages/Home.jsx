import React from 'react'
import Navbar from '../components/Navbar'
import Headers from '../components/Header'
function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-no-repeat bg-center'>
      <Navbar/>
      <Headers/>
    </div>
  )
}

export default Home
