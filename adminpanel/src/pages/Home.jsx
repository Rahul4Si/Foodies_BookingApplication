import React,{useState} from "react";
import { IoMenu } from "react-icons/io5";
import Sidebar from "../components/Sidebar";
import CompanyLogo from "../assets/FoodiesJPG.png";

const Home = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex">
      <IoMenu onClick={toggleSidebar} className="md:hidden absolute text-blue-700 z-20 top-3 left-3 w-10 h-10 cursor-pointer" />
       <img src={CompanyLogo} alt="Company Logo"  className="hidden md:block absolute z-20 top-1 left-1 w-24 h-24 cursor-pointer" />
       <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-1/5 md:translate-x-0 transform ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } md:static transition-transform duration-300 ease-in-out z-5`}
      >
        <Sidebar />
      </div>
      <div className="w-4/5">{children}</div>
    </div>
  );
};

export default Home;