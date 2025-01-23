import {
  Typography,
  Box,
  Button,
  Container,
  Paper,
  Rating,
  CircularProgress,
  Link
} from "@mui/material";
import { useState, useEffect } from "react";

const colors = {
  primary: "#ff6b35",
  secondary: "#fff3e6",
  accent: "#2ec4b6",
  background: "#fff9f4",
  text: "#1a1a1a",
  cardBg: "#ffffff",
};

const ProductCard = ({ product }) => (
  
  <Paper
    elevation={0}
    sx={{
      borderRadius: 2,
      overflow: "hidden",
      bgcolor: colors.cardBg,
      transition: "all 0.3s ease",
      border: `1px solid ${colors.secondary}`,
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
        borderColor: colors.primary,
      },
    }}
  >
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: colors.secondary,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%", 
        height: "350px", 
        
      }}
      // onClick={() => handleProductClick(product.id)}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "100%",
          height: "100%", 
          objectFit: "contain", 
          borderRadius: "8px",
          transition: "transform 0.3s ease",
        }}
      />
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%) translateY(100%)",
          bgcolor: colors.primary,
          color: "white",
          "&:hover": {
            bgcolor: colors.accent,
          },
          transition: "transform 0.3s ease",
          opacity: 0,
          ".MuiPaper-root:hover &": {
            transform: "translateX(-50%) translateY(0)",
            opacity: 1,
          },
        }}
      >
        Add to Cart
      </Button>
    </Box>
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h6"
        sx={{
          fontSize: "1rem",
          fontWeight: 600,
          mb: 1,
          color: colors.text,
        }}
      >
        {product.title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography
          sx={{
            fontWeight: 700,
            color: colors.primary,
            fontSize: "1.1rem",
          }}
        >
          {product.price}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body2" sx={{ color: colors.text, opacity: 0.7 }}>
          {product.sales} sold
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Rating
          value={product.rating.rate}
          precision={0.1}
          readOnly
          sx={{
            "& .MuiRating-iconFilled": {
              color: colors.primary,
            },
          }}
        />
        <Typography variant="body2" sx={{ ml: 1, color: colors.text }}>
          ({product.rating})
        </Typography>
      </Box>
    </Box>
  </Paper>
);

const HomeCard = () => {
  const [loading, setLoading] = useState(true);
  const [trendingProducts, setTrendingProducts] = useState([]);
  // const navigate = useNavigate();
  // const navigate = useNavigate();
// const handleProductClick = (productId) => {
//   navigate(`/product/${productId}`);
// };
  

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        const shuffledData = data.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffledData.slice(0, 4).map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price.toFixed(2),
          rating: product.rating.rate,
          sales: Math.floor(Math.random() * 100 + 1),
          image: product.image,
        }));

        setTrendingProducts(selectedProducts);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
    <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ mb: 4, py: 8, textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: colors.primary,
            mb: 1,
          }}
        >
          Trending Now
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: colors.text,
            opacity: 0.7,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          Discover our most popular products loved by customers
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
          },
          gap: 3,
        }}
      >
        {trendingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
          // onClick={() => handleProductClick(product.id)}
        ))}
      </Box>
      
    </Container>
  );
};

export default HomeCard;
