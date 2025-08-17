import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles"; // still works if you installed @mui/styles
import { useNavigate } from "react-router-dom"; // ✅ useNavigate instead of useHistory
import React from "react";
import { ThemeProvider } from "@emotion/react";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#f5d311ff !important", // force override
    fontFamily: "Russo One",
    fontWeight: "800 !important",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    letterSpacing: "4px !important",
    textTransform: "uppercase !important",
    fontSize: "1.8rem !important",
    lineHeight: "1.6 !important",
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate(); // ✅ new hook
  const { currency, setCurrency } = CryptoState();
  console.log(currency);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ffff00ff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              className={classes.title}
              onClick={() => navigate("/")} // ✅ replaces history.push('/')
              variant="h6"
            >
              {/* Logo Image */}
              <img
                src="./logo.png"
                alt="Crypto Logo"
                style={{
                  height: "45px",
                  width: "55px",
                  /*filter: "brightness(0) saturate(100%) invert(85%) sepia(58%) saturate(2476%) hue-rotate(2deg) brightness(118%) contrast(92%)"*/ // Makes it gold colored
                }}
              />
              Bit Nexus
            </Typography>

            <Select
              variant="outlined"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              sx={{
                width: 100,
                height: 40,
                mr: 2,
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#f5d311ff", // gold border
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFD700", // brighter gold on hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFD700", // gold when focused
                },
                "& .MuiSvgIcon-root": {
                  color: "#f5d311ff", // dropdown arrow in gold
                },
              }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
