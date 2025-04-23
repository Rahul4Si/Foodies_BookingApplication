import { useState } from "react";
import { Button } from "@mantine/core";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ContactUs from "./pages/ContactUs";
import ExploreFood from "./pages/ExploreFood";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Orders from "./pages/Orders";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Router>
          {/* Navbar Component */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/explore-food" element={<ExploreFood />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </main>

      <Footer />
    </div>
  );
}

export default App;
