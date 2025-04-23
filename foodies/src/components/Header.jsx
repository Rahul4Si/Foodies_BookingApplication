import React from 'react';
import ChefPhoto from '../assets/Chef.jpg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
  return (
    <header className="relative bg-cover py-20 px-10 w-full">
      {/* Image on top with absolute positioning */}
      <img
        src={ChefPhoto}
        alt="chef_logo"
        className=" hidden lg:block absolute -bottom-20 right-0 transform -translate-x-1/2 -translate-y-1/2 w-48 md:w-80 z-20"
      />

      {/* Content box */}
      <div className="bg-gray-100 mx-3 p-10 relative z-10">
        <h1 className="text-2xl md:text-5xl font-bold mb-4">
          Order Your Favourite Food Here
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-400">
          Discover the best food and drinks in Bengaluru. Satisfy your cravings with just a few clicks!
        </p>
        <button onClick={()=> navigate('/explore-food')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg text-lg">
          Explore
        </button>
      </div>
    </header>
  );
};

export default Header;