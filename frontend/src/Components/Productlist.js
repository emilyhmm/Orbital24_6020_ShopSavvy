import { useState, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
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
import { ProductContext } from "../Contexts/ProductContext";
import { AuthContext } from "../Contexts/AuthContext";
import { CartContext } from "../Contexts/CartContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductList({ setCart }) {
  const query = useQuery();
  const searchTerm = query.get("search");
  const { products, setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const { fetchCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/product/scrape`,
          { searchTerm }
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
    fetchProducts();
  }, [searchTerm, setProducts]);

  const addToCart = async (product) => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    console.log(product);
    let token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/cart/add`,
        { product, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
      setCart(response.data);
      console.log("Product added to cart:", response.data);
    } catch (error) {
      if (error.response.status === 403) {
        try {
          const refreshToken = Cookies.get("refreshToken");
          console.log(refreshToken);
          console.log(Cookies);
          const newToken = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/user/refresh`,
            {
              refreshToken,
            }
          );
          console.log("ref");
          // Update access token in state or local storage
          token = localStorage.setItem("accessToken", newToken);
          console.log(token);
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }
      if (error.response.status === 401) {
        console.error(
          "Error adding to cart:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const generateUrlSafeTitle = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  return (
    <div>
      <span>
        <h1 style={{ textAlign: "left" }}>Searching for: {searchTerm}</h1>
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
                  <Link
                    to={{
                      pathname: `/product/${generateUrlSafeTitle(product.title)}`,
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <CardActionArea>
                      <div>
                        <CardMedia
                          component="img"
                          height="200"
                          image={product.image}
                          alt={product.title}
                          sx={{
                            padding: "1em 1em 0 1em",
                            objectFit: "contain",
                          }}
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
                  </Link>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => addToCart(product)}
                    >
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

export default ProductList;
