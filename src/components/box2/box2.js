import { useEffect, useState } from "react";
import styles from "./box2.module.css";
const Box2 = ({ fun, clearboxes }) => {
  let [tc, settc] = useState("");
  useEffect(() => {
    if (clearboxes) {
      settc("");
    }
  }, [clearboxes]);
  
  return (
    <>
      <div className={styles.mainbox1}>
        <div className={styles.mainbox1header}></div>
        <div className={styles.mcqcon}>
          <div
            onClick={() => {
              settc("Strongly Agree");
              fun(1);
            }}
          >
            Strongly Agree
            {tc == "Strongly Agree" ? <img src={"/tick.png"} /> : ""}
          </div>
          <div
            onClick={() => {
              settc("Agree");
              fun(2);
            }}
          >
            Agree {tc == "Agree" ? <img src={"/tick.png"} /> : ""}
          </div>
          <div
            onClick={() => {
              settc("Neutral");
              fun(3);
            }}
          >
            Neutral {tc == "Neutral" ? <img src={"/tick.png"} /> : ""}
          </div>
          <div
            onClick={() => {
              settc("Disagree");
              fun(4);
            }}
          >
            Disagree {tc == "Disagree" ? <img src={"/tick.png"} /> : ""}
          </div>
          <div
            onClick={() => {
              settc("Strongly Disagree");
              fun(5);
            }}
          >
            Strongly Disagree{" "}
            {tc == "Strongly Disagree" ? <img src={"/tick.png"} /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};
export default Box2;
