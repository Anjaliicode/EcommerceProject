import { Box } from "@mui/material";

import Categories from "../components/Categories";
import Crausal from "./Crausal";
import HomeCard from "./HomeCard";
import FeaturedProducts from "./Feature"

// import AppBar from "./AppBar";

const colors = {
  primary: "#ff6b35",
  secondary: "#fff3e6",
  accent: "#2ec4b6",
  background: "#fff9f4",
  text: "#1a1a1a",
  cardBg: "#ffffff",
};

const Homepage = () => {
  return (
    <Box
      sx={{
        bgcolor: colors.background,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ---------Navbar-------- */}
    
      {/* -----------Crausal--------- */}
      <Crausal />
      {/* -----------ProductCard---------- */}
      <HomeCard />
      {/* --------Categories------- */}
      <Categories />
      <FeaturedProducts/>
      {/* --------Footer-------- */}
      {/* <Footer/> */}
    </Box>
  );
};

export default Homepage;
