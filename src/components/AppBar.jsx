import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Button,
    Container,
    Stack,
    Badge,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { Link } from 'react-router-dom';

const colors = {
    primary: "#ff6b35",
    secondary: "#fff3e6",
    accent: "#2ec4b6",
    background: "#fff9f4",
    text: "#1a1a1a",
    cardBg: "#ffffff",
};

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const navItems = ["Home", "Products", "ContactUs"];
    
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(8px)",
                borderBottom: `2px solid ${colors.secondary}`,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{ py: 1, display: "flex", alignItems: "center" }}
                >
                    {/* Logo */}
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 4,
                            fontWeight: 900,
                            background: `linear-gradient(45deg, ${colors.primary}, ${colors.accent})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: "0.5px",
                            fontFamily: "cursive",
                        }}
                    >
                       🛒MartLite
                    </Typography>

                    {/* Hamburger Menu Icon - Only visible on mobile */}
                    <IconButton
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            ml: 'auto',
                            color: colors.text,
                        }}
                        onClick={toggleMobileMenu}
                    >
                        ☰
                    </IconButton>

                    {/* Desktop Navigation - Hidden on mobile */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            gap: 2,
                            justifyContent: "center",
                        }}
                    >
                        {navItems.map((page) => (
                            <Link
                                to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                                key={page}
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    sx={{
                                        color: colors.text,
                                        px: 2,
                                        position: "relative",
                                        "&:hover": {
                                            color: colors.primary,
                                            "&::after": {
                                                width: "100%",
                                            },
                                        },
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            width: "0%",
                                            height: "2px",
                                            bgcolor: colors.primary,
                                            transition: "width 0.3s ease",
                                        },
                                    }}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    {/* Desktop Icons - Hidden on mobile */}
                    <Stack 
                        direction="row" 
                        spacing={3}
                        sx={{ 
                            display: { xs: 'none', md: 'flex' } 
                        }}
                    >
                        <IconButton
                            sx={{
                                color: colors.text,
                                transition: "transform 0.2s",
                                "&:hover": {
                                    color: colors.primary,
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            <Badge badgeContent={1} color="error">
                                🛒
                            </Badge>
                        </IconButton>
                        <IconButton
                            sx={{
                                color: colors.text,
                                transition: "transform 0.2s",
                                "&:hover": {
                                    color: colors.primary,
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            <Badge badgeContent={1} color="error">
                                ❤️
                            </Badge>
                        </IconButton>
                        <IconButton
                            sx={{
                                color: colors.text,
                                transition: "transform 0.2s",
                                "&:hover": {
                                    color: colors.primary,
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            👤
                        </IconButton>
                    </Stack>

                    {/* Mobile Menu Drawer */}
                    <Drawer
                        anchor="right"
                        open={mobileMenuOpen}
                        onClose={toggleMobileMenu}
                        sx={{
                            '& .MuiDrawer-paper': {
                                width: '70%',
                                maxWidth: '300px',
                                bgcolor: colors.background,
                                px: 2,
                            },
                        }}
                    >
                        <List sx={{ mt: 2 }}>
                            {navItems.map((page) => (
                                <ListItem key={page} disablePadding>
                                    <Link
                                        to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                                        style={{ textDecoration: 'none', width: '100%' }}
                                        onClick={toggleMobileMenu}
                                    >
                                        <ListItemButton
                                            sx={{
                                                color: colors.text,
                                                '&:hover': {
                                                    color: colors.primary,
                                                    bgcolor: colors.secondary,
                                                },
                                            }}
                                        >
                                            <ListItemText primary={page} />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                            ))}
                            
                            {/* Mobile Menu Icons */}
                            <ListItem sx={{ mt: 2 }}>
                                <Stack direction="row" spacing={3}>
                                    <IconButton>
                                        <Badge badgeContent={1} color="error">
                                            🛒
                                        </Badge>
                                    </IconButton>
                                    <IconButton>
                                        <Badge badgeContent={1} color="error">
                                            ❤️
                                        </Badge>
                                    </IconButton>
                                    <IconButton>
                                        👤
                                    </IconButton>
                                </Stack>
                            </ListItem>
                        </List>
                    </Drawer>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;