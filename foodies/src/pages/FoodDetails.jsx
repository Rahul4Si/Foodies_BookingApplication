import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch,useSelector } from "react-redux";
import { increment, decrement } from "../slice/QuantitySlice";
import { addFoodItem } from "../slice/FoodSlice";

const FoodDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Extract the dynamic ID from the URL
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the quantity of the current item from Redux state
  const quantity = useSelector((state) => state.quantity.items[id] || 0);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/foods/${id}`
        );
        setFood(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch food details");
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, [id]);

  const handleAddToCart = (foodId,foodName,foodPrice) => {
    dispatch(increment(foodId));
    dispatch(addFoodItem({ id: foodId, name: foodName, price: foodPrice }));
  };

  if (loading)
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6 mx-10">
      {/* Left Side: Image */}
      <div className="w-full md:w-1/2">
        <img
          src={food.imageUrl}
          alt={food.name}
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />
      </div>

      {/* Right Side: Information */}
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold mb-1">{food.name}</h1>
        <p className="text-sm text-gray-600 mb-6">
          Category:{" "}
          <span className="px-3 py-1 rounded-lg font-semibold bg-yellow-400">
            {food.category}
          </span>
        </p>
        <p className="text-lg text-gray-600 mb-6">{food.description}</p>
        <p className="text-2xl font-semibold text-indigo-600 mb-4">
          ₹{food.price}.00
        </p>
        {/* Add to Cart Section */}
        {quantity === 0 ? (
          <button
            onClick={() => handleAddToCart(food.id, food.name, food.price)}
            className="bg-indigo-600 flex items-center hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
          >
            <FaShoppingCart /> <span className="ml-2">Add to Cart</span>
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(decrement(id))}
              className="bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={() => dispatch(increment(id))}
              className="bg-green-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;