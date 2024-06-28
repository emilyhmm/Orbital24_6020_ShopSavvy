import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  CircularProgress,
} from "@mui/material";
import "../App.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Productlist({ setCart }) {
  const query = useQuery();
  const searchTerm = query.get("search");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    (searchTerm) => {
      const fetchProducts = async (searchTerm) => {
        try {
          setLoading(true);
          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/product/scrape`,
            { searchTerm: query.get("search") }
          );
          setProducts(response.data.result);
          setLoading(false);
        } catch (error) {
          console.error(
            "Error fetching products:",
            error.response ? error.response.data : error.message
          );
        }
      };
      fetchProducts(searchTerm);
    },
    [searchTerm]
  );

    const addToCart = async (product) => {
      try {
        const token = Cookies.get('refreshToken'); 
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/cart/add`, { product, quantity: 1 }, 
          { headers: {
            Authorization: `Bearer ${token}`,
        }, withCredentials: true });
        
        setCart(response.data);
        console.log('Product added to cart:', response.data);
        } catch (error) {
        console.error('Error adding to cart:', error.response ? error.response.data : error.message);
        }
      };

  return (
    <div>
      <span>
        <h1 style={{ textAlign: "right" }}>Searching for: {searchTerm}</h1>
      </span>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div
              className="product__cardsdisplay"
              style={{ background: "#F8F8F8" }}
            >
              {products.map((product) => (
                <Card sx={{ maxWidth: 345, margin: 0.46 }} key={product.title}>
                  <CardActionArea>
                    <div>
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.image}
                        alt={product.title}
                        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                      />
                    </div>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                      </Typography>
                      <Typography gutterBottom variant="h4" component="div">
                        {product.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => addToCart(product)}>
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          ) : (
            <p>No products found</p>
          )}
        </>
      )}
    </div>
  );
}

export default Productlist;
