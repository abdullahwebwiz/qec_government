import { useEffect, useState } from "react";
import styles from "./box1.module.css";
const Box1 = ({ title, fun, id, clearboxes }) => {
  let [tc, settc] = useState("");
  useEffect(() => {
    if (clearboxes) {
      settc("");
    }
  }, [clearboxes]);
  return (
    <>
      <div className={styles.mainbox1}>
        <div className={styles.mainbox1header}>{title}</div>
        <div className={styles.mcqcon}>
          <div
            onClick={() => {
              settc("Strongly Agree");
              fun(title, "Strongly Agree", id);
            }}
          >
            Strongly Agree
            {tc == "Strongly Agree" ? <img src={"/tick.png"} /> : ""}
          </div>
          <div
            onClick={() => {
              settc("Agree");
              fun(title, "Agree", id);
            }}
          >
            Agree {tc == "Agree" ? <img src={"/tick.png"} /> : ""}
          </div>
          <div
            onClick={() => {
              settc("Neutral");
              fun(title, "Neutral", id);
            }}
          >
            Neutral {tc == "Neutral" ? <img src={"/tick.png"} /> : ""}
          </div>
          <div
            onClick={() => {
              settc("Disagree");
              fun(title, "Disagree", id);
            }}
          >
            Disagree {tc == "Disagree" ? <img src={"/tick.png"} /> : ""}
          </div>
          <div
            onClick={() => {
              settc("Strongly Disagree");
              fun(title, "Strongly Disagree", id);
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
export default Box1;
