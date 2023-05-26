import Button from "@mui/material/Button";
import styles from "../css/form.module.css";
import { useNavigate } from "react-router-dom";
import Box1 from "../../components/box1/box1";
import questions from "../../questions/teacherevaluationform";
import { useEffect, useState } from "react";
import axios from "axios";
const TeacherEvalutionForm = () => {
  let [qn, setqn] = useState(0);
  let [clearboxes, setclearboxes] = useState(false);
  let [question, setquestion] = useState("");
  let [ratings, setratings] = useState([
    { teacher: "", selectValue: "" },
    { teacher: "", selectValue: "" },
    { teacher: "", selectValue: "" },
    { teacher: "", selectValue: "" },
    { teacher: "", selectValue: "" },
    { teacher: "", selectValue: "" },
  ]);

  let navigate = useNavigate();
  let teachers = [
    "Prof. Tanzeel",
    "Prof Kamal",
    "Prof Jamal",
    "Prof kamran",
    "Prof Saim",
    "Prof Waqas",
  ];

  useEffect(() => {
    setquestion(questions[qn].question);
  }, [qn]);

  const addrating = (teacher, tc, id) => {
    ratings[id].teacher = teacher;
    ratings[id].selectValue = tc;
    setratings(ratings);
  };

  const submitratings = () => {
    if (
      ratings[0].selectValue != "" &&
      ratings[1].selectValue != "" &&
      ratings[2].selectValue != "" &&
      ratings[3].selectValue != "" &&
      ratings[4].selectValue != "" &&
      ratings[5].selectValue != ""
    ) {
      setqn(qn + 1);
      setclearboxes(qn + 1);
      setratings([
        { teacher: "", selectValue: "" },
        { teacher: "", selectValue: "" },
        { teacher: "", selectValue: "" },
        { teacher: "", selectValue: "" },
        { teacher: "", selectValue: "" },
        { teacher: "", selectValue: "" },
      ]);
    } else {
      alert("Plz fill all fields");
    }
  };

  return (
    <>
      <div className={styles.formhead}>
        <p>Teachers Evaluation Form by students</p>
      </div>
      <div className={styles.question}>{question}</div>
      <div className={styles.boxcon}>
        {teachers.map((d, i) => {
          return (
            <>
              <Box1
                title={d}
                key={i}
                id={i}
                fun={addrating}
                clearboxes={clearboxes}
              />
            </>
          );
        })}
      </div>
      <div className={styles.nextbutcon}>
        <div
          style={{
            backgroundColor: "#039130",
            color: "white",
            fontWeight: "bold",
            width: "300px",
            height: "40px",
            borderRadius: "20px",
            fontSize: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            paddingBottom: "3px",
          }}
          onClick={submitratings}
        >
          Next
        </div>
      </div>
    </>
  );
};
export default TeacherEvalutionForm;
