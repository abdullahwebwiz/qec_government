import Button from "@mui/material/Button";
import styles from "../css/form.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import Box2 from "../../components/box2/box2";
// import questions from "../../questions/programevaluationform";
import { useEffect, useState, lazy } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
let token = Cookies.get("token");
const PlzWait = lazy(() => import("../plzwait"));
const FacultySatisfactionForm = () => {
  let [questions, setquestions] = useState(null);
  let [isloggedin, setisloggedin] = useState("");
  let [qn, setqn] = useState(0);
  let [clearboxes, setclearboxes] = useState(false);
  let [question, setquestion] = useState("");
  let [qid, setqid] = useState("");
  let [tid, settid] = useState("");
  let [whatsem, setwhatsem] = useState("");
  let [college, setcollege] = useState("");
  let [department, setdepartment] = useState("");
  let [selectValue, setselectValue] = useState("");
  let [ratings, setratings] = useState(null);
  let [wait, setwait] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get("http://164.92.193.40:3002/v1/users/me", {
          headers: {
            Authorization: `Bearer ` + token,
          },
        })
        .then((res) => {
          if (!res.data.batch) {
            setisloggedin("yes");
            setdepartment(res.data.department);
            settid(res.data.userid);
            setcollege(res.data.college);
          } else {
            setisloggedin("no");
          }
        })
        .catch((err) => {
          setisloggedin("no");
        });
    } else {
      setisloggedin("no");
    }
  }, [token]);
  useEffect(() => {
    axios
      .get("http://164.92.193.40:3001/v1/config", {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        setwhatsem(res.data[0].semester.evaluationSemester);
      });
  }, [token]);
  useEffect(() => {
    if (localStorage.getItem("facultysatisfactionform_qn")) {
      setqn(parseInt(localStorage.getItem("facultysatisfactionform_qn")));
    }
  }, [localStorage.getItem("facultysatisfactionform_qn")]);

  useEffect(() => {
    if (questions) {
      setquestion(questions[qn].question);
      setqid(questions[qn].questionId);
    }
  }, [qn, questions]);

  useEffect(() => {
    let data = {
      questionType: "facultySatisfactionSurvey",
    };
    if (isloggedin == "yes") {
      let urlparams = new URLSearchParams(data).toString();
      axios
        .get("http://164.92.193.40:3001/v1/questions?" + urlparams, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res);
          setquestions(res.data.questions);
        });
    }
  }, [isloggedin]);

  const addrating = (tc) => {
    let obj = [{ questionId: qid.toString(), grade: parseInt(tc) }];
    setratings(obj);
  };

  const submitratings = () => {
    if (ratings && tid && qid && department) {
      let data = {
        teacherId: tid,
        collegeName: college,
        semesterType: whatsem,
        semesterYear: new Date().getFullYear().toString(),
        department: department,
        evaluationType: "programEvaluation",
        ratings: ratings,
      };
      console.log(data);
      axios
        .post(
          "http://164.92.193.40:3001/v1/ratings/facultySatisfactionRating",
          data
        )
        .then((res) => {
          if (qn + 1 == questions.length) {
            navigate("/");
          } else {
            console.log(res);
            setqn(qn + 1);
            localStorage.setItem("degreeprogramsurveyform_qn", qn + 1);
            setclearboxes(qn + 1);
            setratings([]);
            setwait(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warn("Please fill all fields");
    }
  };

  if (isloggedin == "") {
    return <PlzWait />;
  } else if (isloggedin == "no") {
    return <Navigate to={"/"} />;
  } else if (isloggedin == "yes") {
    return (
      <>
        <ToastContainer />
        <div className={styles.formhead}>
          <p>Faculty Satisfaction Survey form</p>
        </div>
        <div className={styles.question}>
          <div className={styles.qn}>{`Q: ${qn + 1}/${
            questions ? questions.length : ""
          }`}</div>
          <div className={styles.qis}>{question ? question : "wait...."}</div>
        </div>
        <div className={styles.boxcon} style={{ marginTop: "50px" }}>
          <Box2 fun={addrating} clearboxes={clearboxes} />
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
              marginTop: "30px",
            }}
            onClick={wait ? null : submitratings}
          >
            {questions ? (qn + 1 == questions.length ? "Done" : "Next") : ""}
          </div>
        </div>
      </>
    );
  }
};
export default FacultySatisfactionForm;
