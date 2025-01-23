import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  useTheme,
  useMediaQuery,
  Container,
  Snackbar
} from "@mui/material";
import loginimage from "../assets/login.png";
import { useNavigate } from "react-router-dom";

// Matching color palette from signup page
const colors = {
  primary: "#ff6b35", // Vibrant orange
  secondary: "#fff3e6", // Light orange background
  accent: "#2ec4b6", // Teal accent
  background: "#fff9f4", // Warm background
  text: "#1a1a1a" // Dark text
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const handleSubmit = () => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/products");
      }, 1500);
    } else {
      setError("Invalid email or password.");
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: colors.primary,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.primary,
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: colors.primary,
    },
    marginBottom: 2,
  };

  return (
    <Container 
      maxWidth={false} 
      disableGutters 
      sx={{
        minHeight: '100vh',
        backgroundColor: colors.background,
        overflow: 'hidden',
      }}
    >
      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
        alignItems="center"
        minHeight="100vh"
        padding={isMobile ? 2 : 4}
      >
        <Snackbar
          open={showSuccess}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            severity="success"
            sx={{ 
              backgroundColor: colors.accent,
              color: 'white'
            }}
          >
            Login Successful! Redirecting...
          </Alert>
        </Snackbar>

        <Box
          flex={isMobile ? 1 : 0.8}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: { xs: 2, sm: 4, md: 6 },
            margin: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            width: isMobile ? '100%' : isTablet ? '60%' : '40%',
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              color: colors.primary,
              fontWeight: 'bold',
              marginBottom: 4,
              textAlign: 'center'
            }}
          >
            Welcome Back
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                width: '100%', 
                marginBottom: 2,
                borderRadius: '8px'
              }}
            >
              {error}
            </Alert>
          )}

          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: 'center',
              margin: '16px 0',
              color: colors.text
            }}
          >
            Don't have an Account?{' '}
            <a 
              href="/" 
              style={{ 
                color: colors.primary,
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Sign Up
            </a>
          </Typography>

          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            sx={inputStyles}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            sx={inputStyles}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSubmit}
            sx={{
              backgroundColor: colors.primary,
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: colors.primary,
                opacity: 0.9,
              },
              marginTop: 2
            }}
          >
            Login
          </Button>
        </Box>

        {!isMobile && (
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundColor: colors.secondary,
              borderRadius: '20px',
              padding: 4,
              margin: 2,
              boxShadow: '0 8px 32px rgba(255, 107, 53, 0.1)',
            }}
          >
            <img
              src={loginimage}
              alt="Get your contacts managed"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '10px',
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Login;