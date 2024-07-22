import * as React from "react";

import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SimCardRoundedIcon from "@mui/icons-material/SimCardRounded";

import { styled } from "@mui/system";

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function PaymentForm({ values, errors, handleInput }) {
  const [cardNumber, setCardNumber] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [expirationDate, setExpirationDate] = React.useState("");



  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
    handleInput(event)
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
    }
    handleInput(event)
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
    handleInput(event)
  };
  
  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
              height: { xs: 300, sm: 350, md: 375 },
              width: "100%",
              borderRadius: "20px",
              border: "1px solid ",
              borderColor: "divider",
              backgroundColor: "background.paper",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle2">Credit card</Typography>
              <CreditCardRoundedIcon sx={{ color: "text.secondary" }} />
            </Box>
            <SimCardRoundedIcon
              sx={{
                fontSize: { xs: 48, sm: 56 },
                transform: "rotate(90deg)",
                color: "text.secondary",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-number" required>
                  Card number
                </FormLabel>
                <OutlinedInput
                  id="cardNumber"
                  autoComplete="cardNumber"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
                {errors.cardNumber && (
                  <Grid item xs={12}>
                    <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.cardNumber}</p>
                  </Grid>
                )}
              </FormGrid>
              <FormGrid sx={{ maxWidth: "20%" }}>
                <FormLabel htmlFor="cvv" required>
                  CVV
                </FormLabel>
                <OutlinedInput
                  id="cvv"
                  autoComplete="cvv"
                  name="cvv"
                  placeholder="123"
                  required
                  value={cvv}
                  onChange={handleCvvChange}
                />
                {errors.cvv && (
                  <Grid item xs={12}>
                    <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.cvv}</p>
                  </Grid>
                )}
              </FormGrid>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-name" required>
                  Name
                </FormLabel>
                <OutlinedInput
                  id="name"
                  autoComplete="name"
                  name="name"
                  placeholder="John Smith"
                  required
                  onChange={handleInput}
                />
                {errors.name && (
                  <Grid item xs={12}>
                    <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.name}</p>
                  </Grid>
                )}
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-expiration" required>
                  Expiration date
                </FormLabel>
                <OutlinedInput
                  id="expirationDate"
                  autoComplete="expirationDate"
                  name="expirationDate"
                  placeholder="MM/YY"
                  required
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                />
                {errors.expirationDate && (
                  <Grid item xs={12}>
                    <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.expirationDate}</p>
                  </Grid>
                )}
              </FormGrid>
            </Box>
          </Box>
      </Box>
    </Stack>
  );
}
