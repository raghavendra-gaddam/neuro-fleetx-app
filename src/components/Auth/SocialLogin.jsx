import React from 'react';
import { Button, Box, Divider, Typography } from '@mui/material';
import { Google, Facebook } from '@mui/icons-material';
import { motion } from 'framer-motion';

const SocialLogin = ({ onGoogleLogin, onFacebookLogin }) => {
  return (
    <Box>
      <Box display="flex" alignItems="center" my={3}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
          Or continue with
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>

      <Box display="flex" gap={2} mb={3}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ flex: 1 }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={onGoogleLogin}
            startIcon={<Google />}
            sx={{
              borderColor: 'rgba(0,0,0,0.12)',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(59, 130, 246, 0.04)',
              },
            }}
          >
            Google
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ flex: 1 }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={onFacebookLogin}
            startIcon={<Facebook />}
            sx={{
              borderColor: '#1877f2',
              color: '#1877f2',
              '&:hover': {
                borderColor: '#1877f2',
                backgroundColor: 'rgba(24, 119, 242, 0.04)',
              },
            }}
          >
            Facebook
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default SocialLogin;
