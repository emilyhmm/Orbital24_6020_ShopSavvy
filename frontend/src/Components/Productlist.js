import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const handleNavigation = (link) => {
    window.location.href = `${link}`;
};

function Productlist({ setCart }) {
    const query = useQuery();
    const searchTerm = query.get('search');
    const [products, setProducts] = useState([]);

    useEffect((searchTerm) => {
        const fetchProducts = async (searchTerm) => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/product/scrape`, {"searchTerm": query.get('search')});
                setProducts(response.data.result);
                console.log(response.data.result);
            } catch (error) {
                console.error('Error fetching products:', error.response ? error.response.data : error.message);
            }
        };
            fetchProducts();
        }, [searchTerm]);

    const addToCart = async (product) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, { product, quantity: 1 });
        setCart(response.data);
        } catch (error) {
        console.error('Error adding to cart:', error.response ? error.response.data : error.message);
        }
      };

  return (
    <div>
      <h1> Searching for: {searchTerm}</h1>
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product.title}>
                <img className = "header__logo" src = {product.image} alt = "ShopSavvy logo" />
                <h1 onClick={ () => handleNavigation(`${product.link}`)} target="_blank">{product.title}</h1>
                <h2>{product.price}</h2>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default Productlist;
