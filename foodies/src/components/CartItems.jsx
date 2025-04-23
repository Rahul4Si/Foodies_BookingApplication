import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, removeItem } from "../slice/QuantitySlice";
import { removeFoodItem } from "../slice/FoodSlice";
import { MdDelete } from "react-icons/md";
import { Divider, Tooltip, Button } from "@mantine/core";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((state) => state.quantity.items); // Get items from Redux store
    const foodItems = useSelector((state) => state.food.foodItems); // Assuming food details are stored in `state.food.foodItems`
 
    // Calculate total price
    const totalPrice = Object.keys(items).reduce((total, itemId) => {
      const food = foodItems.find((item) => item.id === itemId);
      return total + (food?.price || 0) * items[itemId];
    }, 0);
 
    const handleDeleteFoodItem = (itemId) => {
      dispatch(removeItem(itemId)); // Remove item from cart
      dispatch(removeFoodItem(itemId)); // Remove item from food items
    };

  return (
     <div className="w-full bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
              {Object.keys(items).length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
              ) : (
                Object.keys(items).map((itemId) => {
                  const food = foodItems.find((item) => item.id === itemId);
                  return (
                    <div
                      key={itemId}
                      className="flex justify-between items-center border-b pb-4 mb-4"
                    >
                      <div>
                        <h3 className="text-lg font-semibold">{food?.name}</h3>
                        <p className="text-sm text-gray-600">
                          Price: ₹{food?.price}.00
                        </p>
                      </div>
                      <div className="flex space-x-10">
                        <div className="flex items-center space-x-4 ">
                          <button
                            onClick={() => dispatch(decrement(itemId))}
                            className="bg-red-500 text-white font-medium py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                          >
                            -
                          </button>
                          <span className="text-lg font-semibold">
                            {items[itemId]}
                          </span>
                          <button
                            onClick={() => dispatch(increment(itemId))}
                            className="bg-green-500 text-white font-medium py-1 px-3 rounded-lg hover:bg-green-600 transition duration-300"
                          >
                            +
                          </button>
                        </div>
                        <Tooltip
                          label="Delete"
                          onClick={() => handleDeleteFoodItem(itemId)}
                        >
                          <MdDelete
                            size={35}
                            color="red"
                            className="cursor-pointer hover:scale-110"
                          />
                        </Tooltip>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
  )
}

export default CartItems;