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
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  TextField,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

const colors = {
  primary: "#ff6b35",
  secondary: "#fff3e6",
  accent: "#2ec4b6",
  background: "#fff9f4",
  text: "#1a1a1a",
  cardBg: "#ffffff",
  borderColor: "#e0e0e0"
};  

const FilterContent = ({ 
  selectedCategory, 
  setSelectedCategory, 
  categories, 
  sortBy, 
  setSortBy, 
  searchQuery, 
  setSearchQuery, 
  onClearFilters,
  isMobile,
  onClose 
}) => (
  <Box sx={{ p: 3 }}>
    {isMobile && (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Filters
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    )}

    {!isMobile && (
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Filters
      </Typography>
    )}

    {/* Search */}
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
        Search
      </Typography>
      <TextField
        fullWidth
        size="small"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ color: 'gray', mr: 1 }} />,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          }
        }}
      />
    </Box>

    {/* Category Filter */}
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
        Category
      </Typography>
      <RadioGroup
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <FormControlLabel 
          value="all" 
          control={<Radio sx={{ color: colors.primary }} />} 
          label="All Categories" 
        />
        {categories.map(category => (
          <FormControlLabel
            key={category}
            value={category}
            control={<Radio sx={{ color: colors.primary }} />}
            label={category.charAt(0).toUpperCase() + category.slice(1)}
          />
        ))}
      </RadioGroup>
    </Box>

    {/* Price Filter */}
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
        Price
      </Typography>
      <RadioGroup
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <FormControlLabel 
          value="price-high" 
          control={<Radio sx={{ color: colors.primary }} />} 
          label="High to low" 
        />
        <FormControlLabel 
          value="price-low" 
          control={<Radio sx={{ color: colors.primary }} />} 
          label="Low to high" 
        />
      </RadioGroup>
    </Box>

    <Button
      fullWidth
      variant="outlined"
      onClick={onClearFilters}
      sx={{
        borderColor: colors.primary,
        color: colors.primary,
        '&:hover': {
          borderColor: colors.primary,
          backgroundColor: colors.secondary,
        }
      }}
    >
      Clear Filter
    </Button>
  </Box>
);

const Products = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('none');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSortBy('none');
    setSearchQuery('');
    if (isMobile) {
      setIsFilterOpen(false);
    }
  };

  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      // if(sortBy=="h2l"){
      //   return b.price-a.price
      // }else{
      //   return a.price-b.price
      // }
      
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
      <Container maxWidth="xl">
        {/* Mobile Filter Button */}
        {isMobile && (
          <Button
            startIcon={<FilterListIcon />}
            onClick={() => setIsFilterOpen(true)}
            sx={{ 
              mb: 3,
              backgroundColor: colors.cardBg,
              color: colors.text,
              boxShadow: 1,
              '&:hover': {
                backgroundColor: colors.secondary,
              }
            }}
          >
            Filters
          </Button>
        )}

        <Box sx={{ display: 'flex', gap: 4 }}>
          {/* Desktop Filters Sidebar */}
          {!isMobile && (
            <Paper
              elevation={1}
              sx={{
                width: 280,
                flexShrink: 0,
                height: 'fit-content',
                borderRadius: 2,
                backgroundColor: colors.cardBg,
                position: 'sticky',
                top: 24
              }}
            >
              <FilterContent
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
                sortBy={sortBy}
                setSortBy={setSortBy}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onClearFilters={handleClearFilters}
                isMobile={false}
              />
            </Paper>
          )}

          {/* Mobile Filter Drawer */}
          <Drawer
            anchor="left"
            open={isMobile && isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            PaperProps={{
              sx: {
                width: '100%',
                maxWidth: '320px',
                backgroundColor: colors.cardBg,
              }
            }}
          >
            <FilterContent
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
              sortBy={sortBy}
              setSortBy={setSortBy}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onClearFilters={handleClearFilters}
              isMobile={true}
              onClose={() => setIsFilterOpen(false)}
            />
          </Drawer>

          {/* Products Grid */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
            }}>
              {filteredAndSortedProducts.map((product) => (
                <Box 
                  key={product.id}
                  sx={{
                    width: {
                      xs: '100%',
                      sm: 'calc(50% - 12px)',
                      lg: 'calc(33.333% - 16px)'
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
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Products;