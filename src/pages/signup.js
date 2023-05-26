import { memo, useState } from "react";
import Header from "../components/header/header";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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

const SignUp = () => {
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [nic, setnic] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && email && phone && nic && password && cpassword) {
      if (password == cpassword) {
        axios.post("", {
          name: name,
          email: email,
          phone: phone,
          nic: nic,
          password: password,
        });
      } else {
        toast.warning("Passwords do not Match!");
      }
    } else {
      toast.warning("Please fill all fields.");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <>
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          style={{ marginTop: "-50px", marginBottom: "100px" }}
        >
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
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phonenumber"
                label="Phone Number"
                name="phonenumber"
                autoComplete="number"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="cnic"
                label="CNIC"
                name="cnic"
                autoComplete="cnic"
                value={nic}
                onChange={(e) => setnic(e.target.value)}
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
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmpassword"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                value={cpassword}
                onChange={(e) => setcpassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#5db16e" }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
          <div
            style={{
              textAlign: "right",
              color: " #3399ff",
              textDecoration: "underline",
              fontSize: "15px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have account? LogIn
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default memo(SignUp);
