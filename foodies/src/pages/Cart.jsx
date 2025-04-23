import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {reset } from "../slice/FoodSlice";
import { reset as resetQuantity } from "../slice/QuantitySlice";
import { useNavigate } from "react-router-dom";
import CartItems from "../components/CartItems";
import { useState } from "react";
import { Stepper, Button, Group, Divider } from "@mantine/core";
import { FaArrowLeft } from "react-icons/fa";
import BillingAddress from "../components/BillingAddress";
import { toast } from "react-toastify";
import axios from "axios";
import QRCode from "../components/QRCode";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.quantity.items); // Get items from Redux store
  const foodItems = useSelector((state) => state.food.foodItems); // Assuming food details are stored in `state.food.foodItems`

  // Calculate total price
  const totalPrice = Object.keys(items).reduce((total, itemId) => {
    const food = foodItems.find((item) => item.id === itemId);
    return total + (food?.price || 0) * items[itemId];
  }, 0);

  const [active, setActive] = useState(0);
  const [address, setAddress] = useState(null);
  console.log(address)
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const saveAddress = () => {
    if(address.address === "" || address.email === "" || address.phone === "") {
      alert("Please fill in the address details before proceeding.");
      return;
    }
    if(address.phone)   
    nextStep();
  }

  const handlePayment = async() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    }

    // Logic to handle payment
    const userAddress = address.address;
    const email = address.email;
    const phoneNumber = address.phone;

    if (!userAddress || !email || !phoneNumber) {
      toast.error("Please fill in all the address details before proceeding.");
      return;
    }

    const amount = totalPrice + 10 + totalPrice * 0.1;
    const orderedItems = Object.keys(items).map((itemId) => {
      const food = foodItems.find((item) => item.id === itemId); // Find the food item by ID
      return {
        foodId: itemId || "Unknown Id", // Fallback if ID is missing
        foodName: food?.name || "Unknown Item", // Fallback if name is missing
        quantity: items[itemId], // Quantity from the quantity slice
        price: food?.price || 0, // Price from the food slice
      };
    });
    const paymentStatus = "Pending";
    const orderStatus = "Not Confirmed";
    const orderDate = new Date().toISOString().split('T')[0];
     
    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders/create",
        {
          userAddress,
          email,
          phoneNumber,
          amount,
          orderedItems,
          paymentStatus,
          orderStatus,
          orderDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if(response.status === 200) {
        dispatch(reset());
        dispatch(resetQuantity()); // Reset the quantity slice
        localStorage.removeItem("persist:root"); // Clear cart items from local storage
        toast.success("Payment successful! Thank you for your order.");
        setActive(3); // Move to the completed step
        // Clear the Redux store
      }
      else {
        toast.error("Error processing payment. Please try later.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Payment failed. Please try again.");
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section: Food Items */}
        <div className="w-full md:w-2/3 bg-white p-6 ">
          <Stepper
            active={active}
            onStepClick={setActive}
            className="stepper-container"
          >
            <Stepper.Step
              label="Cart Items"
              description="Review your cart items"
              className="bg-gray-100 rounded-lg p-4"
            >
              <CartItems />
            </Stepper.Step>
            <Stepper.Step
              label="Shipping Details"
              description="Enter your shipping information"
              className="bg-gray-100 rounded-lg p-4"
            >
              <div className="text-center text-gray-600">
              <BillingAddress setAddress={setAddress} />
              </div>
            </Stepper.Step>
            <Stepper.Step
              label="Payment"
              description="Complete your payment"
              className="bg-gray-100 rounded-lg p-4"
            >
              <div className="text-center text-gray-600">
                <QRCode amount={totalPrice + 10 + totalPrice * 0.1} />
              </div>
            </Stepper.Step>
            <Stepper.Completed>
              <div className="text-center text-green-600 font-semibold">
                Order Completed! Thank you for shopping with us.
              </div>
            </Stepper.Completed>
          </Stepper>
        </div>

        {/* Right Section: Total Price */}
        <div className="w-full md:w-1/3 h-1/4 bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Subtotal:</span>
            <span className="text-lg font-bold text-indigo-600">
              ₹{totalPrice}.00
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Shipping:</span>
            <span className="text-lg font-bold text-indigo-600">
              {totalPrice == 0 ? "0" : "₹10.00"}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Tax:</span>
            <span className="text-lg font-bold text-indigo-600">
              ₹{(totalPrice * 0.1).toFixed(2)}
            </span>
          </div>
          <Divider className="my-4" />
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-bold text-indigo-600">
              {totalPrice === 0
                ? "₹0.00"
                : "₹" + (totalPrice + 10 + totalPrice * 0.1).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          leftSection={<FaArrowLeft />}
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>
        <div className="space-x-4">
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
          {active === 0 && (
            <Button onClick={nextStep}>
              Next
            </Button>
          )}
          {active === 1 && (
            <Button onClick={saveAddress}>
              Save & Continue
            </Button>
          )}
          {active === 2 && (
            <Button onClick={handlePayment}>
              Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
