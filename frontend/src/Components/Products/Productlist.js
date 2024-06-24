import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { response } from 'express';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Productlist() {
  const query = useQuery();
  const searchTerm = query.get('search');
  const [products, setProducts] = useState([]);

  useEffect((searchTerm) => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/product/scrape', {"searchTerm": searchTerm});
        console.log(response)
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
      }
    };

    if (searchTerm) {
      fetchProducts(searchTerm);
      console.log(products)
    }
  }, [searchTerm]);

  return (
    <div>
      <h1>Products</h1>
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
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
