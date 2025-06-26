import React, { useState, useContext } from "react";
import { Typography, Container, TextField, Button, Grid
} from "@mui/material";
import { AuthContext } from "../context/Authcontext";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    fullName: "", phoneNumber: "", pincode: "", address: ""
  });

  const handleChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!user || role !== "Customer") {
      toast.error("Login as Customer to place an order");
      return;
    }

    try {
      const res = await axios.post("/newOrder", {
        buyer: user._id,
        shippingData: shippingData
      });

      if (res.data._id) {
        toast.success("Order placed successfully!");
        navigate("/"); // or show Order Success page
      } else {
        toast.error("Failed to place order");
      }
    } catch (err) {
      toast.error("Order error");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h5" mb={3}>Checkout</Typography>
      <form onSubmit={handleOrder}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth label="Full Name" name="fullName" required
              value={shippingData.fullName} onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="Phone Number" name="phoneNumber" required
              value={shippingData.phoneNumber} onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="Pincode" name="pincode" required
              value={shippingData.pincode} onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="Address" name="address" multiline rows={4} required
              value={shippingData.address} onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit" variant="contained" fullWidth sx={{ mt: 3 }}
        >Place Order</Button>
      </form>
    </Container>
  );
};

export default Checkout;
