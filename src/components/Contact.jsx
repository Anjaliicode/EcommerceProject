import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';

const colors = {
  primary: "#ff6b35",
  secondary: "#fff3e6",
  accent: "#2ec4b6",
  background: "#fff9f4",
  text: "#1a1a1a",
  cardBg: "#ffffff"
};

const ContactUs = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Error state
  const [errors, setErrors] = useState({});
  
  // Loading and success states
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowSnackbar(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: colors.background, 
      minHeight: '100vh',
      py: 6
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h1"
            sx={{ 
              color: colors.primary,
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Contact Us
          </Typography>
          <Typography 
            variant="h6"
            sx={{ 
              color: colors.text,
              opacity: 0.8,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Have questions? We'd love to hear from you. Send us a message
            and we'll respond as soon as possible.
          </Typography>
        </Box>
         {/* Contact Form */}
         <Card sx={{
          maxWidth: '800px',
          mx: 'auto',
          p: { xs: 3, md: 6 },
          backgroundColor: colors.cardBg,
          borderRadius: '20px',
        }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 3
            }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3
              }}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  sx={{ flex: 1 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{ flex: 1 }}
                />
              </Box>

              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                error={!!errors.subject}
                helperText={errors.subject}
              />

              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                sx={{
                  backgroundColor: colors.primary,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: colors.primary,
                    opacity: 0.9
                  }
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </Box>
          </form>
        </Card>

        {/* Contact Information Cards */}
        <Box sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
        //   mb: 6
        mt:8
        }}>
          {/* Email Card */}
          <Card sx={{
            flex: '1 1 300px',
            maxWidth: '350px',
            p: 3,
            backgroundColor: colors.cardBg,
            borderRadius: '20px',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mb: 2 
            }}>
              <EmailIcon sx={{ color: colors.primary, fontSize: 40, mr: 2 }} />
              <Typography variant="h6" sx={{ color: colors.text }}>
                Email Us
              </Typography>
            </Box>
            <Typography sx={{ color: colors.text }}>
              support@yourstore.com
            </Typography>
          </Card>

          {/* Phone Card */}
          <Card sx={{
            flex: '1 1 300px',
            maxWidth: '350px',
            p: 3,
            backgroundColor: colors.cardBg,
            borderRadius: '20px',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mb: 2 
            }}>
              <PhoneIcon sx={{ color: colors.primary, fontSize: 40, mr: 2 }} />
              <Typography variant="h6" sx={{ color: colors.text }}>
                Call Us
              </Typography>
            </Box>
            <Typography sx={{ color: colors.text }}>
              +1 (555) 123-4567
            </Typography>
          </Card>

          {/* Location Card */}
          <Card sx={{
            flex: '1 1 300px',
            maxWidth: '350px',
            p: 3,
            backgroundColor: colors.cardBg,
            borderRadius: '20px',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mb: 2 
            }}>
              <LocationOnIcon sx={{ color: colors.primary, fontSize: 40, mr: 2 }} />
              <Typography variant="h6" sx={{ color: colors.text }}>
                Visit Us
              </Typography>
            </Box>
            <Typography sx={{ color: colors.text }}>
              123 Store Street, City, State 12345
            </Typography>
          </Card>
        </Box>

       

        {/* Success Snackbar */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setShowSnackbar(false)} 
            severity="success"
            sx={{ width: '100%' }}
          >
            Message sent successfully! We'll get back to you soon.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ContactUs;