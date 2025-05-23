import React from 'react';
import { Link } from 'react-router-dom'; 

const ArtisanStartPage = () => {
  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* 4 Honeycombs - one per corner */}
      <img src="/assets/honeycomb.png" className="absolute top-[-100px] left-[-60px] w-48 rotate-[25deg] opacity-80" alt="Honeycomb" />
      <img src="/assets/honeycomb.png" className="absolute bottom-[-60px] left-[-100px] w-48 rotate-[-60deg] opacity-80" alt="Honeycomb" />
      <img src="/assets/honeycomb.png" className="absolute top-[-100px] right-[-60px] w-48 rotate-[-60deg] opacity-80" alt="Honeycomb" />
      <img src="/assets/honeycomb.png" className="absolute bottom-[-80px] right-[-100px] w-48 rotate-[25deg] opacity-80" alt="Honeycomb" />

      {/* Main content */}
      <div className="flex items-center justify-center h-full z-10">
        <div className="flex justify-center items-center gap-6 px-3 max-w-4xl">
          {/* Bee Image */}
          <div className="relative w-72">
            <img 
              src="/assets/bee.png" 
              alt="Cartoon bee with smartphone" 
              className="w-full h-auto"
            />
          </div>

          {/* Content box */}
          <div className="bg-amber-400 p-6 rounded-2xl shadow-md max-w-xs h-[280px] flex flex-col text-center">
            <h1 className="text-xl font-bold mb-4 text-black">Find and Know Local Artisans</h1>
            <p className="mb-2 text-xs text-black">Find The Best Artwork, Design For You made by Local Artisans in Region 4-A</p>

            <Link to="/login">
              <button className="bg-white text-black text-xs font-bold py-1 px-3 rounded-xl w-full hover:bg-gray-50 transition-colors mt-16">
                LET'S GET SHOP
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanStartPage;
