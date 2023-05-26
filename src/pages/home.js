import { memo, useEffect, useRef, useState } from "react";
import Header from "../components/header/header";
import styles from "./css/home.module.css";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let [text1, settext1] = useState(false);
  let [text2, settext2] = useState(false);
  let [text3, settext3] = useState(false);
  let [text4, settext4] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      settext1(true);
    }, 0);
    setTimeout(() => {
      settext2(true);
    }, 1000);
    setTimeout(() => {
      settext3(true);
    }, 2300);
    setTimeout(() => {
      settext4(true);
    }, 4500);
  }, []);
  const navfun = () => {
    alert("all good");
  };
  return (
    <>
      <Header />
      <div className={styles.imgcon}>
        <img src={"/headerimage.png"} />
      </div>
      <div className={styles.alltexts}>
        <h1 className={styles.text1}>
          {text1 ? (
            <Typewriter
              options={{
                cursor: "",
                delay: 20,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Welcome to")
                  .callFunction(() => {
                    console.log("String typed out!");
                  })
                  .start();
              }}
            />
          ) : (
            ""
          )}
        </h1>
        <h1 className={styles.text2}>
          {text2 ? (
            <Typewriter
              options={{
                cursor: "",
                delay: 20,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Quality Enhancement Cell for")
                  .callFunction(() => {
                    console.log("String typed out!");
                  })
                  .start();
              }}
            />
          ) : (
            ""
          )}
        </h1>
        <h1 className={styles.text3}>
          {text3 ? (
            <Typewriter
              options={{
                cursor: "",
                delay: 40,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Governament Colleges (Khyber Pakhtunkhwa)")
                  .callFunction(() => {
                    console.log("String typed out!");
                  })
                  .start();
              }}
            />
          ) : (
            ""
          )}
        </h1>
        <h1 className={styles.text4}>
          {text4 ? (
            <>
              <span
                style={{ color: "blue", cursor: "pointer",textDecoration: 'underline blue 2px' }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>{" "}
              OR{" "}
              <span
                style={{ color: "blue", cursor: "pointer",textDecoration: 'underline blue 2px' }}
                onClick={() => navigate("/login")}
              >
                Log In
              </span>{" "}
              to Proceed. Thank you.
            </>
          ) : (
            ""
          )}
        </h1>
      </div>
    </>
  );
};

export default memo(Home);
