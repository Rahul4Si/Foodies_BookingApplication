import React from "react";
import { FaFacebookSquare, FaTwitter,FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="footer-section">
                    <h3 className="text-xl font-bold mb-2">Foodies</h3>
                    <p className="text-sm">Your favorite food delivered fast & fresh.</p>
                </div>
                <div className="footer-section">
                    <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#about" className="hover:underline">About Us</a></li>
                        <li><a href="#menu" className="hover:underline">Menu</a></li>
                        <li><a href="#contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline"><FaFacebookSquare size={30} color="blue"/></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline"><FaTwitter  size={30} color="green"/></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline"><FaInstagramSquare  size={30} color="red"/></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom text-center mt-8">
                <p className="text-sm">&copy; {new Date().getFullYear()} Foodies. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;