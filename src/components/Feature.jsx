import React, { useState } from 'react';
import { Box, Container, Typography, Rating, Button, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import bags from "../assets/bags.png";
import headphone from "../assets/headphone.png";
import mens from "../assets/mens.png";

const ProductCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  overflow: 'hidden',
  backgroundColor: '#fff',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    '& .product-actions': {
      opacity: 1,
      transform: 'translateY(0)',
    }
  }
}));

const ImageWrapper = styled(Box)({
  position: 'relative',
  paddingTop: '100%',
  backgroundColor: '#f8f9fa',
  borderRadius: '20px 20px 0 0',
});

const products = {
  trending: [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      price: 149.99,
      rating: 4.8,
      reviews: 456,
      image:bags,
      discount: "20% OFF",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Premium Gold Necklace",
      price: 299.99,
      rating: 4.9,
      reviews: 289,
      image: mens,
      discount: "15% OFF",
      category: "Jewelry"
    },
    {
      id: 3,
      name: "Men's Designer Watch",
      price: 199.99,
      rating: 4.7,
      reviews: 567,
      image: headphone,
      category: "Accessories"
    },
    {
      id: 4,
      name: "Designer Handbag",
      price: 399.99,
      rating: 4.9,
      reviews: 342,
      image: bags,
      discount: "10% OFF",
      category: "Fashion"
    }
  ],
  bestSellers: [
    {
      id: 5,
      name: "Smart Fitness Watch",
      price: 179.99,
      rating: 4.8,
      reviews: 789,
      image: mens,
      category: "Electronics"
    },
    // Add more products as needed
  ]
};

const features = [
  {
    icon: LocalShippingOutlinedIcon,
    title: "Free Shipping",
    description: "On orders over $50"
  },
  {
    icon: VerifiedOutlinedIcon,
    title: "Authentic Products",
    description: "100% genuine items"
  },
  {
    icon: SecurityOutlinedIcon,
    title: "Secure Payments",
    description: "Protected by SSL"
  }
];

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ bgcolor: '#f8f9fa', py: 10 }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: '#ff6b35',
              mb: 2,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, #ff6b35, #2ec4b6)',
                borderRadius: '2px'
              }
            }}
          >
            Featured Products
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#7F8C8D',
              maxWidth: '700px',
              mx: 'auto',
              mt: 4,
              mb: 6,
              fontWeight: 400
            }}
          >
            Discover our most popular and trending products
          </Typography>

          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{ 
              mb: 6,
              '& .MuiTab-root': {
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#7F8C8D',
                '&.Mui-selected': {
                  color: '#ff6b35'
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#ff6b35'
              }
            }}
          >
            <Tab label="Trending Now" />
            <Tab label="Best Sellers" />
          </Tabs>
        </Box>

        {/* Products Grid */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: 4,
          mb: 8
        }}>
          {(activeTab === 0 ? products.trending : products.bestSellers).map((product) => (
            <ProductCard key={product.id}>
              <ImageWrapper>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {product.discount && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      bgcolor: '#ff6b35',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}
                  >
                    {product.discount}
                  </Box>
                )}
                <Box
                  className="product-actions"
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    display: 'flex',
                    gap: 2,
                    opacity: 0,
                    transform: 'translateY(20px)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCartOutlinedIcon />}
                    sx={{
                      bgcolor: 'white',
                      color: '#ff6b35',
                      '&:hover': {
                        bgcolor: '#ff6b35',
                        color: 'white'
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      minWidth: 'auto',
                      bgcolor: 'white',
                      color: '#ff6b35',
                      '&:hover': {
                        bgcolor: '#ff6b35',
                        color: 'white'
                      }
                    }}
                  >
                    <FavoriteBorderIcon />
                  </Button>
                </Box>
              </ImageWrapper>

              <Box sx={{ p: 3 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#7F8C8D',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    mb: 1,
                    display: 'block'
                  }}
                >
                  {product.category}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={product.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1, color: '#7F8C8D' }}>
                    ({product.reviews})
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ color: '#ff6b35', fontWeight: 700 }}>
                  ${product.price}
                </Typography>
              </Box>
            </ProductCard>
          ))}
        </Box>

        {/* Features Section */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3, 1fr)'
          },
          gap: 4,
          mt: 8,
          py: 4,
          borderTop: '1px solid rgba(0,0,0,0.1)'
        }}>
          {features.map((feature) => (
            <Box
              key={feature.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3
              }}
            >
              <feature.icon sx={{ fontSize: 40, color: '#ff6b35' }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#7F8C8D' }}>
                  {feature.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;