import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Rating,
  Chip,
  CircularProgress,
  Card,
  CardMedia,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const colors = {
  primary: "#ff6b35",
  secondary: "#fff3e6",
  accent: "#2ec4b6",
  background: "#fff9f4",
  text: "#1a1a1a",
  cardBg: "#ffffff"
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    
    setShowSnackbar(true);
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ backgroundColor: colors.background }}
      >
        <CircularProgress sx={{ color: colors.primary }} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ backgroundColor: colors.background, minHeight: '100vh', py: 4 }}>
        <Container>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 2 
          }}>
            <Typography variant="h5" align="center">Product not found</Typography>
            <Button 
              onClick={() => navigate('/products')}
              variant="contained"
              sx={{ 
                backgroundColor: colors.primary,
                '&:hover': { backgroundColor: colors.primary, opacity: 0.9 }
              }}
            >
              Return to Products
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: colors.background, minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton 
            onClick={() => navigate('/products')}
            sx={{ 
              color: colors.primary,
              '&:hover': {
                backgroundColor: colors.secondary
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1, color: colors.text }}>
            Back to Products
          </Typography>
        </Box>

        {/* Product Details Card */}
        <Card sx={{ 
          backgroundColor: colors.cardBg,
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            p: { xs: 2, md: 4 }
          }}>
            {/* Product Image */}
            <Box sx={{ 
              flex: '0 0 50%',
              backgroundColor: colors.secondary,
              borderRadius: '10px',
              p: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px'
            }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  maxHeight: '500px'
                }}
              />
            </Box>

            {/* Product Info */}
            <Box sx={{ 
              flex: '1 1 50%', 
              display: 'flex', 
              flexDirection: 'column',
              gap: 2
            }}>
              <Typography 
                variant="h4" 
                component="h1"
                sx={{ 
                  color: colors.text,
                  fontWeight: '600',
                }}
              >
                {product.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating 
                  value={product.rating.rate} 
                  precision={0.5} 
                  readOnly 
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: colors.primary
                    }
                  }}
                />
                <Typography variant="body1" sx={{ color: colors.text }}>
                  {product.rating.rate} ({product.rating.count} reviews)
                </Typography>
              </Box>

              <Chip 
                label={product.category}
                sx={{ 
                  alignSelf: 'flex-start',
                  backgroundColor: colors.secondary,
                  color: colors.primary,
                  textTransform: 'capitalize',
                  borderRadius: '16px',
                  px: 1
                }}
              />

              <Typography 
                variant="h5" 
                sx={{ 
                  color: colors.primary,
                  fontWeight: '600',
                  mt: 2
                }}
              >
                ${product.price}
              </Typography>

              <Typography 
                variant="body1" 
                sx={{
                  color: colors.text,
                  lineHeight: 1.8,
                  mt: 2
                }}
              >
                {product.description}
              </Typography>

              <Button 
                variant="contained" 
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                sx={{ 
                  mt: 4,
                  backgroundColor: colors.primary,
                  color: 'white',
                  borderRadius: '8px',
                  textTransform: 'none',
                  padding: '12px 24px',
                  fontWeight: '600',
                  '&:hover': {
                    backgroundColor: colors.primary,
                    opacity: 0.9,
                    transform: 'scale(1.02)'
                  }
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>

      {/* Success Snackbar */}
      <Snackbar 
        open={showSnackbar} 
        autoHideDuration={3000} 
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          Product added to cart successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetails;