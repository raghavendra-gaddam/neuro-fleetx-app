// Dashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Chip,
  Avatar,
  AppBar,
  Toolbar,
  Badge,
  Menu,
  MenuItem,
  CssBaseline,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  DirectionsCar,
  Speed,
  LocationOn,
  TrendingUp,
  Battery3Bar,
  NavigateNext,
  TrafficRounded,
  LocalGasStation,
  Schedule,
  Notifications,
  AccountCircle,
  ExitToApp,
  Analytics,
  Settings,
  Brightness4,
  Brightness7,
  MyLocation,
  Navigation,
  Route,
  Close,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Enhanced TrafficMap component
import TrafficMapWithRouting from './TrafficMapWithRouting';

const Dashboard = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [routingDialog, setRoutingDialog] = useState(false);
  
  // Real-time location states
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [realTimeStats, setRealTimeStats] = useState({
    currentSpeed: 0,
    accuracy: 0,
    altitude: 0,
    heading: 0,
  });

  const watchIdRef = useRef();
  const mapRef = useRef();

  // Theme setup
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  // Enhanced dashboard data with real-time updates
  const [dashboardData, setDashboardData] = useState({
    user: {
      name: 'Raghavendara',
      email: 'graghav4866@gmail.com',
      avatar: 'G',
    },
    stats: {
      activeVehicles: 245,
      totalTrips: 1829,
      avgSpeed: 42,
      fuelEfficiency: 85,
    },
    recentTrips: [
      { id: 1, destination: 'Downtown Office', time: '2 hours ago', distance: '12.5 km', status: 'completed' },
      { id: 2, destination: 'Shopping Mall', time: '5 hours ago', distance: '8.2 km', status: 'completed' },
      { id: 3, destination: 'Airport Terminal', time: '1 day ago', distance: '24.8 km', status: 'completed' },
    ],
    trafficStatus: 'Moderate',
    notifications: 3,
  });

  // Real-time location tracking
  useEffect(() => {
    if (isTracking) {
      startLocationTracking();
    } else {
      stopLocationTracking();
    }
    return () => stopLocationTracking();
  }, [isTracking]);

  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy, speed, altitude, heading } = position.coords;
        const newLocation = { 
          lat: latitude, 
          lng: longitude, 
          timestamp: new Date().toISOString() 
        };
        
        setCurrentLocation(newLocation);
        setLocationHistory(prev => [...prev.slice(-100), newLocation]);
        
        setRealTimeStats({
          currentSpeed: speed ? (speed * 3.6).toFixed(1) : 0,
          accuracy: accuracy ? accuracy.toFixed(0) : 0,
          altitude: altitude ? altitude.toFixed(0) : 0,
          heading: heading ? heading.toFixed(0) : 0,
        });

        // Update dashboard stats with real-time data
        setDashboardData(prev => ({
          ...prev,
          stats: {
            ...prev.stats,
            avgSpeed: speed ? Math.round(speed * 3.6) : prev.stats.avgSpeed,
          }
        }));
      },
      (error) => {
        console.error('Location error:', error);
        setIsTracking(false);
      },
      options
    );
  };

  const stopLocationTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
  };

  // Geocoding using free Nominatim API
  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      
      if (response.data.length > 0) {
        const result = response.data[0];
        return {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          display_name: result.display_name
        };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  // Route calculation using OpenRouteService (free API)
  const calculateRoute = async () => {
    if (!source || !destination) {
      alert('Please enter both source and destination');
      return;
    }

    try {
      // Use current location as source if "Current Location" is selected
      let sourceCoords = currentLocation;
      if (source !== 'Current Location') {
        sourceCoords = await geocodeAddress(source);
      }
      
      const destCoords = await geocodeAddress(destination);

      if (!sourceCoords || !destCoords) {
        alert('Could not find one or both locations');
        return;
      }

      // Using free OpenRouteService API (you need to get a free API key)
      const API_KEY = '5b3ce3597851110001cf6248YOUR_API_KEY_HERE'; // Replace with your free API key
      
      const response = await axios.get(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${sourceCoords.lng},${sourceCoords.lat}&end=${destCoords.lng},${destCoords.lat}`
      );

      const routeData = response.data.features[0];
      const coordinates = routeData.geometry.coordinates.map(coord => [coord[1], coord[0]]);
      
      setRoute({
        coordinates,
        summary: routeData.properties.summary,
        segments: routeData.properties.segments
      });

      setRouteInfo({
        distance: (routeData.properties.summary.distance / 1000).toFixed(1),
        duration: Math.round(routeData.properties.summary.duration / 60),
        source: sourceCoords,
        destination: destCoords
      });

      // Add to recent trips
      const newTrip = {
        id: Date.now(),
        destination: destination,
        time: 'Just now',
        distance: `${(routeData.properties.summary.distance / 1000).toFixed(1)} km`,
        status: 'active'
      };

      setDashboardData(prev => ({
        ...prev,
        recentTrips: [newTrip, ...prev.recentTrips.slice(0, 2)]
      }));

      setRoutingDialog(false);
      setExpanded(true);

    } catch (error) {
      console.error('Route calculation error:', error);
      alert('Error calculating route. Please check your internet connection.');
    }
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Enhanced StatCard with real-time updates
  const StatCard = ({ title, value, icon, color, subtitle, trend, isRealTime = false }) => (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card sx={{ height: '100%', position: 'relative' }}>
        {isRealTime && (
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <Chip label="LIVE" color="success" size="small" />
          </Box>
        )}
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: color, mr: 2, width: 56, height: 56 }}>
              {icon}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500 }}>
                  {trend && <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />}
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  const QuickActionCard = ({ icon, title, description, onClick }) => (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card
        sx={{
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          height: '100%',
          '&:hover': { boxShadow: 6 },
        }}
        onClick={onClick}
      >
        <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 64, height: 64 }}>
          {icon}
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Card>
    </motion.div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Top Navigation Bar */}
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
            >
              <DirectionsCar sx={{ mr: 2, fontSize: '2rem' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                NeuroFlux AI - Real-Time Dashboard
              </Typography>
            </motion.div>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isTracking}
                    onChange={(e) => setIsTracking(e.target.checked)}
                    color="secondary"
                  />
                }
                label="Live Tracking"
                sx={{ color: 'white', mr: 2 }}
              />

              <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>

              <IconButton color="inherit">
                <Badge badgeContent={dashboardData.notifications} color="error">
                  <Notifications />
                </Badge>
              </IconButton>

              <IconButton color="inherit" onClick={handleProfileClick} sx={{ ml: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {dashboardData.user.avatar}
                </Avatar>
              </IconButton>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <AccountCircle sx={{ mr: 2 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Settings sx={{ mr: 2 }} />
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 2 }} />
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Real-time Location Status */}
        {isTracking && currentLocation && (
          <Box sx={{ bgcolor: 'success.light', p: 1 }}>
            <Typography variant="body2" align="center" sx={{ color: 'success.contrastText' }}>
              📍 Live Location: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)} 
              | Speed: {realTimeStats.currentSpeed} km/h | Accuracy: ±{realTimeStats.accuracy}m
            </Typography>
          </Box>
        )}

        {/* Main Dashboard */}
        <Box sx={{ p: 3 }}>
          {/* Welcome Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                Welcome back, {dashboardData.user.name}! 🚀
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Real-time urban mobility network monitoring {isTracking && '(Live Tracking Active)'}
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={3}>
            {/* Enhanced Stats Cards with Real-time Data */}
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Active Vehicles"
                value={dashboardData.stats.activeVehicles}
                icon={<DirectionsCar />}
                color="primary.main"
                subtitle="+12% from last week"
                trend
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Current Speed"
                value={`${realTimeStats.currentSpeed} km/h`}
                icon={<Speed />}
                color="info.main"
                subtitle={isTracking ? "Real-time data" : "Not tracking"}
                isRealTime={isTracking}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Location Accuracy"
                value={`±${realTimeStats.accuracy}m`}
                icon={<MyLocation />}
                color="success.main"
                subtitle={isTracking ? "GPS Active" : "GPS Inactive"}
                isRealTime={isTracking}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Fuel Efficiency"
                value={`${dashboardData.stats.fuelEfficiency}%`}
                icon={<Battery3Bar />}
                color="warning.main"
                subtitle="Above average"
              />
            </Grid>

            {/* Enhanced Map with Real-time Tracking */}
            <Grid item xs={12} md={8}>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <Paper sx={{ p: 3, height: 500 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrafficRounded sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Real-time Location & Route Tracking
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<Route />}
                      onClick={() => setRoutingDialog(true)}
                      size="small"
                    >
                      Plan Route
                    </Button>
                  </Box>

                  {routeInfo && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Route: {routeInfo.distance} km • {routeInfo.duration} min • 
                      {isTracking ? ' Live tracking active' : ' Static route'}
                    </Alert>
                  )}

                  <Box sx={{ height: 400, cursor: 'pointer' }} onClick={() => setExpanded(true)}>
                    <TrafficMapWithRouting
                      currentLocation={currentLocation}
                      locationHistory={locationHistory}
                      route={route}
                      routeInfo={routeInfo}
                      isTracking={isTracking}
                    />
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* Enhanced Recent Trips with Real-time Updates */}
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                <Paper sx={{ p: 3, height: 500 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Recent Trips & Live Status
                  </Typography>

                  {/* Real-time Stats */}
                  {isTracking && (
                    <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Live Tracking Data
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Speed: {realTimeStats.currentSpeed} km/h
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Altitude: {realTimeStats.altitude} m
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Points tracked: {locationHistory.length}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                    {dashboardData.recentTrips.map((trip, index) => (
                      <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Box
                          sx={{
                            p: 2,
                            mb: 2,
                            bgcolor: trip.status === 'active' ? 'primary.light' : 'background.default',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            '&:hover': { bgcolor: 'action.hover' },
                          }}
                        >
                          <Avatar sx={{ 
                            bgcolor: trip.status === 'active' ? 'success.main' : 'primary.main', 
                            mr: 2 
                          }}>
                            <LocationOn />
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {trip.destination}
                              {trip.status === 'active' && (
                                <Chip label="ACTIVE" color="success" size="small" sx={{ ml: 1 }} />
                              )}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {trip.distance} • {trip.time}
                            </Typography>
                          </Box>
                          <IconButton size="small">
                            <NavigateNext />
                          </IconButton>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* Enhanced Quick Actions */}
            <Grid item xs={12}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Quick Actions
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <QuickActionCard
                        icon={<DirectionsCar />}
                        title="Fleet Management"
                        description="Monitor and manage all vehicles in your fleet"
                        onClick={() => console.log('Fleet Management clicked')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <QuickActionCard
                        icon={<Route />}
                        title="Route Planning"
                        description="Plan optimal routes with real-time traffic"
                        onClick={() => setRoutingDialog(true)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <QuickActionCard
                        icon={<Analytics />}
                        title="Live Analytics"
                        description="View real-time analytics and insights"
                        onClick={() => console.log('Analytics clicked')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <QuickActionCard
                        icon={<LocalGasStation />}
                        title="Fuel Monitoring"
                        description="Track fuel consumption in real-time"
                        onClick={() => console.log('Fuel Monitoring clicked')}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Route Planning Dialog */}
        <Dialog open={routingDialog} onClose={() => setRoutingDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Route sx={{ mr: 2 }} />
              Plan Your Route
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder={currentLocation ? "Current Location (default)" : "Enter source address"}
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: currentLocation && (
                    <Button
                      size="small"
                      onClick={() => setSource('Current Location')}
                    >
                      Use Current
                    </Button>
                  )
                }}
              />
              <TextField
                fullWidth
                label="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination address"
                sx={{ mb: 2 }}
              />
              <Alert severity="info">
                Using free OpenStreetMap and OpenRouteService APIs for routing
              </Alert>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRoutingDialog(false)}>Cancel</Button>
            <Button onClick={calculateRoute} variant="contained" disabled={!destination}>
              Calculate Route
            </Button>
          </DialogActions>
        </Dialog>

        {/* Fullscreen Map Modal */}
        {expanded && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 2000,
              bgcolor: 'background.paper',
            }}
          >
            <IconButton
              onClick={() => setExpanded(false)}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 2100,
                bgcolor: 'white',
              }}
            >
              <Close />
            </IconButton>
            <TrafficMapWithRouting
              currentLocation={currentLocation}
              locationHistory={locationHistory}
              route={route}
              routeInfo={routeInfo}
              isTracking={isTracking}
              fullScreen
            />
          </Box>
        )}

        {/* Floating Action Button for Quick Route */}
        <Fab
          color="primary"
          aria-label="route"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => setRoutingDialog(true)}
        >
          <Navigation />
        </Fab>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
