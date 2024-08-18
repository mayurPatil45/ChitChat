import React from 'react'
import "./index.css";
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <div>
      <div>
        <nav className='bg-gray-200 text-black'>
          <Navbar />
        </nav>

        <div className='min-h-screen max-w-6xl mx-auto p-3'>
          <Outlet />
        </div>

        <footer className='bg-black text-white'>
          <Footer />
        </footer>
      </div>


      <Toaster position="top-center" reverseOrder={false} />


    </div>
  )
}

export default App
