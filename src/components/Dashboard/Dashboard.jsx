import React, { useState, useEffect } from 'react';
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
  Button,
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
  Map,
  Notifications,
  AccountCircle,
  ExitToApp,
  Dashboard as DashboardIcon,
  Analytics,
  Settings,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [dashboardData] = useState({
    user: {
      name: 'Raghavendara',
      email: 'graghav4866@gmail.com',
      avatar: 'G'
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
    notifications: 3
  });

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

  const StatCard = ({ title, value, icon, color, subtitle, trend }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card sx={{ height: '100%', position: 'relative' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: color, mr: 2, width: 56, height: 56 }}>
              {icon}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 0.5 }}>
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
          '&:hover': { boxShadow: 6 }
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
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Top Navigation Bar */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
          >
            <DirectionsCar sx={{ mr: 2, fontSize: '2rem' }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              NeuroFlux AI
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            <IconButton color="inherit">
              <Badge badgeContent={dashboardData.notifications} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              onClick={handleProfileClick}
              sx={{ ml: 1 }}
            >
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

      {/* Main Dashboard Content */}
      <Box sx={{ p: 3 }}>
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
              Welcome back, {dashboardData.user.name}! 🚀
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Monitor your urban mobility network in real-time
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {/* Statistics Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Vehicles"
              value={dashboardData.stats.activeVehicles}
              icon={<DirectionsCar />}
              color="primary.main"
              subtitle="+12% from last week"
              trend={true}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Trips Today"
              value={dashboardData.stats.totalTrips}
              icon={<LocationOn />}
              color="success.main"
              subtitle="+8% from yesterday"
              trend={true}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Avg Speed (km/h)"
              value={dashboardData.stats.avgSpeed}
              icon={<Speed />}
              color="info.main"
              subtitle="Optimal range"
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

          {/* Traffic Analysis */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper sx={{ p: 3, height: 400 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <TrafficRounded sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Real-time Traffic Analysis
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                      Current Traffic Status:
                    </Typography>
                    <Chip 
                      label={dashboardData.trafficStatus} 
                      color="warning" 
                      size="small"
                    />
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={65} 
                    sx={{ height: 8, borderRadius: 4, mb: 2 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Traffic density: 65% of normal capacity
                  </Typography>
                </Box>

                {/* Mock Map Area */}
                <Box 
                  sx={{ 
                    height: 200, 
                    bgcolor: 'background.default', 
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed',
                    borderColor: 'divider'
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Map sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Interactive Traffic Map
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Real-time vehicle tracking and route optimization
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Recent Trips */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Paper sx={{ p: 3, height: 400 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Recent Trips
                </Typography>
                
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
                          bgcolor: 'background.default', 
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                      >
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          <LocationOn />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {trip.destination}
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

          {/* Quick Actions */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
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
                      icon={<Schedule />}
                      title="Schedule Trip"
                      description="Plan and schedule new journeys efficiently"
                      onClick={() => console.log('Schedule Trip clicked')}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <QuickActionCard
                      icon={<Analytics />}
                      title="Analytics"
                      description="View detailed analytics and insights"
                      onClick={() => console.log('Analytics clicked')}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <QuickActionCard
                      icon={<LocalGasStation />}
                      title="Fuel Monitoring"
                      description="Track fuel consumption and efficiency"
                      onClick={() => console.log('Fuel Monitoring clicked')}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
