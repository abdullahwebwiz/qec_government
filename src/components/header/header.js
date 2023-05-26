import styles from "./header.module.css";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
const Header = () => {
  let navigate = useNavigate();
  let [butcol, setbutcol] = useState("");
  useEffect(() => {
    setbutcol(window.location.pathname);
  }, [window.location.pathname]);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logoimg}>
          <Link to={"/"}>
            <img src="/headerimage.png" />
          </Link>
        </div>
        <div className={styles.titlecon}>
          <div className={styles.qec}>QEC for</div>
          <div className={styles.clname}>
            Governament Post Graduate College Kohat
          </div>
        </div>
        <div className={styles.navcon}>
          <Button
            variant="contained"
            size="small"
            style={{
              margin: "10px",
              backgroundColor: butcol == "/contact" ? "white" : "#5db16e",
              color: butcol == "/contact" ? "#5db16e" : "white",
            }}
            onClick={() => {
              setbutcol("/contact");
              navigate("/contact");
            }}
          >
            Contact
          </Button>
          <Button
            variant="contained"
            size="small"
            style={{
              margin: "10px",
              backgroundColor: butcol == "/login" ? "white" : "#5db16e",
              color: butcol == "/login" ? "#5db16e" : "white",
            }}
            onClick={() => {
              setbutcol("/login");
              navigate("/login");
            }}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            size="small"
            style={{
              margin: "10px",
              backgroundColor: butcol == "/signup" ? "white" : "#5db16e",
              color: butcol == "/signup" ? "#5db16e" : "white",
            }}
            onClick={() => {
              setbutcol("/signup");
              navigate("/signup");
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </>
  );
};
export default Header;
