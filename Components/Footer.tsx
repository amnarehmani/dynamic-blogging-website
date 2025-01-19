import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
      <footer className="text-gray-600 body-font border-t">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          
          <Link href="/" className="flex title-font font-medium items-center text-gray-900">
            <span className="ml-3 text-2xl text-black font-extrabold">BlogVerse.</span>
          </Link>
          
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2025 BlogVerse — 
            <Link
              href="https://linkedin.com/in/amna-rehmani-59aa912a7"
              className="text-gray-600 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @amnarehmani
            </Link>
          </p>

        
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <FaFacebookF size={20} />
            </Link>
            <Link href="#" className="ml-3 text-gray-500 hover:text-gray-900">
              <FaTwitter size={20} />
            </Link>
            <Link href="#" className="ml-3 text-gray-500 hover:text-gray-900">
              <FaGithub size={20} />
            </Link>
            <Link href="#" className="ml-3 text-gray-500 hover:text-gray-900">
              <FaLinkedinIn size={20} />
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;