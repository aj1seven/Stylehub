import React, { useEffect, useState, useContext } from "react";
import {
  Box, Typography, Container, Card, CardContent,
  CardMedia, IconButton, Grid, Button, TextField, Divider, Chip
} from "@mui/material";
import { AuthContext } from "../context/Authcontext";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Delete, ArrowForward, ShoppingCart } from "@mui/icons-material";

// StyleHub color palette
const colors = {
  primary: '#2A5C8D',
  secondary: '#4A8FE7',
  accent: '#FF6B6B',
  light: '#F8F9FA',
  dark: '#212529',
  text: '#495057',
  success: '#4BB543'
};

const gradientBackground = {
  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
};

const Cart = () => {
  const { user, role } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const isCustomer = user && role === "Customer";

  const loadCart = async () => {
    if (!isCustomer) return;
    try {
      const res = await axios.get(`/getCartDetail/${user._id}`);
      setCart(res.data || []);
    } catch (err) {
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  const updateCart = async (newCartItems) => {
    try {
      await axios.put(`/CustomerUpdate/${user._id}`, {
        cartDetails: newCartItems,
      });
      setCart(newCartItems);
      toast.success("Cart updated successfully");
    } catch (err) {
      toast.error("Failed to update cart");
    }
  };

  const handleQtyChange = (index, value) => {
    const newQty = Math.max(1, parseInt(value) || 1);
    const updated = [...cart];
    updated[index].quantity = newQty;
    setCart(updated);
  };

  const handleRemove = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    updateCart(updated);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.price?.cost || 0) * (item.quantity || 1),
    0
  );

  if (!isCustomer) {
    return (
      <Container maxWidth="md" sx={{ 
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        textAlign: 'center'
      }}>
        <ShoppingCart sx={{ fontSize: 80, color: colors.text, opacity: 0.3, mb: 3 }} />
        <Typography variant="h5" mb={2}>
          Please login as a Customer to view your cart
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/login')}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            background: gradientBackground.background,
            '&:hover': {
              opacity: 0.9
            }
          }}
        >
          Login Now
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography 
        variant="h3" 
        fontWeight="bold" 
        mb={6}
        sx={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Your Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          textAlign: 'center'
        }}>
          <ShoppingCart sx={{ fontSize: 80, color: colors.text, opacity: 0.3, mb: 3 }} />
          <Typography variant="h5" mb={3}>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
              background: gradientBackground.background,
              '&:hover': {
                opacity: 0.9
              }
            }}
            endIcon={<ArrowForward />}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cart.map((item, idx) => (
              <Card 
                key={idx} 
                sx={{ 
                  mb: 3,
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box display="flex" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                  <CardMedia
                    component="img"
                    sx={{ 
                      width: { xs: '100%', sm: 200 },
                      height: 200,
                      objectFit: 'cover'
                    }}
                    image={item.productImage}
                    alt={item.productName}
                  />
                  <CardContent sx={{ flex: 1, p: 4 }}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h6" fontWeight="bold">
                        {item.productName}
                      </Typography>
                      <IconButton
                        color="error"
                        onClick={() => handleRemove(idx)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                    
                    <Box display="flex" alignItems="center" mt={1} mb={2}>
                      <Chip 
                        label={item.category} 
                        size="small" 
                        sx={{ 
                          mr: 1,
                          backgroundColor: colors.light,
                          color: colors.dark
                        }} 
                      />
                      <Typography variant="body2" color="text.secondary">
                        Sold by: {item.seller?.shopName || 'Unknown Seller'}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" mt={3}>
                      <Typography variant="h6" fontWeight="bold" color={colors.primary}>
                        ₹{item.price?.cost}
                      </Typography>
                      
                      <Box ml="auto" display="flex" alignItems="center">
                        <Typography variant="body1" mr={2}>
                          Quantity:
                        </Typography>
                        <TextField
                          type="number"
                          size="small"
                          sx={{ 
                            width: 80,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2
                            }
                          }}
                          value={item.quantity}
                          onChange={(e) => handleQtyChange(idx, e.target.value)}
                          inputProps={{ 
                            min: 1,
                            style: { textAlign: 'center' }
                          }}
                        />
                      </Box>
                    </Box>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Typography variant="h6" textAlign="right">
                      Subtotal: ₹{(item.price?.cost * item.quantity).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              p: 4,
              borderRadius: 3,
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              position: 'sticky',
              top: 20
            }}>
              <Typography variant="h5" fontWeight="bold" mb={3}>
                Order Summary
              </Typography>
              
              <Box mb={3}>
                {cart.map((item, idx) => (
                  <Box key={idx} display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body1">
                      {item.productName} × {item.quantity}
                    </Typography>
                    <Typography variant="body1">
                      ₹{(item.price?.cost * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="h6">Subtotal</Typography>
                <Typography variant="h6">₹{total.toFixed(2)}</Typography>
              </Box>
              
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1" color={colors.success}>
                  FREE
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box display="flex" justifyContent="space-between" mb={4}>
                <Typography variant="h5" fontWeight="bold">Total</Typography>
                <Typography variant="h5" fontWeight="bold">
                  ₹{total.toFixed(2)}
                </Typography>
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleCheckout}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  fontSize: 16,
                  background: gradientBackground.background,
                  '&:hover': {
                    opacity: 0.9,
                    boxShadow: '0 5px 15px rgba(74, 143, 231, 0.3)'
                  }
                }}
                endIcon={<ArrowForward />}
              >
                Proceed to Checkout
              </Button>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;