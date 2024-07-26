import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "axios";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Box,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import StoreIcon from "@mui/icons-material/Store";

function Order() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      fetchOrders();
    }
  }, [isLoggedIn, navigate]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/order/view`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const clearOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/order/cancel`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders([]);
    } catch (error) {
      console.error("Error clearing orders:", error);
    }
  };

  return (
    <Box sx={{ 
      padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", minHeight: "100vh" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ marginBottom: 2, width: "100%" }}
      >
        <StoreIcon sx={{ marginRight: 1, fontSize: 40 }} />
        <Typography
          variant="h4"
          gutterBottom
          className="order-heading"
          style={{
            textAlign: "center",
            fontWeight: "500",
            marginTop: "10px",
            fontFamily: '"DM Serif Display", serif'
          }}
        >
          Your Orders
        </Typography>
      </Box>
      {orders.length === 0 ? (
        <Typography variant="body1" className="no-orders-message gabarito-hello" >
          You have no orders.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {orders.map((order) => (
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
              key={order._id}
            >
              <Card
                variant="outlined"
                className="order-item"
                sx={{ width: "70%" }}
              >
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ marginBottom: 2 }}
                  >
                    <Box display="flex" alignItems="center">
                      <StorefrontIcon sx={{ marginRight: 1, fontSize: 40 }} />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                          textAlign: "left",
                          fontFamily: "Inter, sans-serif",
                          color: "#333",
                        }}
                      >
                        {`Order number: ${order.orderNumber}`}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                        textAlign: "right",
                        fontFamily: "Inter, sans-serif",
                        color: "#333",
                      }}
                    >
                      {`Order Date: ${new Date(order.date).toLocaleString()}`}
                    </Typography>
                  </Box>
                  {order.items.map((item) => (
                    <Box
                      key={item._id}
                      display="flex"
                      alignItems="center"
                      className="order-item-details"
                      sx={{
                        padding: 1,
                        marginBottom: 2,
                        backgroundColor: "white",
                        borderRadius: "8px",
                      }}
                    >
                      <img
                        className="item-picture"
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "8px",
                          marginRight: "10px",
                          objectFit: "contain",
                        }}
                      />
                      <Box flexGrow={1}>
                        <Typography
                          variant="body2"
                          className="item-title"
                          gutterBottom
                          style={{
                            textAlign: "left",
                            fontFamily: "Inter, sans-serif",
                            fontWeight: "600",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "auto" }}>
                        <Typography
                          variant="body2"
                          className="item-quantity"
                          style={{
                            textAlign: "right",
                            fontFamily: "Inter, sans-serif",
                            fontWeight: "600",
                          }}
                        >
                          Quantity: {item.quantity}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  <Box
                    sx={{
                      textAlign: "right",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Total: S${order.total.toFixed(2)}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Track Order
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#000", color: "#fff" }}
              className="clear-orders-button"
              onClick={clearOrders}
            >
              Clear all orders
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Order;
