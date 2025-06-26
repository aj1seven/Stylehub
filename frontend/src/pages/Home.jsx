import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box,
  Grid, Card, CardMedia, CardContent, Container, Chip, TextField,
  InputAdornment, IconButton, Divider, Avatar, useScrollTrigger, Slide
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import { LocalShipping, Payment, VerifiedUser, Email, Menu, Close, ShoppingCart, Search, Favorite } from '@mui/icons-material';
import { keyframes } from '@emotion/react';

// Animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

// Color palette
const colors = {
  primary: '#2A5C8D',       // Deep blue
  secondary: '#4A8FE7',     // Bright blue
  accent: '#FF6B6B',        // Coral
  light: '#F8F9FA',         // Light gray
  dark: '#212529',          // Dark gray
  text: '#495057',          // Medium gray
  success: '#4BB543'        // Green
};

const gradientBackground = {
  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
};

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/getProducts');
      if (Array.isArray(res.data)) setProducts(res.data.slice(0, 6));
    } catch (error) {
      console.log("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ overflowX: 'hidden', backgroundColor: colors.light }}>
      {/* Modern Navbar with Higher Contrast */}
      <HideOnScroll>
        <AppBar
          position="fixed"
          sx={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            color: colors.dark,
            boxShadow: '0 2px 30px rgba(0,0,0,0.15)',
            borderBottom: `1px solid rgba(0,0,0,0.1)`,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mr: 4
                  }}
                >
                  StyleHub
                </Typography>
                
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                  <Button 
                    color="inherit" 
                    sx={{ 
                      fontWeight: 600,
                      '&:hover': {
                        color: colors.primary
                      }
                    }}
                  >
                    Home
                  </Button>
                  <Button 
                    color="inherit" 
                    sx={{ 
                      fontWeight: 600,
                      '&:hover': {
                        color: colors.primary
                      }
                    }}
                  >
                    Shop
                  </Button>
                  <Button 
                    color="inherit" 
                    sx={{ 
                      fontWeight: 600,
                      '&:hover': {
                        color: colors.primary
                      }
                    }}
                  >
                    Collections
                  </Button>
                  <Button 
                    color="inherit" 
                    sx={{ 
                      fontWeight: 600,
                      '&:hover': {
                        color: colors.primary
                      }
                    }}
                  >
                    About
                  </Button>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  size="small"
                  placeholder="Search..."
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    sx: { 
                      borderRadius: 50, 
                      height: 40,
                      backgroundColor: 'rgba(0,0,0,0.05)'
                    }
                  }}
                  sx={{ display: { xs: 'none', sm: 'block' }, width: 200 }}
                />
                
                <IconButton color="inherit" sx={{ color: colors.dark }}>
                  <ShoppingCart />
                </IconButton>
                
                <IconButton 
                  color="inherit" 
                  sx={{ 
                    display: { xs: 'block', md: 'none' },
                    color: colors.dark 
                  }} 
                  onClick={handleDrawerToggle}
                >
                  {mobileOpen ? <Close /> : <Menu />}
                </IconButton>
                
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/login')}
                    sx={{ 
                      borderRadius: 50, 
                      px: 3,
                      borderColor: colors.primary,
                      color: colors.primary,
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'rgba(42, 92, 141, 0.05)',
                        borderColor: colors.primary
                      }
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/register')}
                    sx={{
                      borderRadius: 50,
                      px: 3,
                      fontWeight: 600,
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                        opacity: 0.9,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Menu */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'white',
          zIndex: 1100,
          display: mobileOpen ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
        }}
      >
        <IconButton
          sx={{ position: 'absolute', top: 20, right: 20, color: colors.dark }}
          onClick={handleDrawerToggle}
        >
          <Close />
        </IconButton>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'center' }}>
          <Button variant="text" sx={{ fontSize: 24, color: colors.dark }}>Home</Button>
          <Button variant="text" sx={{ fontSize: 24, color: colors.dark }}>Shop</Button>
          <Button variant="text" sx={{ fontSize: 24, color: colors.dark }}>Collections</Button>
          <Button variant="text" sx={{ fontSize: 24, color: colors.dark }}>About</Button>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/login')}
              sx={{ 
                borderRadius: 50, 
                px: 3,
                borderColor: colors.primary,
                color: colors.primary
              }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/register')}
              sx={{
                borderRadius: 50,
                px: 3,
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Hero Section with Perfect Alignment */}
      <Box
        sx={{
          minHeight: '100vh',
          pt: '80px',
          position: 'relative',
          overflow: 'hidden',
          ...gradientBackground,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="xl">
          <Grid 
            container 
            spacing={6} 
            alignItems="center"
            sx={{ 
              position: 'relative',
              zIndex: 1 
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{
                  color: 'white',
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Curated Fashion for Modern Lifestyles
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  mb: 4,
                  maxWidth: '500px',
                }}
              >
                Discover handpicked collections from independent designers and global brands.
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontWeight: 'bold',
                    borderRadius: 50,
                    bgcolor: 'white',
                    color: colors.primary,
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    }
                  }}
                  onClick={() => navigate('/login')}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontWeight: 'bold',
                    borderRadius: 50,
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }
                  }}
                >
                  Explore
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '600px',
                  animation: `${floatAnimation} 6s infinite ease-in-out`,
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Fashion Model"
                  sx={{
                    width: '100%',
                    borderRadius: 4,
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -30,
                    right: -30,
                    bgcolor: 'white',
                    p: 2,
                    borderRadius: 4,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    width: '200px',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">New Collection</Typography>
                  <Typography fontWeight="bold">Summer '23</Typography>
                  <Typography variant="caption" color={colors.accent}>30% OFF</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Brand Showcase */}
      <Box sx={{ py: 6, backgroundColor: 'white' }}>
        <Container maxWidth="xl">
          <Typography variant="h6" textAlign="center" color="text.secondary" mb={4}>
            FEATURED BRANDS
          </Typography>
          <Grid container justifyContent="center" spacing={6}>
            {['Nike', 'Adidas', 'Levi\'s', 'Zara', 'H&M'].map((brand) => (
              <Grid item key={brand}>
                <Typography variant="h6" fontWeight="bold" color={colors.text}>
                  {brand}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="xl" sx={{ py: 10, backgroundColor: 'white' }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={8}
          sx={{
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '3px',
              background: colors.secondary,
              borderRadius: 2,
            }
          }}
        >
          Why Choose StyleHub
        </Typography>
        
        <Grid container spacing={6} justifyContent="center">
          {[
            { 
              icon: <LocalShipping sx={{ fontSize: 40, color: colors.secondary }} />,
              title: "Free Shipping",
              description: "Free delivery on all orders over $50"
            },
            { 
              icon: <Payment sx={{ fontSize: 40, color: colors.secondary }} />,
              title: "Secure Payments",
              description: "256-bit encryption for all transactions"
            },
            { 
              icon: <VerifiedUser sx={{ fontSize: 40, color: colors.secondary }} />,
              title: "Quality Guarantee",
              description: "30-day return policy on all items"
            },
          ].map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: 'center',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(74, 143, 231, 0.1)',
                    margin: '0 auto 20px',
                  }}
                >
                  {benefit.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" mb={1}>{benefit.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {benefit.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products */}
      <Box sx={{ py: 10, backgroundColor: colors.light }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
            <Typography variant="h4" fontWeight="bold" color={colors.dark}>
              Featured Products
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 50,
                px: 4,
                textTransform: 'none',
                borderColor: colors.primary,
                color: colors.primary,
                '&:hover': {
                  backgroundColor: 'rgba(42, 92, 141, 0.05)',
                }
              }}
            >
              View All
            </Button>
          </Box>
          
          <Grid container spacing={4}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <Card
                  onClick={() => navigate(`/product/${product._id}`)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    backgroundColor: 'white',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', flex: 1 }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={product.productImage}
                      alt={product.productName}
                      sx={{ 
                        objectFit: 'cover',
                        width: '100%',
                        borderTopLeftRadius: 3,
                        borderTopRightRadius: 3
                      }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        '&:hover': {
                          backgroundColor: 'white',
                          color: colors.accent,
                        }
                      }}
                    >
                      <Favorite />
                    </IconButton>
                    {product.price?.cost < product.price?.mrp * 0.7 && (
                      <Chip
                        label="Sale"
                        color="error"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 10,
                          left: 10,
                          fontWeight: 'bold',
                        }}
                      />
                    )}
                  </Box>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" mb={0.5}>
                      {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {product.category}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" fontWeight="bold" color={colors.primary}>
                        ${product.price?.cost}
                      </Typography>
                      {product.price?.cost < product.price?.mrp && (
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: 'line-through',
                            color: colors.text,
                          }}
                        >
                          ${product.price?.mrp}
                        </Typography>
                      )}
                      {product.price?.cost < product.price?.mrp && (
                        <Typography
                          variant="caption"
                          sx={{
                            ml: 'auto',
                            color: colors.success,
                            fontWeight: 'bold',
                          }}
                        >
                          {Math.round(
                            (1 - product.price?.cost / product.price?.mrp) * 100
                          )}
                          % OFF
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Footer */}
      <Box sx={{ py: 8, backgroundColor: colors.dark, color: 'white' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
                sx={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '2rem'
                }}
              >
                StyleHub
              </Typography>
              <Typography variant="body1" color="rgba(255,255,255,0.7)" mb={3}>
                Your premier destination for quality fashion and accessories. We bring you the latest trends at affordable prices.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {['Facebook', 'Twitter', 'Instagram', 'Pinterest'].map((social) => (
                  <IconButton
                    key={social}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': {
                        backgroundColor: colors.secondary,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {social[0]}
                  </IconButton>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={6} sm={4} md={2}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {['Home', 'Shop', 'Collections', 'About'].map((item) => (
                  <Typography
                    key={item}
                    variant="body1"
                    color="rgba(255,255,255,0.7)"
                    sx={{
                      '&:hover': {
                        color: colors.secondary,
                        cursor: 'pointer',
                        transform: 'translateX(5px)',
                        transition: 'all 0.3s ease'
                      },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={6} sm={4} md={3}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Customer Service
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {['Contact Us', 'FAQs', 'Shipping Policy', 'Returns & Exchanges'].map((item) => (
                  <Typography
                    key={item}
                    variant="body1"
                    color="rgba(255,255,255,0.7)"
                    sx={{
                      '&:hover': {
                        color: colors.secondary,
                        cursor: 'pointer',
                        transform: 'translateX(5px)',
                        transition: 'all 0.3s ease'
                      },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Stay Updated
              </Typography>
              <Typography variant="body1" color="rgba(255,255,255,0.7)" mb={2}>
                Subscribe to our newsletter for the latest updates and offers.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Your email"
                  variant="outlined"
                  sx={{
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255,255,255,0.5)',
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.secondary,
                    '&:hover': {
                      backgroundColor: colors.primary,
                    }
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 6, backgroundColor: 'rgba(255,255,255,0.1)' }} />
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="body1" color="rgba(255,255,255,0.7)">
              © {new Date().getFullYear()} StyleHub. All rights reserved.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Typography
                variant="body1"
                color="rgba(255,255,255,0.7)"
                sx={{ 
                  '&:hover': { 
                    color: colors.secondary,
                    cursor: 'pointer'
                  } 
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="body1"
                color="rgba(255,255,255,0.7)"
                sx={{ 
                  '&:hover': { 
                    color: colors.secondary,
                    cursor: 'pointer'
                  } 
                }}
              >
                Terms of Service
              </Typography>
              <Typography
                variant="body1"
                color="rgba(255,255,255,0.7)"
                sx={{ 
                  '&:hover': { 
                    color: colors.secondary,
                    cursor: 'pointer'
                  } 
                }}
              >
                Cookies
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <img 
                src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_960_720.png" 
                alt="PayPal" 
                style={{ height: 24, filter: 'brightness(0) invert(1)' }} 
              />
              <img 
                src="https://cdn.pixabay.com/photo/2021/12/07/12/06/visa-6851681_960_720.png" 
                alt="Visa" 
                style={{ height: 24, filter: 'brightness(0) invert(1)' }} 
              />
              <img 
                src="https://cdn.pixabay.com/photo/2015/05/26/09/37/master-card-784405_960_720.png" 
                alt="Mastercard" 
                style={{ height: 24, filter: 'brightness(0) invert(1)' }} 
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;