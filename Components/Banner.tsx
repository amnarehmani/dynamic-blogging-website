"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import blogOne from "@/public/images/blogOne.avif";
import blogTwo from "@/public/images/blogTwo.avif";
import blogThree from "@/public/images/blogThree.avif";
import blogFour from "@/public/images/blogFour.jpg";
import blogFive from "@/public/images/blogFive.jpg";

// Arrow Component Props Interface
interface ArrowProps {
  onClick: () => void;
  direction: "next" | "prev";
}

const Arrow: React.FC<ArrowProps> = ({ onClick, direction }) => {
  const Icon = direction === "next" ? FaChevronRight : FaChevronLeft;
  const label = direction === "next" ? "next" : "previous";

  return (
    <div
      className={`w-10 h-10 md:w-12 md:h-12 absolute bottom-4 z-30 ${direction === "next" ? 'right-4 md:right-8' : 'left-4 md:left-8'} border-[1px] border-gray-900 px-2 hover:border-gray-800 bg-black/50 hover:bg-black shadow-btnShadow overflow-hidden rounded-full`}
      onClick={onClick}
    >
      <div className="w-full h-full text-gray-300 text-sm uppercase relative flex items-center justify-center cursor-pointer group">
        <span className="text-xl md:text-2xl">
          <Icon />
        </span>
        <span className="absolute translate-x-24 translate-y-0 group-hover:-translate-y-7 transition-transform duration-500">
        
        </span>
        <span className="absolute translate-x-24 translate-y-7 group-hover:translate-y-0 transition-transform duration-500">
          
        </span>
      </div>
    </div>
  );
};

const Banner: React.FC = () => {
  const images = [blogOne, blogTwo, blogThree, blogFour, blogFive];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const parallaxEffect = () => {
    if (scrollRef.current) {
      const scrollPosition = window.scrollY;
      const opacityValue = Math.max(0, 1 - scrollPosition / 500); // Adjust opacity as you scroll down
      scrollRef.current.style.transform = `translateY(${scrollPosition * 0.3}px)`; // Parallax effect
      scrollRef.current.style.opacity = opacityValue.toString(); // Opacity effect
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", parallaxEffect);
    return () => window.removeEventListener("scroll", parallaxEffect);
  }, []);

  return (
    <div className="w-full h-[50vh] sm:h-[60vh] md:h-[550px] relative overflow-hidden">
      <div ref={scrollRef} className="absolute inset-0 w-full h-full">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              layout="fill"
              objectFit="cover"
              className="z-0"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay for darkening the background */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Heading and Subheading */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Discover the Latest Trends in the World of Blogging
        </h2>
        
        {/* Explore Blogs Button */}
        <button className="mt-3 sm:mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 text-xs sm:text-sm">
          Explore Blogs
        </button>
      </div>

      {/* Navigation Buttons */}
      <Arrow direction="prev" onClick={handlePrev} />
      <Arrow direction="next" onClick={handleNext} />

      {/* Dots Navigation */}
      <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-center gap-1 sm:gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-500 hover:bg-gray-300"}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
