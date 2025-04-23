import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation(); // Get the current location
    const navigate = useNavigate()
  const pathName = location.pathname;

  return (
    <div className="bg-gray-800 text-white h-[130vh] fixed top-0 bottom-0 w-full pt-24">
      <div className="space-y-4 text-center">
      <h6 onClick={() => navigate('/add-food')} className={`${pathName === '/add-food' ? "bg-gray-600" : " "} hover:bg-gray-700 p-2 mx-2 text-2xl cursor-pointer rounded`}>Add Food</h6>
        <h6 onClick={()=>navigate('/list-order')}   className={`${pathName === '/list-order' ? "bg-gray-600" : " "} hover:bg-gray-700 p-2 mx-2 text-2xl cursor-pointer rounded`}>List Food</h6>
        <h6 onClick={()=> navigate('/orders')}   className={`${pathName === '/orders' ? "bg-gray-600" : " "} hover:bg-gray-700 p-2 mx-2 text-2xl cursor-pointer rounded`}>Orders</h6>
      </div>
    </div>
  );
};

export default Sidebar;