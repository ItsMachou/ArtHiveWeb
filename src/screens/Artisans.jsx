import React, { useState } from "react";
import { Search, Bell, ShoppingCart, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Home, MessageSquare } from "lucide-react";

const ArtisansProfiles = () => {
  // This would come from your database
  const artisans = Array(15).fill(null).map((_, index) => ({
    id: index + 1,
    image: `/assets/artisans.jpg`,
    province: index % 5 === 0 ? "Cavite" : 
              index % 5 === 1 ? "Laguna" : 
              index % 5 === 2 ? "Batangas" : 
              index % 5 === 3 ? "Rizal" : "Quezon"
  }));

  const provinces = [
    { id: "cavite", name: "Cavite", logo: "/assets/cavite.png" },
    { id: "laguna", name: "Laguna", logo: "/assets/laguna.png" },
    { id: "batangas", name: "Batangas", logo: "/assets/batangas.png" },
    { id: "rizal", name: "Rizal", logo: "/assets/rizal.png" },
    { id: "quezon", name: "Quezon", logo: "/assets/quezon.png" },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Left sidebar */}
      <div className="w-40 bg-white border-r p-3 flex flex-col">
        <div className="mb-4">
          <img src="/assets/ArtH.png" alt="Arthive Logo" className="h-8" />
        </div>

        <nav className="flex flex-col space-y-2 mb-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium ${isActive ? "text-amber-500" : "text-gray-600"} hover:text-amber-500`
            }
          >
            <div className="w-6 h-6 flex items-center justify-center mr-2">
              <Home size={16} />
            </div>
            Home
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium ${isActive ? "text-amber-500" : "text-gray-600"} hover:text-amber-500`
            }
          >
            <div className="w-6 h-6 flex items-center justify-center mr-2">
              <User size={16} />
            </div>
            Artisans
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium ${isActive ? "text-amber-500" : "text-gray-600"} hover:text-amber-500`
            }
          >
            <div className="w-6 h-6 flex items-center justify-center mr-2">
              <MessageSquare size={16} />
            </div>
            Chats
          </NavLink>
        </nav>

        <div className="mt-4">
          <h3 className="font-bold text-xs mb-3">CALABARZON PROVINCES</h3>
          <div className="space-y-2">
            {provinces.map(province => (
              <a key={province.id} href="#" className="flex items-center text-gray-600 text-sm">
                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                  <img src={province.logo} alt={province.name} className="w-full h-full rounded-full" />
                </div>
                <span>{province.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="py-2 px-4 flex justify-between items-center border-b">
          <h1 className="text-lg font-bold">ARTISANS PROFILES</h1>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-200 rounded py-1.5 pl-8 pr-3 w-48 focus:outline-none text-sm"
              />
            </div>
            <button className="p-1.5">
              <Bell size={18} />
            </button>
            <button className="p-1.5">
              <ShoppingCart size={18} />
            </button>
            <Link to="/login" className="p-1.5">
              <User size={18} />
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="p-4">
          <div className="grid grid-cols-5 gap-3">
            {artisans.map(artisan => (
              <div key={artisan.id} className="bg-gray-200 rounded-lg overflow-hidden h-28">
                <img 
                  src={artisan.image} 
                  alt={artisan.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisansProfiles;