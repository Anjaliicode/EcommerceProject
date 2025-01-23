import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterListIcon from '@mui/icons-material/FilterList';

const colors = {
  primary: "#ff6b35",
  secondary: "#fff3e6",
  accent: "#2ec4b6",
  background: "#fff9f4",
  text: "#1a1a1a",
  cardBg: "#ffffff"
};  

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('none');

  useEffect(() => {
    const getStoreData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getStoreData();
  }, []);

  const filteredAndSortedProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'rating':
          return b.rating.rate - a.rating.rate;
        default:
          return 0;
      }
    });

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
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

  return (
    <Box sx={{ backgroundColor: colors.background, minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
    
        
        {/* Filters Bar */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 4,
          flexWrap: 'wrap',
          alignItems: 'center',
          backgroundColor: colors.cardBg,
          padding: 2,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <FilterListIcon sx={{ color: colors.primary }} />
          <FormControl sx={{ minWidth: 200, }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="rating">Best Rating</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center'
        }}>
          {filteredAndSortedProducts.map((product) => (
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
                <Box 
                  sx={{ 
                    position: 'relative', 
                    pt: '56.25%', 
                    backgroundColor: colors.secondary,
                    cursor: 'pointer'
                  }}
                  onClick={() => handleProductClick(product.id)}
                >
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