import React, { useState } from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const float = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-10px) }
  100% { transform: translateY(0px) }
`;

const CategoryWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  height: '400px',
  borderRadius: '30px',
  overflow: 'hidden',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  '&:hover': {
    transform: 'scale(1.02)',
    '& .category-icon': {
      transform: 'scale(1.1) translateY(-5px)',
    },
    '& .explore-btn': {
      transform: 'translateX(0)',
      opacity: 1,
    }
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: '160px',
  height: '160px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  animation: `${float} 3s ease-in-out infinite`,
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

const categoryData = [
  {
    name: "Electronics",
    icon: DevicesOutlinedIcon,
    description: "Explore the latest tech innovations",
    primaryColor: "#ff6b35",
    gradientStart: "rgba(255, 107, 53, 0.9)",
    gradientEnd: "rgba(255, 159, 125, 0.9)",
    items: "2,500+ Products",
    topBrands: ["Apple", "Samsung", "Sony"],
    discount: "Up to 40% Off"
  },
  {
    name: "Jewelry",
    icon: DiamondOutlinedIcon,
    description: "Timeless elegance & luxury",
    primaryColor: "#2ec4b6",
    gradientStart: "rgba(46, 196, 182, 0.9)",
    gradientEnd: "rgba(92, 225, 230, 0.9)",
    items: "1,200+ Products",
    topBrands: ["Cartier", "Tiffany", "Pandora"],
    discount: "Up to 30% Off"
  },
  {
    name: "Men's Fashion",
    icon: CheckroomOutlinedIcon,
    description: "Contemporary style statements",
    primaryColor: "#2ec4b6",
    gradientStart: "rgba(46, 196, 182, 0.9)",
    gradientEnd: "rgba(92, 225, 230, 0.9)",
    items: "3,000+ Products",
    topBrands: ["Nike", "Adidas", "Zara"],
    discount: "Up to 50% Off"
  },
  {
    name: "Women's Fashion",
    icon: LocalMallOutlinedIcon,
    description: "Trendsetting collections",
    primaryColor: "#ff6b35",
    gradientStart: "rgba(255, 107, 53, 0.9)",
    gradientEnd: "rgba(255, 159, 125, 0.9)",
    items: "3,500+ Products",
    topBrands: ["H&M", "Gucci", "Prada"],
    discount: "Up to 45% Off"
  }
];

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
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
          Shop By Category
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#7F8C8D',
            maxWidth: '700px',
            mx: 'auto',
            mt: 4,
            fontWeight: 400
          }}
        >
          Discover exceptional products across our curated collections
        </Typography>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)'
        },
        gap: 3,
        px: { xs: 2, md: 4 }
      }}>
        {categoryData.map((category, index) => (
          <CategoryWrapper
            key={category.name}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            sx={{
              background: `linear-gradient(135deg, ${category.gradientStart}, ${category.gradientEnd})`,
              boxShadow: activeIndex === index ? 
                `0 20px 40px rgba(0,0,0,0.2)` : 
                '0 10px 20px rgba(0,0,0,0.1)',
            }}
          >
            <Chip 
              label={category.discount}
              icon={<LocalOfferIcon sx={{ color: '#fff !important' }} />}
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                position: 'absolute',
                top: 16,
                right: 16,
                backdropFilter: 'blur(4px)',
                '& .MuiChip-icon': {
                  color: 'white'
                }
              }}
            />

            <IconContainer className="category-icon">
              <category.icon sx={{ 
                fontSize: 80, 
                color: 'white',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
              }} />
            </IconContainer>

            <Typography variant="h4" sx={{ 
              fontWeight: 700, 
              mb: 2,
              color: 'white',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              {category.name}
            </Typography>

            <Typography variant="h6" sx={{ 
              mb: 2,
              color: 'white',
              opacity: 0.9,
              textAlign: 'center',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}>
              {category.description}
            </Typography>

            <Typography variant="body1" sx={{ 
              color: 'white',
              opacity: 0.9,
              textAlign: 'center',
              mb: 2
            }}>
              {category.items}
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              flexWrap: 'wrap',
              justifyContent: 'center',
              mb: 3
            }}>
              {category.topBrands.map((brand) => (
                <Chip
                  key={brand}
                  label={brand}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    backdropFilter: 'blur(4px)'
                  }}
                />
              ))}
            </Box>

            <Box
              className="explore-btn"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'white',
                color: category.primaryColor,
                py: 1,
                px: 2,
                borderRadius: '20px',
                transition: 'all 0.3s ease',
                opacity: 0.9,
                '&:hover': {
                  opacity: 1,
                  transform: 'translateY(-2px)',
                  '& .arrow-icon': {
                    transform: 'translateX(5px)'
                  }
                }
              }}
            >
              <Typography variant="button" sx={{ fontWeight: 600, letterSpacing: 1 }}>
                EXPLORE NOW
              </Typography>
              <ArrowForwardIcon 
                className="arrow-icon"
                sx={{ 
                  transition: 'transform 0.3s ease',
                  fontSize: 20
                }} 
              />
            </Box>
          </CategoryWrapper>
        ))}
      </Box>
    </Container>
  );
};

export default Categories;