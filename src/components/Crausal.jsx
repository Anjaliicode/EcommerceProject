import React, { useState, useEffect } from "react";
import {
  Typography,
  IconButton,
  Box,
  Button,
  Container,
  Paper,
} from "@mui/material";

import bags from "../assets/bags.png";
import headphone from "../assets/headphone.png";
import mens from "../assets/mens.png";

const colors = {
  primary: "#ff6b35",
  secondary: "#fff3e6",
  accent: "#2ec4b6",
  background: "#fff9f4",
  text: "#1a1a1a",
  cardBg: "#ffffff",
};

const carouselData = [
  {
    title: "New Collection",
    subtitle: "Best Selection Of Bags",
    description:
      "Discover our latest collection of premium bags crafted for style and functionality.",
    image: bags,
  },
  {
    title: "Summer Sale",
    subtitle: "Up to 50% Off",
    description:
      "Explore our summer collection with incredible discounts on selected items.",
    image: headphone,
  },
  {
    title: "Premium Quality",
    subtitle: "Handcrafted Excellence",
    description:
      "Each piece is carefully crafted using the finest materials and attention to detail.",
    image: mens,
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState("left");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isHovered && !isAnimating) {
      const timer = setInterval(() => {
        handleNextSlide();
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [isHovered, isAnimating]);

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection("left");
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection("right");
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <Container maxWidth="xl" className="mt-8">
      <Paper
        elevation={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          bgcolor: colors.secondary,
          borderRadius: { xs: 2, sm: 4, md: 6 },
          transition: "transform 0.3s ease",
          position: "relative",
          overflow: "hidden",
          height: { xs: "auto", sm: "400px", md: "500px" },
          "&:hover": {
            transform: "translateY(-2px)",
          },
        }}
      >
        {/* Navigation Buttons */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,

            transform: "translateY(-50%)",
            display: { xs: "none", sm: "flex" },
            justifyContent: "space-between",
            px: { sm: 2, md: 4 },
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <IconButton
            onClick={handlePrevSlide}
            sx={{
              color: colors.text,
              bgcolor: "rgba(255,255,255,0.8)",
              "&:hover": {
                bgcolor: colors.primary,
                color: "white",
              },
              pointerEvents: "auto",
              width: { sm: 32, md: 40 },
              height: { sm: 32, md: 40 },
            }}
          >
            ←
          </IconButton>
          <IconButton
            onClick={handleNextSlide}
            sx={{
              color: colors.text,
              bgcolor: "rgba(255,255,255,0.8)",
              "&:hover": {
                bgcolor: colors.primary,
                color: "white",
              },
              pointerEvents: "auto",
              width: { sm: 32, md: 40 },
              height: { sm: 32, md: 40 },
            }}
          >
            →
          </IconButton>
        </Box>

        {/* Mobile Navigation Dots */}
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            display: { xs: "flex", sm: "none" },
            gap: 1,
            zIndex: 2,
          }}
        >
          {carouselData.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",

                bgcolor:
                  currentSlide === index
                    ? colors.primary
                    : "rgba(255,255,255,0.8)",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            px: { xs: 2, sm: 4, md: 14 },
            alignItems: "center",
            height: "100%",
            py: { xs: 3, sm: 2 },
            transform: isAnimating
              ? `translateX(${slideDirection === "left" ? "-100%" : "100%"})`
              : "translateX(0)",
            transition: "transform 0.5s ease-in-out",
            opacity: isAnimating ? 0 : 1,
          }}
        >
          <Box
            sx={{
              flex: { xs: "1", md: "1.2" },
              pr: { md: 3 },
              textAlign: { xs: "center", md: "left" },
              mb: { xs: 3, md: 0 },
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: colors.primary,
                fontWeight: 700,
                mb: 0.5,
                fontSize: { xs: "2rem", sm: "3rem", md: "4.8rem" },
                lineHeight: { xs: 1.2, md: 1.1 },
              }}
            >
              {carouselData[currentSlide].title}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: colors.text,
                mb: 0.5,
                fontWeight: 600,
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2.2rem" },
                lineHeight: 1.2,
              }}
            >
              {carouselData[currentSlide].subtitle}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.text,
                mb: 1.5,
                maxWidth: { xs: "100%", md: "400px" },
                fontSize: { xs: "0.9rem", md: "1rem" },
                lineHeight: "1.4",
                py: { xs: 1, md: 2 },
                mx: { xs: "auto", md: 0 },
              }}
            >
              {carouselData[currentSlide].description}
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: colors.primary,
                "&:hover": {
                  bgcolor: colors.accent,
                  transform: "translateY(-2px)",
                },
                px: { xs: 4, md: 5.5 },
                py: { xs: 0.5, md: 0.75 },
                width: 200,
                borderRadius: "20px",
                textTransform: "none",
                fontSize: { xs: "0.8rem", md: "0.9rem" },
                transition: "all 0.3s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Shop Now
            </Button>
          </Box>
          <Box
            sx={{
              flex: { xs: "1", md: "0.8" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "200px", sm: "250px", md: "300px" },
              width: { xs: "100%", md: "auto" },
              overflow: "hidden",
            }}
          >
            <img
              src={carouselData[currentSlide].image}
              alt="Product"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "8px",
                transition: "transform 0.4s ease",
                maxHeight: "100%",
              }}
            />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Carousel;
