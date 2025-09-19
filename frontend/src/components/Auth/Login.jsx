import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  AppBar,
  Toolbar,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  Home, 
  Dashboard, 
  Warning 
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import SocialLogin from './SocialLogin';
// Import your image
import splashImage from '../../assets/first.png';

// Splash Screen Component
const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500); // Reduced splash time to 3.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Box
      sx={{
        textAlign: 'center',
        color: 'white',
        maxWidth: '900px',
        width: '100%',
        px: 4,
      }}
    >
      {/* Single Image Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '700px',
            margin: '0 auto',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
            mb: 3,
            position: 'relative',
          }}
        >
          <img
            src={splashImage}
            alt="Insurance Policy Automation"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              maxHeight: '400px',
              objectFit: 'cover',
            }}
          />
          
          {/* Text overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%, rgba(0, 0, 0, 0.4) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  mb: 1,
                  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
                  fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
                  letterSpacing: '2px',
                }}
              >
                InsurAI
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: 300,
                  textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
                  fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' },
                  letterSpacing: '1px',
                }}
              >
                Insurance Policy Automation with AI
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </motion.div>

      {/* Loading Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.8 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mt: 2,
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 300,
              letterSpacing: '1px',
            }}
          >
            Loading
          </Typography>
          <Box sx={{ display: 'flex', gap: '4px' }}>
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: index * 0.15,
                  ease: "easeInOut",
                }}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#60a5fa',
                  boxShadow: '0 0 8px rgba(96, 165, 250, 0.6)',
                }}
              />
            ))}
          </Box>
        </Box>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
        style={{
          height: '2px',
          backgroundColor: '#60a5fa',
          borderRadius: '2px',
          marginTop: '20px',
          maxWidth: '250px',
          margin: '20px auto 0',
          boxShadow: '0 0 10px rgba(96, 165, 250, 0.5)',
          transformOrigin: 'left',
        }}
      />
    </Box>
  );
};

// Main Login Component
const Login = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  
  const isAuthenticated = localStorage.getItem('userToken') || false;

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    console.log("Login attempt:", formData);

    const response = await fetch(`http://localhost:8081/api/auth/login?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`, {
      method: "POST"
    });

    if (response.ok) {
      const token = await response.text(); // your backend returns JWT as plain string
      localStorage.setItem("userToken", token); // store JWT
      console.log(token);
      navigate("/dashboard");
    } else {
      const errorMsg = await response.text();
      setError(errorMsg || "Invalid email or password");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const handleDashboardClick = () => {
    if (!isAuthenticated) {
      setAuthDialogOpen(true);
    } else {
      navigate('/dashboard');
    }
  };

  const handleAuthDialogClose = () => {
    setAuthDialogOpen(false);
  };

  const handleSignUpFromDialog = () => {
    setAuthDialogOpen(false);
    navigate('/register');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 0.95,
            filter: "blur(5px)"
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut"
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <SplashScreen onComplete={handleSplashComplete} />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial={{ 
            opacity: 0,
            scale: 1.05,
            filter: "blur(5px)"
          }}
          animate={{ 
            opacity: 1,
            scale: 1,
            filter: "blur(0px)"
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          <Box
            sx={{
              minHeight: '100vh',
              background: `
                linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(59, 130, 246, 0.8) 100%),
                url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
              `,
              backgroundAttachment: 'fixed',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Navigation Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AppBar 
                position="static" 
                sx={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(15px)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                }}
              >
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    InsurAI
                  </Typography>
                  
                  <Button
                    color="inherit"
                    startIcon={<Home />}
                    onClick={() => navigate('/')}
                    sx={{ mr: 2, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                  >
                    Home
                  </Button>
                  
                  <Button
                    color="inherit"
                    startIcon={<Dashboard />}
                    onClick={handleDashboardClick}
                    sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                  >
                    Dashboard
                  </Button>
                </Toolbar>
              </AppBar>
            </motion.div>

            {/* Main Content */}
            <Container maxWidth="sm" sx={{ flex: 1, display: 'flex', alignItems: 'center', py: 4 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ width: '100%' }}
              >
                <Paper
                  elevation={24}
                  sx={{
                    width: '100%',
                    p: 4,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                  }}
                >
                  <Box textAlign="center" mb={4}>
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
                      Welcome Back
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Sign in to your InsurAI account
                    </Typography>
                  </Box>

                  <Box component="form" onSubmit={handleSubmit}>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <Alert severity="error" sx={{ mb: 2 }}>
                          {error}
                        </Alert>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <TextField
                        fullWidth
                        name="email"
                        type="email"
                        label="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        margin="normal"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <TextField
                        fullWidth
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        margin="normal"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                          mt: 3,
                          mb: 2,
                          py: 1.5,
                          borderRadius: 2,
                          background: 'linear-gradient(45deg, #1e3a8a, #3b82f6)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1e40af, #2563eb)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {loading ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <SocialLogin
                        onGoogleLogin={handleGoogleLogin}
                        onFacebookLogin={handleFacebookLogin}
                      />

                      <Box textAlign="center">
                        <Typography variant="body2" color="text.secondary">
                          Don't have an account?{' '}
                          <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/register')}
                            sx={{ 
                              fontWeight: 500,
                              '&:hover': { textDecoration: 'none' },
                            }}
                          >
                            Sign up here
                          </Link>
                        </Typography>
                      </Box>
                    </motion.div>
                  </Box>
                </Paper>
              </motion.div>
            </Container>

            {/* Authentication Required Dialog */}
            <Dialog
              open={authDialogOpen}
              onClose={handleAuthDialogClose}
              maxWidth="sm"
              fullWidth
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                },
              }}
            >
              <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
                <Warning color="warning" sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="h5" component="div" fontWeight="bold">
                  Authentication Required
                </Typography>
              </DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ textAlign: 'center', fontSize: '1.1rem', mb: 2 }}>
                  Please login or sign up first to access the dashboard content.
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 2 }}>
                <Button
                  onClick={handleAuthDialogClose}
                  variant="outlined"
                  sx={{ borderRadius: 2, px: 3, py: 1 }}
                >
                  Stay Here & Login
                </Button>
                <Button
                  onClick={handleSignUpFromDialog}
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    px: 3, 
                    py: 1,
                    background: 'linear-gradient(45deg, #1e3a8a, #3b82f6)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1e40af, #2563eb)',
                    },
                  }}
                >
                  Sign Up Now
                </Button>
              </DialogActions>
            </Dialog>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Box
                component="footer"
                sx={{
                  py: 2,
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  © 2025 InsurAI. All rights reserved by Eswar.
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Login;
