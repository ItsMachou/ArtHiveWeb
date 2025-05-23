import React, { useState } from "react";
import { Search, Bell, ShoppingCart, User, Home, MessageSquare } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";


const ShopsPage = () => {
  // Hardcoded data for shops
  const shops = {
    general: [
      { id: 1, name: 'Shop 1', image: '/assets/shop1.jpg', province: 'Cavite' },
      { id: 2, name: 'Shop 2', image: '/assets/shop2.jpg', province: 'Laguna' },
      { id: 3, name: 'Shop 3', image: '/assets/shop1.jpg', province: 'Batangas' },
      { id: 4, name: 'Shop 4', image: '/assets/shop2.jpg', province: 'Rizal' },
      { id: 5, name: 'Shop 5', image: '/assets/shop1.jpg', province: 'Quezon' },
      { id: 6, name: 'Shop 6', image: '/assets/shop2.jpg', province: 'Cavite' },
      { id: 7, name: 'Shop 7', image: '/assets/shop1.jpg', province: 'Laguna' },
      { id: 8, name: 'Shop 8', image: '/assets/shop2.jpg', province: 'Batangas' },
      { id: 9, name: 'Shop 9', image: '/assets/shop1.jpg', province: 'Rizal' },
    ],
    cavite: [
      { id: 100, name: 'Cavite Shop 1', image: '/assets/CaviteShop1.jpg', province: 'Cavite' },
      { id: 101, name: 'Cavite Shop 2', image: '/assets/CaviteShop2.jpg', province: 'Cavite' },
      { id: 102, name: 'Cavite Shop 3', image: '/assets/CaviteShop1.jpg', province: 'Cavite' },
      { id: 103, name: 'Cavite Shop 4', image: '/assets/CaviteShop2.jpg', province: 'Cavite' },
      { id: 104, name: 'Cavite Shop 5', image: '/assets/CaviteShop1.jpg', province: 'Cavite' },
      { id: 105, name: 'Cavite Shop 6', image: '/assets/CaviteShop2.jpg', province: 'Cavite' },
    ]
  };

  const provinces = [
    { id: "cavite", name: "Cavite", logo: "/assets/cavite.png" },
    { id: "laguna", name: "Laguna", logo: "/assets/laguna.png" },
    { id: "batangas", name: "Batangas", logo: "/assets/batangas.png" },
    { id: "rizal", name: "Rizal", logo: "/assets/rizal.png" },
    { id: "quezon", name: "Quezon", logo: "/assets/quezon.png" },
  ];

  const recommendations = [
    { id: 1, name: "Wood Style Pot", price: 2500, artist: "Cavite", type: "Pottery", image: "/assets/pot.png" },
    { id: 2, name: "Quiet Sculpture", price: 10500, artist: "Rizal", type: "Sculpture", image: "/assets/sculpt.png" },
    { id: 3, name: "Wood Style Pot", price: 2500, artist: "Cavite", type: "Pottery", image: "/assets/pot.png" },
    { id: 4, name: "Quiet Sculpture", price: 10500, artist: "Rizal", type: "Sculpture", image: "/assets/sculpt.png" },
    { id: 5, name: "Wood Style Pot", price: 2500, artist: "Cavite", type: "Pottery", image: "/assets/pot.png" }
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
            to="/shop"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium ${isActive ? "text-amber-500" : "text-gray-600"} hover:text-amber-500`
            }
          >
            <div className="w-6 h-6 flex items-center justify-center mr-2">
              <ShoppingCart size={16} />
            </div>
            Shops
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
              <a
                key={province.id}
                href="#"
                className={`flex items-center text-sm ${province.id === 'cavite' ? 'text-amber-500' : 'text-gray-600'}`}
              >
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
          <h1 className="text-lg font-bold">SHOPS IN CALABARZON</h1>
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
        <div className="p-4 overflow-y-auto">
          {/* Shops in CALABARZON section */}
          <section className="mb-6">
            <div className="grid grid-cols-3 gap-3">
              {shops.general.map((shop, index) => (
                <div key={shop.id} className={`bg-gray-200 rounded-lg h-20 ${index === 4 ? 'ring-1 ring-blue-500' : ''}`}>
                  <img src={shop.image} alt={shop.name} className="w-full h-full object-cover rounded-lg" />
                </div>
              ))}
            </div>
          </section>

          {/* Shops in CAVITE section */}
          <section className="mb-6">
            <h2 className="text-base font-bold mb-3">SHOPS IN CAVITE</h2>
            <div className="grid grid-cols-3 gap-3">
              {shops.cavite.map(shop => (
                <div key={shop.id} className="bg-gray-200 rounded-lg h-20">
                  <img src={shop.image} alt={shop.name} className="w-full h-full object-cover rounded-lg" />
                </div>
              ))}
            </div>
          </section>

          {/* Recommendations section */}
          <section>
            <h2 className="text-base font-bold mb-3">RECOMMENDATIONS</h2>
            <div className="flex space-x-3 overflow-x-auto pb-3">
              {recommendations.map(product => (
                <div key={product.id} className="bg-white p-3 rounded-lg shadow-sm w-48 flex-shrink-0">
                  <img src={product.image} alt={product.name} className="h-32 w-full object-cover mb-2 rounded-lg" />
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-600">{product.type}</p>
                  <p className="font-bold text-sm mt-1">₱{product.price}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShopsPage;
