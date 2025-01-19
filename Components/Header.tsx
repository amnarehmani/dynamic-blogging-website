"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <header className="text-gray-600 body-font border-b">
        <div className="container mx-auto flex justify-between items-center p-5">
    
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-extrabold text-black">BlogVerse.</span>
          </Link>

          <nav className="hidden md:flex space-x-6 text-base">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/about" className="hover:text-blue-600">About</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </nav>

        
          <button
            onClick={toggleSidebar}
            className="md:hidden text-2xl text-gray-600 focus:outline-none"
          >
            <FaBars />
          </button>
        </div>
      </header>

      
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg w-64 z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-5 flex flex-col space-y-4">
          <button
            onClick={toggleSidebar}
            className="self-end text-2xl text-gray-600 focus:outline-none"
          >
            <AiOutlineClose />
          </button>
          <Link href="/" className="hover:text-blue-600 text-lg" onClick={toggleSidebar}>
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-600 text-lg" onClick={toggleSidebar}>
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 text-lg" onClick={toggleSidebar}>
            Contact
          </Link>
        </div>
      </div>

      
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}
    </div>
  );
};

export default Header;
