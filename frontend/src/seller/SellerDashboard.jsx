import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Container
} from "@mui/material";
import axios from "../api/axiosInstance";
import { AuthContext } from "../context/Authcontext";
import { toast } from "react-toastify";
import { Add, Delete, Close } from "@mui/icons-material";

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

const SellerDashboard = () => {
  const { user, role } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    productName: "",
    productImage: "",
    category: "",
    subcategory: "",
    description: "",
    quantity: "",
    price: { mrp: "", cost: "" },
    seller: ""
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isSeller = user && role === "Seller";

  const fetchMyProducts = useCallback(async () => {
    try {
      const res = await axios.get(`/getSellerProducts/${user._id}`);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load your products");
      setProducts([]);
    }
  }, [user._id]);

  useEffect(() => {
    if (isSeller) fetchMyProducts();
  }, [isSeller, fetchMyProducts]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (["mrp", "cost"].includes(name)) {
      setProductForm(prev => ({
        ...prev,
        price: { ...prev.price, [name]: value }
      }));
    } else {
      setProductForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("/ProductCreate", {
        ...productForm,
        seller: user._id
      });
      toast.success("Product added successfully!");
      setOpen(false);
      fetchMyProducts();
      setProductForm({
        productName: "",
        productImage: "",
        category: "",
        subcategory: "",
        description: "",
        quantity: "",
        price: { mrp: "", cost: "" },
        seller: ""
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Product creation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/DeleteProduct/${id}`);
      toast.success("Product deleted successfully");
      fetchMyProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  if (!isSeller) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        textAlign: 'center',
        p: 4
      }}>
        <Typography variant="h4" mb={3} color={colors.dark}>
          Seller Dashboard
        </Typography>
        <Typography variant="h6" mb={4} color={colors.text}>
          Please login as a Seller to access this page
        </Typography>
        <Button
          variant="contained"
          onClick={() => window.location.href = '/login'}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 'bold',
            background: gradientBackground.background,
            '&:hover': {
              opacity: 0.9
            }
          }}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 6,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 3 : 0
      }}>
        <Typography 
          variant="h3" 
          fontWeight="bold"
          sx={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Seller Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 'bold',
            background: gradientBackground.background,
            '&:hover': {
              opacity: 0.9,
              boxShadow: '0 5px 15px rgba(74, 143, 231, 0.3)'
            }
          }}
        >
          Add New Product
        </Button>
      </Box>

      {products.length === 0 ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          textAlign: 'center',
          p: 4,
          border: `1px dashed ${colors.text}`,
          borderRadius: 3,
          backgroundColor: colors.light
        }}>
          <Typography variant="h5" mb={3} color={colors.text}>
            No products found in your inventory
          </Typography>
          <Typography variant="body1" mb={4} color={colors.text}>
            Start by adding your first product to showcase in the marketplace
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpen(true)}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              background: gradientBackground.background,
              '&:hover': {
                opacity: 0.9
              }
            }}
          >
            Add Product
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.productImage}
                  alt={product.productName}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 1
                  }}>
                    <Typography variant="h6" fontWeight="bold">
                      {product.productName}
                    </Typography>
                    <Chip 
                      label={`Qty: ${product.quantity}`} 
                      size="small" 
                      sx={{ 
                        backgroundColor: colors.light,
                        color: colors.dark
                      }} 
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip 
                      label={product.category} 
                      size="small" 
                      sx={{ 
                        backgroundColor: colors.light,
                        color: colors.dark
                      }} 
                    />
                    {product.subcategory && (
                      <Chip 
                        label={product.subcategory} 
                        size="small" 
                        sx={{ 
                          backgroundColor: colors.light,
                          color: colors.dark
                        }} 
                      />
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {product.description?.substring(0, 100)}...
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color={colors.primary} fontWeight="bold">
                      ₹{product.price?.cost}
                    </Typography>
                    {product.price?.mrp > product.price?.cost && (
                      <Typography variant="body2" sx={{ ml: 1, textDecoration: 'line-through' }}>
                        ₹{product.price?.mrp}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
                
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(product._id)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 107, 107, 0.1)'
                      }
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Product Dialog */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.light
        }}>
          <Typography variant="h5" fontWeight="bold">
            Add New Product
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ py: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                name="productName"
                value={productForm.productName}
                onChange={handleInput}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="productImage"
                value={productForm.productImage}
                onChange={handleInput}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={productForm.category}
                onChange={handleInput}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Subcategory"
                name="subcategory"
                value={productForm.subcategory}
                onChange={handleInput}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={productForm.description}
                onChange={handleInput}
                variant="outlined"
                multiline
                rows={3}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                name="quantity"
                value={productForm.quantity}
                onChange={handleInput}
                variant="outlined"
                InputProps={{
                  inputProps: { min: 0 }
                }}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="MRP"
                type="number"
                name="mrp"
                value={productForm.price.mrp}
                onChange={handleInput}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                  inputProps: { min: 0 }
                }}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Selling Price"
                type="number"
                name="cost"
                value={productForm.price.cost}
                onChange={handleInput}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                  inputProps: { min: 0 }
                }}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, borderTop: `1px solid ${colors.light}` }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              color: colors.dark,
              border: `1px solid ${colors.text}`,
              '&:hover': {
                backgroundColor: colors.light
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddProduct}
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              fontWeight: 'bold',
              background: gradientBackground.background,
              '&:hover': {
                opacity: 0.9
              }
            }}
          >
            Create Product
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SellerDashboard;