import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

const handleNavigation = (link) => {
  window.location.href = `${link}`;
};

function Productlist() {
  const query = useQuery();
  const searchTerm = query.get("search");
  console.log(searchTerm);
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
                    <Button size="small" color="primary">
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
