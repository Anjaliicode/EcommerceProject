import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Products from "./components/Products.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import ContactUs from "./components/Contact.jsx";
import Categories from "./components/Categories.jsx";
import HomePage from "./components/Homepage.jsx";
import Navbar from "./components/AppBar.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
