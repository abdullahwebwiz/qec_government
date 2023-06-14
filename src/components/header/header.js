import styles from "./header.module.css";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
let token = Cookies.get("token");
const Header = () => {
  let [isloggedin, setisloggedin] = useState("");
  let [showmenu, setshowmenu] = useState(false);
  let navigate = useNavigate();
  let [butcol, setbutcol] = useState("");
  let [college, setcollege] = useState("Governament Colleges");

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
          setcollege(res.data.college);
        })
        .catch((err) => {
          setisloggedin("no");
        });
    } else {
      setisloggedin("no");
    }
  }, [token]);

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
          <div className={styles.clname}>{college}</div>
        </div>
        {isloggedin == "" ? (
          ""
        ) : isloggedin == "yes" ? (
          <Avatar
            sx={{
              cursor: "pointer",
              position: "absolute",
              right: "10px",
              top: "10px",
              width: 44,
              height: 44,
              backgroundColor: "white",
            }}
            onClick={() => {
              if (!showmenu) {
                setshowmenu(true);
              } else {
                setshowmenu(false);
              }
            }}
          >
            <PersonIcon
              sx={{
                width: 28,
                height: 28,
                backgroundColor: "white",
                color: "lightgreen",
                cursor: "pointer",
              }}
            />
          </Avatar>
        ) : (
          <div className={styles.navcon}>
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
          </div>
        )}
        {showmenu ? (
          <div className={styles.menubar}>
            <div
              onClick={() => {
                setshowmenu(false);
                navigate("/profile");
              }}
            >
              Profile
            </div>
            <div
              onClick={() => {
                setshowmenu(false);
                navigate("/contact");
              }}
            >
              Contact
            </div>
            <div
              onClick={() => {
                setshowmenu(false);
                Cookies.remove("token");
                navigate("/");
                setisloggedin("no");
                window.location.reload();
              }}
            >
              Logout
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default Header;
