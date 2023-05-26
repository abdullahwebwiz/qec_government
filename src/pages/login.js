import { memo, useState } from "react";
import Header from "../components/header/header";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          style: {
            color: "green",
          },
        },
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#5db16e",
            },
        },
      },
    },
  },
});

const LogIn = () => {
  let navigate = useNavigate();
  const [mobile, setMobile] = useState("+923339652345");
  const [password, setPassword] = useState("q@vi111");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mobile && password) {
      axios
        .post("http://164.92.193.40:3002/v1/login", {
          mobile: mobile,
          password: password,
          realm: "qec",
          platform: "web",
        })
        .then((res) => {
          console.log(res);
        });
    } else {
      toast.warning("Please fill all fields.");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <Header />

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" style={{}}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#5db16e" }} />
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="phonenumber"
                label="Phone Number"
                name="phonenumber"
                autoComplete="number"
                autoFocus
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#5db16e" }}
                onClick={handleSubmit}
              >
                Log In
              </Button>
            </Box>
          </Box>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              size="small"
              style={{
                margin: "10px",
                backgroundColor: "#DE7070",
                color: "white",
              }}
              onClick={() => {
                navigate("/contact");
              }}
            >
              forgot Password?
            </Button>
            <Button
              variant="contained"
              size="small"
              style={{
                margin: "10px",
                backgroundColor: "green",
                color: "white",
              }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              sign up
            </Button>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default memo(LogIn);