import * as React from "react";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function Review({ cart, values }) {
  const [addresses, setAddresses] = React.useState([])
  const [payments, setPayments] = React.useState([])
  React.useEffect(() => {
    if (values.address2 === "") {
      setAddresses([values.address1, values.city, values.state, values.zip, values.country]);
    } else {
      setAddresses([values.address1, values.address2, values.city, values.state, values.zip, values.country]);
    }

    const last4Digits = values.cardNumber.replace(/\s/g, "").slice(-4);
    const expirationDate = values.expirationDate.replace(/(\d{2})(\d{2})/, "$1/$2");
    setPayments([
      { name: "Card holder:", detail: values.name },
      { name: "Card number:", detail: `XXXX-XXXX-XXXX-${last4Digits}` },
      { name: "Expiry date:", detail: expirationDate },
    ])
  }, [values]);

  const totalPrice = cart
    .reduce((total, product) => {
      const price = parseFloat(product.price.replace("S$", ""));
      return total + price * product.quantity;
    }, 0)
    .toFixed(2);

  return (
    <Stack spacing={2}>
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>{values.firstName} {values.lastName}</Typography>
          <Typography color="text.secondary" gutterBottom>
            {addresses.join(", ")}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: "100%", mb: 1 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {payment.name}
                  </Typography>
                  <Typography variant="body2">{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}

Review.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Review;
