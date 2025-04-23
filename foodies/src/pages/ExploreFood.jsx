import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Image, Text, Button } from "@mantine/core";
import { FaRegHeart } from "react-icons/fa";
import { Divider } from "@mantine/core";
import { Rating } from "@mantine/core";
import { Link } from "react-router-dom";

const ExploreFood = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(""); // State for the filter input

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/foods");
        setFoods(response.data);
        setFilteredFoods(response.data); // Initialize filtered foods
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch food items");
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Filter foods based on the category
  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = foods.filter((food) =>
      food.category.toLowerCase().includes(value)
    );
    setFilteredFoods(filtered);
  };

  if (loading)
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 ">
      {/* Filter Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Filter by category..."
          value={filter}
          onChange={handleFilterChange}
          className="w-96 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {
          filteredFoods.length === 0 ? (
            <div className="text-center text-lg font-semibold col-span-5">
              No food items found for the selected category.
            </div>
          ) : (
        filteredFoods.map((food) => (
          <Card
            key={food.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="hover:shadow-lg hover:scale-105 linear transition-shadow duration-300"
          >
            <Card.Section>
              <Image
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-40 rounded-t-lg object-cover"
              />
            </Card.Section>
            <div className="p-4">
              <Text size="lg">
                <span className="font-semibold text-gray-800 mb-2">
                  {food.name}
                </span>
              </Text>
              <Text size="sm" className="text-gray-400 line-clamp-3 mb-4">
                <span className=" text-gray-600 mb-2">{food.description}</span>
              </Text>
              <div className="flex text-xl font-semibold justify-between items-center my-4">
                <div>₹{food.price}.00</div>
                <Rating value={3.5} fractions={2} readOnly />
              </div>
              <Divider my="sm" />
              <div className="flex justify-between items-center ">
                <Link
                  to={`/food/${food.id}`}
                  className="bg-indigo-600 w-2/3 hover:bg-indigo-700 text-white font-medium py-2 px-4 text-center rounded-lg transition duration-300"
                >
                  View More
                </Link>
                <FaRegHeart
                  size={30}
                  className="cursor-pointer w-1/3 pl-9 pt-3"
                />
              </div>
            </div>
          </Card>
        )))
        }
      </div>
    </div>
  );
};

export default ExploreFood;