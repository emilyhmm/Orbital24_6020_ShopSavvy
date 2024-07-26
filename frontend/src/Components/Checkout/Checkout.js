import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import AddressForm from "./AddressForm";
import getCheckoutTheme from "./getCheckoutTheme";
import Info from "./Info";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext"
import { CartContext } from "../../Contexts/CartContext"
import { AddressValidation, CardValidation } from "./PaymentValidation";
import axios from 'axios';
import '../../App.css'

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout({ cart, setCart }) {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = React.useState(0);
  const { isLoggedIn } = React.useContext(AuthContext);
  const { fetchCart } = React.useContext(CartContext)
  const [orderNumber, setOrderNumber] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    name: "",
  });

  const handleNext = async() => {
    setErrors({});
    if (activeStep === 0) {
      const validationErrors = await AddressValidation(values);
      if (Object.keys(validationErrors).length !== 0) {
        setErrors(validationErrors);
      } else {
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep === 1) {
      const validationErrors = await CardValidation(values);
      console.log(values)
      if (Object.keys(validationErrors).length !== 0) {
        setErrors(validationErrors);
      } else {
        setActiveStep(activeStep + 1);
      }
    } else {
      setActiveStep(activeStep + 1);
    };
  }

  const handleBack = () => {
    if (activeStep === 1) {
      setValues({
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",})
    } else if (activeStep === 2) {
      setValues({
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        name: "",})
    }
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/order/create`, 
        { items: cart }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      setOrderNumber(response.data.orderNumber)
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/cart/clear`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      setCart([])
      fetchCart()
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const handleButtonClick = async() => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    }
    handleNext();
  };

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function getStepContent(step, { cart }) {
    switch (step) {
      case 0:
        return <AddressForm values={values} errors={errors} handleInput={handleInput} />;
      case 1:
        return <PaymentForm values={values} errors={errors} handleInput={handleInput} />;
      case 2:
        return <Review cart={cart} values={values} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme} >
      <CssBaseline />
      <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }}>
        <Grid
          item
          xs={12}
          sm={5}
          lg={4}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 4,
            px: 10,
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              height: 150,
            }}
          >
            {isLoggedIn ? (
              <Link to = '/checkout'>
                <Button
                  startIcon={<ArrowBackRoundedIcon />}
                  component="a"
                  sx={{ ml: "-8px" }}
                >
                  Back to cart
                </Button>
              </Link>
            ) : (
              <Link to = "/login">
                <Button
                  startIcon={<ArrowBackRoundedIcon />}
                  component="a"
                  sx={{ ml: "-8px" }}
                >
                  Back to cart
                </Button>
              </Link>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info cart={cart} />
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={7}
          lg={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "flex-end" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
                height: 150,
              }}
            >
              <h1 className="dm-serif-display-regular" >Complete your purchase</h1>
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{
                  width: "100%",
                  height: 40,
                }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-child": { pl: 0 },
                      ":last-child": { pr: 0 },
                    }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card
            sx={{
              display: { xs: "flex", md: "none" },
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                ":last-child": { pb: 2 },
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  {activeStep >= 2 ? "$144.97" : "$134.98"}
                </Typography>
              </div>
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">Thank you for shopping with ShopSavvy!</Typography>
                <Typography variant="body1" color="text.secondary">
                  Your order number is
                  <strong>&nbsp;{orderNumber}</strong>. You can check your order details now.
                </Typography>
                <Link to="/order">
                  <Button
                    variant="contained"
                    sx={{
                      alignSelf: "start",
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    Go to my orders
                  </Button>
                </Link>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, { cart })}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    justifyContent:
                      activeStep !== 0 ? "space-between" : "flex-end",
                    alignItems: "end",
                    flexGrow: 1,
                    gap: 1,
                    pb: { xs: 12, sm: 0 },
                    mb: "200px",
                  }}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                    >
                      Previous
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleButtonClick}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
