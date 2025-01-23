import React, { useState, useEffect } from 'react';
import { 
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Rating,
  Button,
  Chip,
  CircularProgress,
  Box
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Consistent color palette
const colors = {
  primary: "#ff6b35", // Vibrant orange
  secondary: "#fff3e6", // Light orange background
  accent: "#2ec4b6", // Teal accent
  background: "#fff9f4", // Warm background
  text: "#1a1a1a", // Dark text
  cardBg: "#ffffff" // White for cards
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStoreData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getStoreData();
  }, []);

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

  return (
    <Box sx={{ backgroundColor: colors.background, minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ 
            color: colors.primary,
            fontWeight: 'bold',
            mb: 4
          }}
        >
          Featured Products
        </Typography>
        
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center'
        }}>
          {products.map((product) => (
            <Box 
              key={product.id}
              sx={{
                width: {
                  xs: '100%',
                  sm: 'calc(50% - 24px)',
                  md: 'calc(33.333% - 24px)'
                },
                minWidth: 280
              }}
            >
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  backgroundColor: colors.cardBg,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(255, 107, 53, 0.2)',
                  },
                }}
              >
                <Box sx={{ position: 'relative', pt: '56.25%', backgroundColor: colors.secondary }}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      p: 2
                    }}
                  />
                  <Chip
                    label={`$${product.price}`}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      backgroundColor: colors.primary,
                      color: 'white',
                      fontWeight: 'bold',
                      '& .MuiChip-label': {
                        px: 2,
                      }
                    }}
                  />
                </Box>
                <CardContent sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 1,
                  p: 3
                }}>
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      color: colors.text,
                      fontWeight: '600',
                      lineHeight: 1.3
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating 
                      value={product.rating.rate} 
                      precision={0.1} 
                      readOnly 
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: colors.primary
                        }
                      }}
                    />
                    <Typography variant="body2" sx={{ ml: 1, color: colors.text }}>
                      ({product.rating.count})
                    </Typography>
                  </Box>
                  <Chip 
                    label={product.category} 
                    size="small" 
                    sx={{ 
                      alignSelf: 'flex-start', 
                      mb: 1,
                      backgroundColor: colors.secondary,
                      color: colors.primary,
                      borderRadius: '16px',
                      '& .MuiChip-label': {
                        px: 2,
                      }
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: colors.text,
                      opacity: 0.8,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      mb: 2
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<ShoppingCartIcon />}
                    sx={{ 
                      mt: 'auto',
                      backgroundColor: colors.primary,
                      color: 'white',
                      borderRadius: '8px',
                      textTransform: 'none',
                      padding: '10px 20px',
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
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Products;