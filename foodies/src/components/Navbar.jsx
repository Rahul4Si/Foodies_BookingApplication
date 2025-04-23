import React, { use, useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import { Indicator } from "@mantine/core";
import { RxCross2 } from "react-icons/rx";
import CompanyLogo from "../assets/FoodiesJPG.png";
import { Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "./AvatarComponent";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const items = useSelector((state) => state.quantity.items);
  const totalQuantity = Object.values(items).reduce((sum, qty) => sum + qty, 0);

  return (
    <nav className="bg-white shadow-md w-full ">
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        <div className="flex items-center space-x-4">
          <img
            src={CompanyLogo}
            alt="Company Logo"
            className="h-20 w-20 rounded-full cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="hidden md:flex space-x-6 text-lg">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">
              Home
            </Link>

            <Link to="/contact" className="text-gray-700 hover:text-indigo-600">
              Contact Us
            </Link>
            <Link
              to="/explore-food"
              className="text-gray-700 hover:text-indigo-600"
            >
              Explore Foods
            </Link>
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <Indicator inline label={totalQuantity} size={16}>
              <TiShoppingCart size={32} color="blue" />
            </Indicator>
          </Link>
          {token ? (
            <Avatar/>
          ) : (
            <>
              <Button onClick={() => navigate("/register")} variant="outline">
                Register
              </Button>
              <Button onClick={() => navigate("/login")}>Login</Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            {isOpen ? <RxCross2 size={24} /> : <IoMdMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 text-base">
          <a href="#" className="block text-gray-700 hover:text-indigo-600">
            Home
          </a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600">
            About
          </a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600">
            Services
          </a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600">
            Contact
          </a>
          <div className="flex items-center space-x-4 pt-2">
            <Indicator inline label={cartQuantity} size={16}>
              <TiShoppingCart size={28} color="blue" />
            </Indicator>
            <Button variant="outline" size="xs">
              Register
            </Button>
            <Button size="xs">Login</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
