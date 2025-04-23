import './App.css'
import AddPage from './components/AddPage';
import ListFoods from './components/ListFoods';
import Orders from './components/Orders';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/add-food" />} />
        <Route path="/add-food" element={<Home><AddPage/></Home>} />
        <Route path="/list-order" element={<Home><ListFoods/></Home>} />
        <Route path="/orders" element={<Home><Orders/></Home>} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App