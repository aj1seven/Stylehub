import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Button,
  Rating,
  Divider,
  Chip,
  Avatar,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import { AuthContext } from "../context/Authcontext";
import { toast } from "react-toastify";
import { ShoppingCart, Star, StarBorder } from "@mui/icons-material";

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

const ProductDetail = () => {
  const { id } = useParams();
  const { user, role } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState({ rating: 0, comment: "" });
  const [quantity, setQuantity] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/getProductDetail/${id}`);
      setProduct(res.data);
    } catch (err) {
      toast.error("Failed to load product details");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user || role !== "Customer") {
      toast.error("Please login as a customer to leave a review");
      return;
    }

    try {
      const res = await axios.put(`/addReview/${id}`, {
        ...review,
        reviewer: user._id
      });
      toast.success("Review submitted successfully!");
      setReview({ rating: 0, comment: "" });
      setProduct(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    }
  };

  const handleAddToCart = async () => {
    try {
      await axios.put(`/CustomerUpdate/${user._id}`, {
        cartDetails: [...(user.cartDetails || []), { 
          productId: product._id, 
          quantity: quantity 
        }]
      });
      toast.success("Added to cart successfully!");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) ? 1 : Math.max(1, value));
  };

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Loading product details...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={6}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
          }}>
            <CardMedia
              component="img"
              height={isMobile ? 300 : 500}
              image={product.productImage}
              alt={product.productName}
              sx={{ objectFit: 'contain', p: isMobile ? 2 : 4 }}
            />
          </Card>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Chip 
              label={product.category} 
              size="small" 
              sx={{ 
                backgroundColor: colors.light,
                color: colors.dark,
                mb: 2
              }} 
            />
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              gutterBottom
              sx={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {product.productName}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Rating 
                value={product.averageRating || 0} 
                readOnly 
                precision={0.5}
                emptyIcon={<StarBorder sx={{ color: colors.text }} />}
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                ({product.reviews?.length || 0} reviews)
              </Typography>
            </Box>
            
            <Typography variant="body1" color="text.secondary" mb={4}>
              {product.description}
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" fontWeight="bold" color={colors.primary}>
                ₹{product.price?.cost}
              </Typography>
              {product.price?.mrp > product.price?.cost && (
                <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
                  MRP: ₹{product.price?.mrp}
                </Typography>
              )}
            </Box>
            
            <Typography variant="subtitle1" mb={2}>
              Sold by: <span style={{ fontWeight: 'bold' }}>{product.seller?.shopName}</span>
            </Typography>
            
            {role === "Customer" && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <TextField
                  type="number"
                  size="small"
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{ min: 1 }}
                  sx={{ width: 80 }}
                />
                <Button
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
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
                  Add to Cart
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Reviews Section */}
      <Box mt={8}>
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          mb={4}
          sx={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Customer Reviews
        </Typography>
        
        {product.reviews?.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No reviews yet. Be the first to review!
          </Typography>
        ) : (
          <Box>
            {product.reviews.map((review) => (
              <Card 
                key={review._id} 
                sx={{ 
                  mb: 3, 
                  p: 3,
                  borderRadius: 3,
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={review.reviewer?.profileImage} 
                    sx={{ 
                      width: 40, 
                      height: 40,
                      mr: 2,
                      backgroundColor: colors.light,
                      color: colors.dark
                    }}
                  >
                    {review.reviewer?.name?.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold">{review.reviewer?.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(review.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                
                <Rating 
                  value={review.rating} 
                  readOnly 
                  sx={{ mb: 1 }}
                  emptyIcon={<StarBorder sx={{ color: colors.text }} />}
                />
                
                <Typography>{review.comment}</Typography>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {/* Add Review Form */}
      {role === "Customer" && (
        <Box mt={8}>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            mb={4}
            sx={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Write a Review
          </Typography>
          
          <Card sx={{ p: 4, borderRadius: 3 }}>
            <form onSubmit={handleReviewSubmit}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" mb={1}>Your Rating</Typography>
                <Rating
                  name="rating"
                  value={review.rating}
                  onChange={(e, newValue) => setReview({ ...review, rating: newValue })}
                  size="large"
                  emptyIcon={<StarBorder sx={{ color: colors.text }} />}
                  required
                />
              </Box>
              
              <TextField
                fullWidth
                label="Your Review"
                name="comment"
                multiline
                rows={4}
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                required
                sx={{ mb: 3 }}
              />
              
              <Button
                type="submit"
                variant="contained"
                size="large"
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
                Submit Review
              </Button>
            </form>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetail;