import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function AppBarLabel({ label, themeHandler, isDark = false }) {
  const navigate = useNavigate();
  return (
    <Toolbar
      sx={{
        "&.MuiToolbar-root": {
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        },
      }}
    >
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <IconButton
        onClick={() => navigate("/")}
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {label}
        </Typography>
      </IconButton>

      <button
        onClick={themeHandler}
        aria-label="change theme"
        style={{
          backgroundColor: "inherit",
          border: "none",
          marginBottom: "0px",
          color: isDark ? "white" : "#1976d2",
        }}
      >
        <DarkModeIcon />
      </button>
    </Toolbar>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export default function Header() {
  const [theme, setTheme] = useState("dark");
  const themeHandler = () => {
    return setTheme((preVal) => (preVal === "dark" ? "light" : "dark"));
  };
  const isDarkTheme = theme === "dark";

  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar
          position="static"
          color="primary"
          enableColorOnDark={isDarkTheme}
        >
          {
            <AppBarLabel
              label="Task Management APP"
              themeHandler={themeHandler}
              isDark={isDarkTheme}
            />
          }
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
}
