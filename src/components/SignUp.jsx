import React, { useState } from "react";
import * as yup from "yup";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Snackbar, 
  Alert,
  useTheme,
  useMediaQuery,
  Container
} from "@mui/material";
import loginimage from "../assets/login.png";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

// Enhanced color palette
const colors = {
  primary: "#ff6b35", // Vibrant orange
  secondary: "#fff3e6", // Light orange background
  accent: "#2ec4b6", // Teal accent
  background: "#fff9f4", // Warm background
  text: "#1a1a1a" // Dark text
};

const validationSchema = yup.object({
  firstname: yup
    .string("Enter your first name")
    .min(2, "First name must be at least 2 characters long")
    .required("First name is required"),
  lastname: yup
    .string("Enter your last name")
    .min(2, "Last name must be at least 2 characters long")
    .required("Last name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password cannot exceed 16 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
    .required("Password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("userEmail", values.email);
      localStorage.setItem("userPassword", values.password);
      setOpenSnackbar(true);
      
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
  });

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
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity="success"
            sx={{ 
              backgroundColor: colors.accent,
              color: 'white'
            }}
          >
            Signup Successful! Redirecting to login...
          </Alert>
        </Snackbar>

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
            Create Account
          </Typography>

          <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
            <TextField
              id="firstname"
              name="firstname"
              label="First Name"
              variant="outlined"
              fullWidth
              sx={inputStyles}
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
            />

            <TextField
              id="lastname"
              name="lastname"
              label="Last Name"
              variant="outlined"
              fullWidth
              sx={inputStyles}
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
            />

            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              sx={inputStyles}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              sx={inputStyles}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center',
                margin: '16px 0',
                color: colors.text
              }}
            >
              Already have an Account?{' '}
              <a 
                href="/login" 
                style={{ 
                  color: colors.primary,
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Log In
              </a>
            </Typography>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
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
              Sign Up
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;