import React from "react";
import { useLocation } from "react-router-dom";
import {
  Typography,
  IconButton,
  Box,
  Button,
  Container,
  Stack,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
const colors = {
  primary: "#ff6b35",
  secondary: "#fff3e6",
  accent: "#2ec4b6",
  background: "#fff9f4",
  text: "#1a1a1a",
  cardBg: "#ffffff",
};
const Footer = () => {
  const path = useLocation().pathname;
  if (path == "/login" || path == "/signup") {
    return null;
  }
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: colors.cardBg,

        borderTop: `1px solid ${colors.secondary}`,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ py: 6 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "2fr 1fr 1fr 1.5fr",
              },
              gap: 4,
            }}
          >
            {/* About Section */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${colors.primary}, ${colors.accent})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                MingleMart
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: colors.text, mb: 2, maxWidth: "300px" }}
              >
                Your one-stop destination for modern fashion and accessories. We
                bring you the latest trends with unmatched quality and style.
              </Typography>
              <Stack direction="row" spacing={2}>
                {["📱", "📘", "📸", "🐦"].map((icon, index) => (
                  <IconButton
                    key={index}
                    size="small"
                    sx={{
                      color: colors.text,
                      "&:hover": {
                        color: colors.primary,
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>

            {/* Quick Links */}
            <Box>
              <Typography
                variant="h6"
                sx={{ color: colors.text, mb: 2, fontWeight: 600 }}
              >
                Quick Links
              </Typography>
              {["About Us", "Shop Now", "Categories", "Contact"].map((link) => (
                <Button
                  key={link}
                  sx={{
                    display: "block",
                    color: colors.text,
                    py: 0.5,
                    textAlign: "left",
                    textTransform: "none",
                    "&:hover": {
                      color: colors.primary,
                      transform: "translateX(5px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {link}
                </Button>
              ))}
            </Box>

            {/* Customer Service */}
            <Box>
              <Typography
                variant="h6"
                sx={{ color: colors.text, mb: 2, fontWeight: 600 }}
              >
                Customer Service
              </Typography>
              {["FAQ", "Shipping Info", "Returns", "Track Order"].map(
                (link) => (
                  <Button
                    key={link}
                    sx={{
                      display: "block",
                      color: colors.text,
                      py: 0.5,
                      textAlign: "left",
                      textTransform: "none",
                      "&:hover": {
                        color: colors.primary,
                        transform: "translateX(5px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {link}
                  </Button>
                )
              )}
            </Box>

            {/* Newsletter */}
            <Box>
              <Typography
                variant="h6"
                sx={{ color: colors.text, mb: 2, fontWeight: 600 }}
              >
                Newsletter
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text, mb: 2 }}>
                Subscribe to get special offers and updates
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Your email address"
                size="small"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: colors.background,
                    "&:hover fieldset": {
                      borderColor: colors.primary,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.primary,
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: colors.primary,
                          "&:hover": {
                            bgcolor: colors.accent,
                          },
                          textTransform: "none",
                        }}
                      >
                        Subscribe
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: colors.secondary }} />

        <Box
          sx={{
            py: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: colors.text }}>
            © 2025 MingleMart. All rights reserved.
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: colors.secondary }}
              />
            }
          >
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Button
                  key={item}
                  sx={{
                    color: colors.text,
                    textTransform: "none",
                    "&:hover": {
                      color: colors.primary,
                    },
                  }}
                >
                  {item}
                </Button>
              )
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
