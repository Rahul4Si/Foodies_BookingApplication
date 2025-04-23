import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const AddPage = () => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    description: "",
    category: "",
    price: "",
  });

  const categoryList = [
    "Pizza",
    "Burger",
    "Salad",
    "Dessert",
    "Drink",
    "Pasta",
    "Sushi",
    "Non-Vegetarian",
    "Sandwich",
    "Tacos",
    "Seafood",
    "Vegetarian",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }
    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.price
    ) {
      alert("Please fill all fields.");
      return;
    }

    // Prepare form data for submission
    const submissionData = new FormData();
    submissionData.append("image", formData.image);
    submissionData.append("name", formData.name);
    submissionData.append("description", formData.description);
    submissionData.append("category", formData.category);
    submissionData.append("price", formData.price);

    try {
      // Send POST request to Spring Boot backend
      console.log("first");
      const response = await axios.post(
        "http://localhost:8080/api/foods/addFood",
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success response
      if (response.status === 200) {
        toast.success("Food item added successfully!");
        setFormData({
          image: null,
          name: "",
          description: "",
          category: "",
          price: "",
        });
      }
    } catch (error) {
      // Handle error response
      console.error("Error submitting form:", error);
      alert("Failed to add food item. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 my-5 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        Add Food
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Upload Image:
          </label>
          <div className="mt-2 flex items-center">
            <label className="flex justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <span className="text-sm flex justify-center items-center h-28 w-28 text-gray-600">
                <FaPlus size={55} />
              </span>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {formData.image && (
              <div className="ml-4">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter food name..."
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a description..."
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Category:
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Select category..."
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select category...
            </option>
            {categoryList.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Price:
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            placeholder="Enter price..."
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddPage;