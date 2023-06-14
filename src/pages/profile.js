import { memo, useEffect, useState, lazy } from "react";
import Header from "../components/header/header";
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
import { Navigate, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Cookies from "js-cookie";
const PlzWait = lazy(() => import("./plzwait"));
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

const Profile = () => {
  let navigate = useNavigate();
  let token = Cookies.get("token");
  let [isloggedin, setisloggedin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [nic, setnic] = useState("");

  useEffect(() => {
    if (token) {
      axios
        .get("http://164.92.193.40:3002/v1/users/me", {
          headers: {
            Authorization: `Bearer ` + token,
          },
        })
        .then((res) => {
          setisloggedin("yes");
        })
        .catch((err) => {
          setisloggedin("no");
        });
    } else {
      setisloggedin("no");
    }
  }, [token]);



  useEffect(() => {
    if (isloggedin == "yes") {
      axios
        .get("http://164.92.193.40:3002/v1/users/me", {
          headers: {
            Authorization: `Bearer ` + token,
          },
        })
        .then((res) => {
          setname(res.data.name);
          setemail(res.data.email);
          setnic(res.data.nic);
          setphone(res.data.mobile);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isloggedin]);

  const handleUpdate = (event) => {
    event.preventDefault();
    return null;
  };

  if (isloggedin == "") {
    return <PlzWait />;
  } else if (isloggedin == "no") {
    return <Navigate to={"/"} />;
  } else if (isloggedin == "yes") {
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
                Profile
              </Typography>
              <Box
                component="form"
                onSubmit={handleUpdate}
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
                  disabled
                  // onChange={(e) => setname(e.target.value)}
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
                  disabled
                  // onChange={(e) => setphone(e.target.value)}
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
                  disabled
                  // onChange={(e) => setemail(e.target.value)}
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
                  disabled
                  // onChange={(e) => setnic(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "#5db16e" }}
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </>
    );
  }
};

export default memo(Profile);
