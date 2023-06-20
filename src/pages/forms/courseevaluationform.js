import Button from "@mui/material/Button";
import styles from "../css/form.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import Box1 from "../../components/box1/box1";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState, lazy } from "react";
import axios from "axios";
import { height } from "@mui/system";
import Cookies from "js-cookie";
const PlzWait = lazy(() => import("../plzwait"));
const CourseEvalutionForm = () => {
  let token = Cookies.get("token");
  let [isloggedin, setisloggedin] = useState("");
  let [questions, setquestions] = useState(null);
  let [qn, setqn] = useState(0);
  let [clearboxes, setclearboxes] = useState(false);
  let [question, setquestion] = useState("");
  let [college, setcollege] = useState("");
  let [batch, setbatch] = useState("");
  let [department, setdepartment] = useState("");
  let [qid, setqid] = useState("");
  let [sid, setsid] = useState("");
  let [subjects, setsubjects] = useState(null);
  let [ratings, setratings] = useState([]);
  let [whatsem, setwhatsem] = useState("");
  let [wait, setwait] = useState(false);
  let [mainresult, setmainresult] = useState([]);
  let [xx, setxx] = useState(0);
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
          if (res.data.batch) {
            setisloggedin("yes");
            setbatch(res.data.batch);
            setdepartment(res.data.department);
            setcollege(res.data.college);
            setsid(res.data.userid);
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
    let data = {
      batch: batch,
      department: department,
    };
    if (isloggedin == "yes") {
      if (batch && department) {
        let urlparams = new URLSearchParams(data).toString();
        axios
          .get(
            "http://164.92.193.40:3001/v1/semes_course_teacher/courses?" +
              urlparams,
            {
              headers: {
                Authorization: `Bearer ` + token,
              },
            }
          )
          .then((res) => {
            setsubjects(res.data.courses);
            console.log(res.data.courses);
          });
      }
    }
  }, [batch, department]);

  useEffect(() => {
    let data = {
      questionType: "courseEvaluation",
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
          setquestions(res.data.questions);
          console.log(res.data.questions);
        });
    }
  }, [isloggedin]);

  useEffect(() => {
    if (questions) {
      setquestion(questions[qn].question);
      setqid(questions[qn]._id);
    }
  }, [qn, questions]);

  function addrating(course, cr, id) {
    let newValue = {
      ...{
        studentId: sid,
        questionId: qid,
        collegeName: college,
        semesterType: whatsem,
        semesterYear: new Date().getFullYear().toString(),
        department: department,
        evaluationType: "courseEvaluation",
        batch: batch,
      },
      courseId: id,
      grade: parseInt(cr),
    };

    const existingIndex = ratings.findIndex(
      (item) => item.courseId === newValue.courseId
    );

    if (existingIndex !== -1) {
      const newArray = [...ratings];
      newArray[existingIndex] = newValue;
      setratings(newArray);
    } else {
      setratings((prevArray) => [...prevArray, newValue]);
    }
  }
  useEffect(() => {
    console.log(mainresult);
  }, [mainresult, qn, xx]);
  const submitratings = () => {
    if (
      ratings.length == subjects.length &&
      qid &&
      sid &&
      whatsem &&
      department &&
      batch
    ) {
      mainresult.push(...ratings);
      setmainresult(mainresult);
      setclearboxes(qn + 1);
      setratings([]);
      setwait(false);
      setxx(xx + 1);
      if (qn + 1 != questions.length) {
        setqn(qn + 1);
      } else {
        axios
          .post("http://164.92.193.40:3001/v1/ratings/courseRating", mainresult)
          .then((res) => {
            toast.success("Form successfully submitted");
            setTimeout(() => {
              navigate("/");
            }, 800);
          })
          .catch((err) => {
            toast.error("Something went wrong");
            setTimeout(() => {
              navigate("/");
            }, 800);
          });
      }
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
          <p>Course Evaluation Form by students</p>
        </div>
        <div className={styles.question}>
          <div className={styles.qn}>{`Q: ${qn + 1}/${
            questions ? questions.length : ""
          }`}</div>
          <div className={styles.qis}>{question ? question : "wait...."}</div>
        </div>
        <div className={styles.boxcon}>
          {!subjects
            ? ""
            : subjects.map((d, i) => {
                return (
                  <>
                    <Box1
                      title={d.courseName}
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

export default CourseEvalutionForm;
