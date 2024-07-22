import * as React from "react";

import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm({ values, errors, handleInput }) {
  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="firstName"
          name="firstName"
          type="firstName"
          placeholder="John"
          autoComplete="first name"
          required
          onChange={handleInput}
        />
        {errors.firstName && (
          <Grid item xs={12}>
            <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.firstName}</p>
          </Grid>
        )}
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="last-name" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="lastName"
          name="lastName"
          type="lastName"
          placeholder="Snow"
          autoComplete="last name"
          required
          onChange={handleInput}
        />
        {errors.lastName && (
          <Grid item xs={12}>
            <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.lastName}</p>
          </Grid>
        )}
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address1" required>
          Address line 1
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="address1"
          placeholder="Street name and number"
          autoComplete="shipping address-line1"
          required
          onChange={handleInput}
        />
        {errors.address1 && (
          <Grid item xs={12}>
            <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.address1}</p>
          </Grid>
        )}
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address2">Address line 2</FormLabel>
        <OutlinedInput
          id="address2"
          name="address2"
          type="address2"
          placeholder="Apartment, suite, unit, etc. (optional)"
          autoComplete="shipping address-line2"
          required
          onChange={handleInput}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="city"
          placeholder="New York"
          autoComplete="City"
          required
          onChange={handleInput}
        />
        {errors.city && (
          <Grid item xs={12}>
            <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.city}</p>
          </Grid>
        )}
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="state" required>
          State
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="state"
          placeholder="NY"
          autoComplete="State"
          required
          onChange={handleInput}
        />
        {errors.state && (
          <Grid item xs={12}>
            <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.state}</p>
          </Grid>
        )}
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder="12345"
          autoComplete="shipping postal-code"
          required
          onChange={handleInput}
        />
        {errors.zip && (
          <Grid item xs={12}>
            <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.zip}</p>
          </Grid>
        )}
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="country"
          placeholder="United States"
          autoComplete="shipping country"
          required
          onChange={handleInput}
        />
        {errors.country && (
          <Grid item xs={12}>
            <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.country}</p>
          </Grid>
        )}
      </FormGrid>
    </Grid>
  );
}
