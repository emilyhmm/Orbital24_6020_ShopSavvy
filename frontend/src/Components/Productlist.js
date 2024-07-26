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
import { QuizContext } from "../Contexts/QuizContext";
import { sortProductsByQuizResults } from "./Sorter";

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
  const { quizResults } = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(quizResults);
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/product/scrape`,
          { searchTerm }
        );
        const fetchedProducts = response.data.result;
        const sortedProducts = sortProductsByQuizResults(
          fetchedProducts,
          quizResults
        );
        setProducts(sortedProducts);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.response ? error.response.data : error.message
        );
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1200000);

    fetchProducts();

    return () => clearTimeout(timeoutId);
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
        <h1 style={{ textAlign: "left", fontSize: '20px', marginLeft: '25px', marginTop: '10px'}}>Searching for: {searchTerm}</h1>
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
              style={{ 
                background: "#F8F8F8",
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '10px',
                justifyContent: 'start',
                padding: '20px',
              }}
            >
              {products.map((product) => (
                <Card 
                  sx={{ 
                    maxWidth: 280, 
                    margin: 0.46,
                    width: 280,
                    height: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }} 
                  key={product.title}
                >
                  <Link
                    to={{
                      pathname: `/product/${generateUrlSafeTitle(product.title)}`,
                    }}
                    style={{ textDecoration: "none" }} // Remove underline from the link
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
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{
                            textAlign: "left",
                            fontFamily: "Gabarito, sans-serif",
                            fontWeight: "400",
                            color: "black",
                            fontSize: "1rem",
                            height: "2.5rem", 
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                          }}
                        >
                          {product.title}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h4"
                          component="div"
                          sx={{
                            marginTop: '20px',
                            textAlign: "left",
                            fontFamily: "Gabarito, sans-serif",
                            fontWeight: "600",
                            color: "black",
                            fontSize: "1rem"
                          }}
                        >
                          {product.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          sx={{
                            textAlign: "left",
                            fontFamily: "Gabarito, sans-serif",
                            fontWeight: "500",
                          }}
                        >
                          {product.rating !== "0"
                            ? `${product.rating} out of 5 stars`
                            : "No rating"}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          sx={{
                            textAlign: "left",
                            fontFamily: "Gabarito, sans-serif",
                            fontWeight: "500",
                          }}
                        >
                          {product.sold !== "0"
                            ? `At least ${product.sold} sold`
                            : "0 sold"}
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
