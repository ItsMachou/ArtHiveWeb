import React, { useState } from "react";
import { Search, Bell, ShoppingCart, User, Home, MoreHorizontal, ChevronRight, Send, Plus, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const ChatPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // This would come from your database
  const chatContacts = [
    { 
      id: 1, 
      name: "Francis Montenegro", 
      avatar: "/assets/person.png", 
      online: true,
      lastMessage: "Are you still looking for that?",
      time: "3m"
    },
    { 
      id: 2, 
      name: "Roger Castillo", 
      avatar: "/assets/person.png", 
      online: false,
      lastMessage: "That figurine is handcrafted by...",
      time: "02:10"
    }
  ];

  const artisans = [
    { id: 1, name: "Ernesto Santos", avatar: "/assets/person.png" },
    { id: 2, name: "Carmina Salazar", avatar: "/assets/person.png" },
    { id: 3, name: "Rose Dela Cruz", avatar: "/assets/person.png" },
    { id: 4, name: "Sta Anna Bustamante", avatar: "/assets/person.png" },
    { id: 5, name: "Roger Castillo", avatar: "/assets/person.png" },
    { id: 6, name: "Francis Montenegro", avatar: "/assets/person.png" }
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Left sidebar - Navigation */}
      <div className="w-12 bg-white border-r flex flex-col items-center py-3">
        <div className="mb-4">
          <img src="/assets/honeycomb.png" alt="Arthive Logo" className="h-8" />
        </div>

        <nav className="flex flex-col space-y-2 mb-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium ${isActive ? "text-amber-500" : "text-gray-600"} hover:text-amber-500`
            }
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Home size={16} />
            </div>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium ${isActive ? "text-amber-500" : "text-gray-600"} hover:text-amber-500`
            }
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <User size={16} />
            </div>
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium ${isActive ? "text-amber-500" : "text-gray-600"} hover:text-amber-500`
            }
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <MessageSquare size={16} />
            </div>
          </NavLink>
        </nav>
      </div>

      {/* Chat contacts list */}
      <div className="w-56 bg-white border-r flex flex-col">
        <div className="p-3 border-b">
          <h2 className="font-bold text-sm">Chats</h2>
        </div>

        <div className="flex-1 overflow-auto">
          {chatContacts.map(contact => (
            <div 
              key={contact.id} 
              className={`flex items-center p-3 hover:bg-gray-100 cursor-pointer ${contact.id === 1 ? 'bg-gray-100' : ''}`}
            >
              <div className="relative mr-2">
                <img 
                  src={contact.avatar} 
                  alt={contact.name} 
                  className="w-8 h-8 rounded-full"
                />
                {contact.online && (
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-xs">{contact.name}</h3>
                  <span className="text-xs text-gray-500">{contact.time}</span>
                </div>
                <p className="text-xs text-gray-600 truncate">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-amber-50">
        {/* Chat header */}
        <header className="bg-white p-3 border-b flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/assets/person.png" 
              alt="Francis Montenegro" 
              className="w-6 h-6 rounded-full mr-2" 
            />
            <div>
              <h2 className="font-medium text-sm">Francis Montenegro</h2>
              <p className="text-xs text-gray-500">Active now</p>
            </div>
          </div>
          <button className="text-gray-600">
            <MoreHorizontal size={16} />
          </button>
        </header>

        {/* Chat messages area */}
        <div className="flex-1 p-3">
          {/* Chat messages would be displayed here */}
        </div>

        {/* Message input */}
        <div className="bg-white p-3 flex items-center">
          <button className="text-gray-500 mr-2">
            <Plus size={18} />
          </button>
          <input 
            type="text" 
            placeholder="Aa" 
            className="flex-1 bg-gray-200 rounded-full px-3 py-1.5 focus:outline-none text-sm"
          />
          <button className="text-gray-500 ml-2">
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-56 border-l p-4">
        <section className="mb-6">
          <h2 className="font-bold text-sm mb-3">Promotions</h2>
          <img src="/assets/PromoChat.png" alt="Promotion Image" className="w-full h-auto rounded-lg" />
        </section>

        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-sm">Artisans</h2>
            <button className="text-gray-500">
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {artisans.map(artisan => (
              <div key={artisan.id} className="flex items-center">
                <div className="w-6 h-6 mr-2">
                  <img 
                    src={artisan.avatar} 
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
  );
};

export default ChatPage;