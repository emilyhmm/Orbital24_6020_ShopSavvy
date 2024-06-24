import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Productlist() {
    const query = useQuery();
    const searchTerm = query.get('search');
    console.log(searchTerm);
    const [products, setProducts] = useState([]);

    useEffect((searchTerm) => {
        const fetchProducts = async (searchTerm) => {
            try {
                const response = await axios.post('http://localhost:5000/api/product/scrape', {"searchTerm": query.get('search')});
                setProducts(response.data.result);
                console.log(response.data.result);
            } catch (error) {
                console.error('Error fetching products:', error.response ? error.response.data : error.message);
            }
        };
            fetchProducts(searchTerm);
        }, [searchTerm]);

  return (
    <div>
      <h1> Searching for: {searchTerm}</h1>
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product.title}>
                <img className = "header__logo" src = {product.image} alt = "ShopSavvy logo" />
                <h1>{product.title}</h1>
                <h2>{product.price}</h2>
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
