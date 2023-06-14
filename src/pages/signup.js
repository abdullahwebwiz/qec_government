import { memo, useState, useEffect, lazy } from "react";
import Header from "../components/header/header";
import * as React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";

const PlzWait = lazy(() => import("./plzwait"));
let token = Cookies.get("token");

const SignUp = () => {
  let navigate = useNavigate();
  let [whatuser, setwhatuser] = useState("");
  let [isloggedin, setisloggedin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    personalNumber: "",
    enrollmentNumber: "",
    name: "",
    phone: "",
    email: "",
    cnic: "",
    college: "",
    department: "",
    fatherName: "",
    batch: "",
    password: "",
  });

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

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.cnic &&
      formData.college &&
      formData.department &&
      formData.password
    )
      if (
        (whatuser == "stu" && formData.batch && formData.enrollmentNumber) ||
        (whatuser == "tea" && formData.personalNumber)
      ) {
        if (formData.password.length >= 8) {
          let data = {
            userid:
              whatuser == "stu"
                ? formData.enrollmentNumber
                : formData.personalNumber,
            name: formData.name,
            mobile: formData.phone,
            email: formData.email,
            nic: formData.cnic,
            password: formData.password,
            department: formData.department,
            college: formData.college,
            batch: formData.batch.toString(),
          };
          const { batch, ...newdata } = data;
          console.log(whatuser == "stu" ? data : newdata);
          axios
            .post(
              "http://164.92.193.40:3002/v1/users",
              whatuser == "stu" ? data : newdata
            )
            .then((res) => {
              if (res.status >= 200 || res.status <= 299) {
                navigate("/login");
                toast.success("Successfully Signup.");
              }
            })
            .catch((err) => {
              console.log(err);
              toast.warn("Something went wrong.");
            });
        } else {
          toast.warn("Password must at least 8 characters long.");
        }
      } else {
        toast.error("Please fill all fields.");
      }
    else {
      toast.error("Please fill all fields.");
    }
  };

  const handleChange = (n, v) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [n]: v,
    }));
  };

  if (isloggedin == "") {
    return <PlzWait />;
  } else if (isloggedin == "yes") {
    return <Navigate to={"/"} />;
  } else if (isloggedin == "no") {
    return (
      <>
        <ToastContainer />
        <Header />
        {whatuser == "" ? (
          <div
            style={{
              width: "100%",
              marginTop: "100px",
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "300px",
                height: "150px",
                boxShadow: "3px 3px 10px green",
                backgroundColor: "#5db16e",
                margin: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
                borderRadius: "20px",
                fontWeight: "bold",
              }}
              onClick={() => {
                setwhatuser("tea");
              }}
            >
              I am a Teacher
            </div>
            <div
              style={{
                width: "300px",
                height: "150px",
                boxShadow: "3px 3px 10px green",
                backgroundColor: "#5db16e",
                margin: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
                borderRadius: "20px",
                fontWeight: "bold",
              }}
              onClick={() => {
                setwhatuser("stu");
              }}
            >
              I am a Student
            </div>
          </div>
        ) : (
          <>
            {" "}
            <Container maxWidth="md" style={{ marginTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "green" }} />
                  <Typography component="h1" variant="h5">
                    Sign Up
                  </Typography>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  {whatuser == "tea" ? (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Personal Number"
                        name="personalNumber"
                        value={formData.personalNumber}
                        onChange={(e) => {
                          handleChange(e.target.name, e.target.value);
                        }}
                        fullWidth
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Enrollment Number"
                        name="enrollmentNumber"
                        value={formData.enrollmentNumber}
                        onChange={(e) => {
                          handleChange(e.target.name, e.target.value);
                        }}
                        fullWidth
                      />
                    </Grid>
                  )}

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="CNIC"
                      name="cnic"
                      value={formData.cnic}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="College"
                      name="college"
                      value={formData.college}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                      fullWidth
                    >
                      {[
                        "GPGC Kohat",
                        "GGPGC Kohat",
                        "GDC KDA Kohat",
                        "GGDC KDA Kohat",
                        "GDC Gumbat Kohat",
                        "GDC Hangu",
                      ].map((college) => (
                        <MenuItem key={college} value={college}>
                          {college}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Department"
                      name="department"
                      value={formData.department}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                      fullWidth
                    >
                      {[
                        "Botany",
                        "Chemistry",
                        "Computer Science",
                        "Economics",
                        "English",
                        "General",
                        "Geography",
                        "Mathematics",
                        "Physics",
                        "Political Science",
                        "Statistics",
                        "Urdu",
                        "Zoology",
                      ].map((department) => (
                        <MenuItem key={department} value={department}>
                          {department}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  {whatuser == "stu" ? (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        label="Batch"
                        name="batch"
                        value={formData.batch}
                        onChange={(e) => {
                          handleChange(e.target.name, e.target.value);
                        }}
                        fullWidth
                      >
                        {[2019, 2020, 2021, 2022].map((batch) => (
                          <MenuItem key={batch} value={batch}>
                            {batch}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  ) : (
                    ""
                  )}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    align="center"
                    style={{ marginTop: "30px" }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      // fullWidth
                      sx={{
                        backgroundColor: "green",
                        fontSize: "16px",
                        padding: "5px",
                        width: "300px",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Typography
                      variant="body2"
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/login");
                        // navigate('/');
                      }}
                    >
                      Already have an account? Log in.
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </>
        )}
      </>
    );
  }
};

export default memo(SignUp);
