import { Box, Typography, Paper, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import cart2 from '../assets/cart2.png'

const CategoryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  height: '220px',
  '&:hover': {
    transform: 'scale(1.03)',
    '& .category-icon': {
      transform: 'scale(1.1) translateY(-3px)',
    },
    '& .category-overlay': {
      height: '100%',
    }
  },
}));

const IconWrapper = styled(Box)({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '16px',
  transition: 'all 0.3s ease',
});

const CategoryOverlay = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '4px',
  transition: 'height 0.3s ease-in-out',
});

const categoryData = [
  {
    name: "electronics",
    icon: DevicesOutlinedIcon,
    description: "Latest gadgets & devices",
    primaryColor: "#ff6b35", 
    secondaryColor: "rgba(255, 107, 53, 0.08)", 
    overlayColor: "rgba(255, 107, 53, 0.15)"
  },
  {
    name: "jewelery",
    icon: DiamondOutlinedIcon,
    description: "Elegant & timeless pieces",
    primaryColor: "#2ec4b6", 
    secondaryColor: "rgba(46, 196, 182, 0.08)", 
    overlayColor: "rgba(46, 196, 182, 0.15)"
  },
  {
    name: "men's clothing",
    icon: CheckroomOutlinedIcon,
    description: "Contemporary men's fashion",
    primaryColor: "#2ec4b6",
    secondaryColor: "rgba(46, 196, 182, 0.08)", 
    overlayColor: "rgba(46, 196, 182, 0.15)"
   
  },
  {
    name: "women's clothing",
    icon: LocalMallOutlinedIcon,
    description: "Trendy women's collection",
    primaryColor: "#ff6b35", 
    secondaryColor: "rgba(255, 107, 53, 0.08)",
    overlayColor: "rgba(255, 107, 53, 0.15)",
  
  }
];

const Categories = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      {/* Top Heading Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            color: '#ff6b35',
            fontWeight: 'bold',
            mb: 2
          }}
        >
          Shop By Category
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#7F8C8D',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Discover our carefully curated collections
        </Typography>
      </Box>

      {/* Main Content Section */}
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left Side - Image */}
        <Box
          sx={{
            flex: '0 0 40%',
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            height: { xs: '300px', md: 'auto' },
            minHeight: { md: '600px' },
            // bgcolor: '#f5f5f5'
          }}
        >
          <img 
            src={cart2}
            alt="Category Banner"
           
            style={{  
              width: '100%',  
              height: '100%',  
              objectFit: 'contain',  
              position: 'absolute',  
              transform: 'rotateY(180deg)', 
          }} 
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              pt:10,
              px:8,
              // background: 'linear-gradient(to top, rgba(255, 107, 53, 0.15) 0%, rgba(255, 107, 53, 0) 100%)',
              background: 'linear-gradient(to top, rgba(255, 165, 0, 0.7) 0%, rgba(255, 165, 0, 0) 100%)',
              // background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
            }}
          >
           
          </Box>
        </Box>

        {/* Right Side - Categories Grid */}
        <Box
          sx={{
            flex: '1',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {categoryData.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <CategoryCard
                key={category.name}
                elevation={0}
                sx={{
                  bgcolor: category.secondaryColor,
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <IconWrapper
                  className="category-icon"
                  sx={{
                    bgcolor: 'white',
                    width:'35%',
                    height:'55%',
                    // fontSize:38,
                    boxShadow: `0 4px 25px ${category.overlayColor}`,
                  }}
                >
                  <CategoryIcon
                    sx={{
                      fontSize: 82,
                      color: category.primaryColor,
                    }}
                  />
                </IconWrapper>

                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    color: '#2C3E50',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    mb: 1,
                  }}
                >
                  {category.name.replace("'", '')}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#7F8C8D',
                    textAlign: 'center',
                    px: 2,
                  }}
                >
                  {category.description}
                </Typography>

                <CategoryOverlay
                  className="category-overlay"
                  sx={{
                    bgcolor: category.overlayColor,
                  }}
                />
              </CategoryCard>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default Categories;