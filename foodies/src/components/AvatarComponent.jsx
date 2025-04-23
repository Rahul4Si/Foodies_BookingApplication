import { Menu, Button, Avatar } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AvatarComponent = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Reload the page to reflect the logout
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:8080/api/auth", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserDetails(response.data); // Set user details from the response
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <Menu shadow="md" width={200}>
      {userDetails && (
        <div className="flex items-center space-x-2 cursor-pointer">
          <Menu.Target>
            <Avatar src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1744974276~exp=1744977876~hmac=02b6e0a3b5b302aa1c83b018afe9b3060b59feb40cb9bcbe6ae0302bcfe2d021&w=826" alt="User Avatar" />
          </Menu.Target>
          <span className="font-semibold">{userDetails.name}</span>
        </div>
      )}

      <Menu.Dropdown>
        <Menu.Item onClick={()=> navigate('/orders')} className="cursor-pointer hover:bg-gray-200">
          Orders
        </Menu.Item>
        <Menu.Item
          onClick={handleLogout}
          className="cursor-pointer hover:bg-gray-200"
          color="red"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AvatarComponent;
