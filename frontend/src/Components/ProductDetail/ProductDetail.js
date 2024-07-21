import React, { useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../Contexts/ProductContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { CartContext } from '../../Contexts/CartContext';
import Reviews from "./Reviews";
import "./ProductDetail.css"; // Import CSS for styling

const ProductDetail = ({ setCart }) => {
  const { title } = useParams();
  const { products } = useContext(ProductContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { fetchCart } = useContext(CartContext);
  const navigate = useNavigate();
  const product = products.find(
    (product) =>
      product.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") === title
  );

  const addToCart = async (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    let token = localStorage.getItem("token");

    try {
      const requestData = {
        product: {
          title: product.title,
          price: product.price,
          image: product.image,
          link: product.link,
        },
        quantity: 1,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/cart/add`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      fetchCart()
      setCart(response.data);
      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </div>
      <div className="product-details">
        <div className="product-title">{product.title}</div>
        <div className="product-price">{product.price}</div>
        <button
          className="add-to-cart-button"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
      <div className="reviews-container">
        <h2 style={{ textAlign: "left" }}>What Customers Say :</h2>
        <Reviews productlink={product.link} />
      </div>
    </div>
  );
};

export default ProductDetail;
