import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const ListFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/foods"); // Adjust the URL as needed
        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };
    fetchFoods();
  }, []);

  const handleDeleteHandler = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/foods/${id}`); // Adjust the URL as needed
      if(response.status === 200) {
        toast.success("Food deleted successfully!");
        setFoods(foods.filter((food) => food.id !== id));
      }
      else {
        toast.error("Failed to delete food item.");
      }
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">List of Foods</h1>
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">
                <img className="w-20 h-20 rounded-lg" src={food.imageUrl} />
              </td>
              <td className="px-4 py-2">{food.name}</td>
              <td className="px-4 py-2">{food.category}</td>
              <td className="px-4 py-2">₹ {food.price}.00</td>
              <td className="px-4 py-4 flex items-center gap-4">
                <FaEdit size={35} color="indigo" className="cursor-pointer" />
                <MdDelete onClick={() => handleDeleteHandler(food.id)} size={35} color="red" className="cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListFoods;