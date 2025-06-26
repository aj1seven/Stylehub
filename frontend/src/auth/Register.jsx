import React, { useState, useContext } from "react";
import axios from "../api/axiosInstance";
import { AuthContext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, TextField, Typography, Select, MenuItem
} from "@mui/material";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    name: "", email: "", password: "", shopName: ""
  });
  const [role, setRole] = useState("Customer");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = role === "Customer" ? "/CustomerRegister" : "/SellerRegister";

    try {
      const payload = { ...form };
      if (role === "Customer") delete payload.shopName;

      const res = await axios.post(endpoint, payload);
      if (res.data.token) {
        login(res.data, res.data.token, role);
        toast.success("Registration successful!");
        navigate(role === "Customer" ? "/" : "/seller/dashboard");
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Error registering");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Typography variant="h5" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name" name="name" fullWidth margin="normal"
          value={form.name} onChange={handleChange} required
        />
        <TextField
          label="Email" name="email" fullWidth margin="normal"
          value={form.email} onChange={handleChange} required
        />
        <TextField
          label="Password" name="password" type="password"
          fullWidth margin="normal" value={form.password}
          onChange={handleChange} required
        />
        {role === "Seller" && (
          <TextField
            label="Shop Name" name="shopName"
            fullWidth margin="normal" value={form.shopName}
            onChange={handleChange} required
          />
        )}
        <Select fullWidth value={role} onChange={(e) => setRole(e.target.value)}>
          <MenuItem value="Customer">Customer</MenuItem>
          <MenuItem value="Seller">Seller</MenuItem>
        </Select>
        <Button
          type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}
        >Register</Button>
      </form>
    </Box>
  );
};

export default Register;
