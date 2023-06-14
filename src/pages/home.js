import axios from "axios";
import Cookies from "js-cookie";
import { memo, useEffect, useState, Suspense } from "react";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
const Home1 = lazy(() => import("./homepages/home1"));
const Home2 = lazy(() => import("./homepages/home2"));
const PlzWait = lazy(() => import("./plzwait"));
const Home = () => {
  let [isloggedin, setisloggedin] = useState("");
  let [whatuser, setwhatuser] = useState("");
  let [whatsem, setwhatsem] = useState("");
  let token = Cookies.get("token");
  useEffect(() => {
    if(isloggedin == 'yes'){
      axios
      .get("http://164.92.193.40:3001/v1/config", {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        console.log(res.data[0].semester.evaluationSemester);
        setwhatsem(res.data[0].semester.evaluationSemester);
      });
    }
  }, [isloggedin]);


  useEffect(() => {
    if (token) {
      axios
        .get("http://164.92.193.40:3002/v1/users/me", {
          headers: {
            Authorization: `Bearer ` + token,
          },
        })
        .then((res) => {
          console.log(res);
          setisloggedin("yes");
          if (res.data.batch) {
            let currentYear = new Date().getFullYear();
            let x = (currentYear - parseInt(res.data.batch)) * 2;
            if (x == 8 && whatsem == "Spring") {
              setwhatuser("stu8");
            } else {
              setwhatuser("stu");
            }
          } else {
            setwhatuser("tea");
          }
        })
        .catch((err) => {
          setisloggedin("no");
        });
    } else {
      setisloggedin("no");
    }
  }, [token, whatsem]);

  if (isloggedin == "") {
    return <PlzWait />;
  } else if (isloggedin == "no") {
    return (
      <Suspense fallback={<PlzWait />}>
        <Home1 />
      </Suspense>
    );
  } else if (isloggedin == "yes") {
    return (
      <Suspense fallback={<PlzWait />}>
        <Home2 whatuser={whatuser} />
      </Suspense>
    );
  }
};
export default memo(Home);
