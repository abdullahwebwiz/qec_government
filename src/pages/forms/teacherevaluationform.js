import Button from "@mui/material/Button";
// import '../css/form.module.css';
import styles from "../css/form.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import Box1 from "../../components/box1/box1";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState, lazy } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const PlzWait = lazy(() => import("../plzwait"));
const TeacherEvaluationForm = () => {
  let token = Cookies.get("token");
  let [isloggedin, setisloggedin] = useState("");
  let [questions, setquestions] = useState(null);
  let [qn, setqn] = useState(0);
  let [clearboxes, setclearboxes] = useState(false);
  let [question, setquestion] = useState("");
  let [batch, setbatch] = useState("");
  let [department, setdepartment] = useState("");
  let [qid, setqid] = useState("");
  let [sid, setsid] = useState("");
  let [teachers, setteachers] = useState(null);
  let [ratings, setratings] = useState([]);
  let [whatsem, setwhatsem] = useState("");
  let [wait, setwait] = useState(false);
  let [college, setcollege] = useState("");
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
          console.log(res.data.batch);
          if (res.data.batch) {
            setisloggedin("yes");
            setbatch(res.data.batch);
            setcollege(res.data.college);
            setdepartment(res.data.department);
            setsid(res.data.userid);
          } else {
            setisloggedin("no");
          }
        })
        .catch((err) => {
          console.log(err);
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
    let data = {
      batch: batch,
      department: department,
    };
    if (isloggedin == "yes") {
      if (batch && department) {
        let urlparams = new URLSearchParams(data).toString();
        axios
          .get(
            "http://164.92.193.40:3001/v1/semes_course_teacher/teachers?" +
              urlparams,
            {
              headers: {
                Authorization: `Bearer ` + token,
              },
            }
          )
          .then((res) => {
            setteachers(res.data.teachers);
            console.log(res.data.teachers);
          });
      }
    }
  }, [batch, department]);

  useEffect(() => {
    let data = {
      questionType: "teacherEvaluation",
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
          if (res) {
            setquestions(res.data.questions);
            console.log(res.data.questions);
          }
        });
    }
  }, [isloggedin]);

  useEffect(() => {
    if (localStorage.getItem("teacherevaluationform_qn")) {
      setqn(parseInt(localStorage.getItem("teacherevaluationform_qn")));
    }
  }, [localStorage.getItem("teacherevaluationform_qn")]);

  useEffect(() => {
    if (questions) {
      setquestion(questions[qn].question);
      setqid(questions[qn]._id);
    }
  }, [qn, questions]);

  function addrating(teacher, cr, i) {
    let newValue = { teacherId: i, grade: parseInt(cr) };
    const existingIndex = ratings.findIndex(
      (item) => item.teacherId === newValue.teacherId
    );
    if (existingIndex !== -1) {
      const newArray = [...ratings];
      newArray[existingIndex] = newValue;
      setratings(newArray);
    } else {
      setratings((prevArray) => [...prevArray, newValue]);
    }
  }

  const submitratings = () => {
    if (
      ratings.length == teachers.length &&
      qid &&
      sid &&
      whatsem &&
      department &&
      batch &&
      college
    ) {
      setwait(true);
      let data = {
        studentId: sid,
        questionId: qid,
        collegeName: college,
        semesterType: whatsem,
        semesterYear: new Date().getFullYear().toString(),
        department: department,
        evaluationType: "teacherEvaluation",
        ratings: ratings,
        batch: batch,
      };
      console.log(data);
      axios
        .post("http://164.92.193.40:3001/v1/ratings/teacherRating", data)
        .then((res) => {
          if (qn + 1 == questions.length) {
            navigate("/");
          } else {
            console.log(res);
            setqn(qn + 1);
            localStorage.setItem("teacherevaluationform_qn", qn + 1);
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
          <p>Teacher Evaluation Form by students</p>
        </div>
        <div className={styles.question}>
          <div className={styles.qn}>{`Q: ${qn + 1}/${
            questions ? questions.length : ""
          }`}</div>
          <div className={styles.qis}>{question ? question : "wait...."}</div>
        </div>
        <div className={styles.boxcon}>
          {!teachers
            ? ""
            : teachers.map((d, i) => {
                return (
                  <>
                    <Box1
                      title={d.teacherName}
                      key={d._id}
                      id={d._id}
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
            onClick={wait ? null : submitratings}
          >
            {questions ? (qn + 1 == questions.length ? "Done" : "Next") : ""}
          </div>
        </div>
      </>
    );
  }
};

export default TeacherEvaluationForm;
