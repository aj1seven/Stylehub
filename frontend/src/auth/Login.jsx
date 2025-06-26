import React, { useState, useContext } from "react";
import axios from "../api/axiosInstance";
import { AuthContext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, TextField, Typography, Select, MenuItem, InputAdornment,
  Container, Grid, Card, Divider, IconButton, useTheme, useMediaQuery
} from "@mui/material";
import { toast } from "react-toastify";
import { Email, Lock, Person, ArrowForward } from "@mui/icons-material";
import { keyframes } from "@emotion/react";

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

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [role, setRole] = useState("Customer");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = role === "Customer" ? "/CustomerLogin" : "/SellerLogin";

    try {
      const res = await axios.post(endpoint, form);
      if (res.data.token) {
        login(res.data, res.data.token, role);
        toast.success("Login successful!");
        navigate(role === "Customer" ? "/" : "/seller/dashboard");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.light,
      p: isMobile ? 2 : 0
    }}>
      <Container maxWidth="lg" sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
        <Card sx={{
          width: '100%',
          maxWidth: 1000,
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          height: isMobile ? 'auto' : 600
        }}>
          {/* Left Side - Graphic */}
          <Box sx={{
            width: isMobile ? '100%' : '40%',
            ...gradientBackground,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: isMobile ? 4 : 6,
            textAlign: 'center',
            color: 'white'
          }}>
            <Box sx={{
              width: 180,
              height: 180,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid rgba(255,255,255,0.2)',
              mb: 4,
              animation: `${floatAnimation} 6s infinite ease-in-out`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Login Illustration" 
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} 
              />
            </Box>
            
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome Back!
            </Typography>
            <Typography variant="body1" sx={{ 
              opacity: 0.9, 
              mb: 4,
              px: isMobile ? 0 : 2
            }}>
              Sign in to access your personalized dashboard
            </Typography>
            
            <Divider sx={{ 
              width: '60%', 
              my: 3, 
              borderColor: 'rgba(255,255,255,0.3)' 
            }} />
            
            <Button
              variant="outlined"
              fullWidth={isMobile}
              onClick={() => navigate('/register')}
              sx={{
                borderRadius: 50,
                px: 4,
                py: 1.5,
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Create New Account
            </Button>
          </Box>

          {/* Right Side - Form */}
          <Box sx={{
            width: isMobile ? '100%' : '60%',
            p: isMobile ? 4 : 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'white'
          }}>
            <Box sx={{ 
              maxWidth: 400,
              mx: 'auto',
              width: '100%'
            }}>
              <Typography 
                variant="h4" 
                fontWeight="bold" 
                gutterBottom
                sx={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}
              >
                StyleHub Login
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={4}>
                Enter your credentials to continue
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ mr: 1 }}>
                            <Email color="action" />
                          </InputAdornment>
                        ),
                        sx: { 
                          borderRadius: 2,
                          height: 56
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ mr: 1 }}>
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                        sx: { 
                          borderRadius: 2,
                          height: 56
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Select
                      fullWidth
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      sx={{ 
                        borderRadius: 2,
                        height: 56
                      }}
                      startAdornment={
                        <InputAdornment position="start" sx={{ mr: 1 }}>
                          <Person color="action" />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="Customer">Customer</MenuItem>
                      <MenuItem value="Seller">Seller</MenuItem>
                    </Select>
                  </Grid>
                  
                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 'bold',
                        fontSize: 16,
                        background: gradientBackground.background,
                        '&:hover': {
                          opacity: 0.9,
                          transform: 'translateY(-1px)',
                          boxShadow: '0 4px 12px rgba(74, 143, 231, 0.3)'
                        }
                      }}
                      endIcon={<ArrowForward />}
                    >
                      Login
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Button 
                        variant="text" 
                        size="small"
                        onClick={() => navigate('/forgot-password')}
                        sx={{ 
                          color: colors.text,
                          textTransform: 'none',
                          fontSize: 14
                        }}
                      >
                        Forgot password?
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>

              <Divider sx={{ my: 4 }}>
                <Typography variant="caption" color="text.secondary">
                  OR CONTINUE WITH
                </Typography>
              </Divider>

              <Grid container spacing={2}>
                {['Google', 'Facebook', 'Apple'].map((provider) => (
                  <Grid item xs={12} sm={4} key={provider}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        py: 1.5,
                        textTransform: 'none',
                        borderColor: 'rgba(0,0,0,0.1)',
                        '&:hover': {
                          borderColor: colors.primary
                        }
                      }}
                    >
                      {provider}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;