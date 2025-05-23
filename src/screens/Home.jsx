import React from "react";
import { Search, Bell, ShoppingCart, User, MessageSquare } from "lucide-react";
import { NavLink } from "react-router-dom";
import { FaHome, FaChair, FaEllipsisH, FaHandRock, FaGlassWhiskey } from "react-icons/fa";
import { FaCube } from "react-icons/fa6"; // Corrected the icon import
import { Link } from "react-router-dom";

const ArthiveHome = () => {
  const products = [
    { id: 1, name: "Wood Style Pot", price: 2500, artist: "Cavite", type: "Pottery", image: "/assets/pot.png" },
    { id: 2, name: "Quiet Sculpture", price: 10500, artist: "Rizal", type: "Sculpture", image: "/assets/sculpt.png" },
    { id: 3, name: "Wood Style Pot", price: 2500, artist: "Cavite", type: "Pottery", image: "/assets/pot.png" },
    { id: 4, name: "Quiet Sculpture", price: 10500, artist: "Rizal", type: "Sculpture", image: "/assets/sculpt.png" },
    { id: 5, name: "Wood Style Pot", price: 2500, artist: "Cavite", type: "Pottery", image: "/assets/pot.png" },
    { id: 6, name: "Quiet Sculpture", price: 10500, artist: "Rizal", type: "Sculpture", image: "/assets/sculpt.png" },
  ];

  const artisans = [
    { id: 1, name: "Ernesto Santos", image: "/assets/person.png" },
    { id: 2, name: "Carmina Salazar", image: "/assets/person.png" },
    { id: 3, name: "Rose Dela Cruz", image: "/assets/person.png" },
    { id: 4, name: "Sta Anna Bustamante", image: "/assets/person.png" },
    { id: 5, name: "Roger Castillo", image: "/assets/person.png" },
    { id: 6, name: "Francis Montenegro", image: "/assets/person.png" },
  ];

  const categories = [
    { id: "all", name: "All", icon: "grid" },
    { id: "furniture", name: "Furniture", icon: "chair" },
    { id: "sculpture", name: "Sculpture", icon: "chisel" },
    { id: "pottery", name: "Pottery", icon: "vase" },
    { id: "figurine", name: "Figurine", icon: "figure" },
    { id: "others", name: "Others", icon: "more" },
  ];

  const renderCategoryIcon = (iconName) => {
    switch (iconName) {
      case "grid":
        return <FaHome size={20} />;
      case "chair":
        return <FaChair size={20} />;
      case "chisel":
        return <FaHandRock size={20} />;
      case "vase":
        return <FaGlassWhiskey size={20} />;
      case "figure":
        return <FaCube size={20} />;
      case "more":
        return <FaEllipsisH size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left sidebar */}
      <div className="w-40 bg-white border-r p-3 flex flex-col">
        <div className="mb-4">
          <img src="/assets/ArtH.png" alt="Arthive Logo" className="h-8" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 mb-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium ${isActive ? "text-amber-500" : "text-gray-600"} hover:text-amber-500`
            }
          >
            <div className="w-6 h-6 flex items-center justify-center mr-2">
              <FaHome size={16} />
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

        {/* Categories */}
        <div className="mt-6">
          <h3 className="font-bold text-xs mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <a key={category.id} href="#" className="flex items-center text-gray-600 text-sm">
                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                  {renderCategoryIcon(category.icon)}
                </div>
                <span>{category.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="py-2 px-4 flex justify-between items-center border-b">
          <h1 className="text-lg font-bold">Hi, Client Name</h1>
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

        {/* Body Content */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-4 overflow-auto">
            {/* Products */}
            <section className="mb-6">
              <h2 className="text-base font-bold mb-3">Products</h2>
              <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="relative">
                    <div className="bg-gray-200 h-48 rounded-lg mb-2 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">PHP {product.price.toLocaleString()}</p>
                          <h3 className="font-medium text-sm">{product.name}</h3>
                        </div>
                        <span className="text-amber-800 text-xs">{product.artist}</span>
                      </div>
                      <div className="mt-0.5 text-xs text-gray-400 flex justify-between">
                        <span>ID: {product.id}</span>
                        <span>20 sold</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <div className="w-56 border-l p-4">
            {/* Promotions */}
            <section className="mb-6">
              <h2 className="font-bold text-sm mb-3">Promotions</h2>
              <img src="/assets/promohome.png" alt="Promotion Image" className="w-full h-auto rounded-lg" />
            </section>

            {/* Artisans */}
            <section>
              <h2 className="font-bold text-sm mb-3">Featured Artisans</h2>
              <div className="space-y-2">
                {artisans.map((artisan) => (
                  <div key={artisan.id} className="flex items-center">
                    <div className="w-6 h-6 mr-2">
                      <img 
                        src={artisan.image} 
                        alt={artisan.name} 
                        className="w-full h-full rounded-full object-cover" 
                      />
                    </div>
                    <span className="text-xs">{artisan.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArthiveHome;
