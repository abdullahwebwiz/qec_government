import styles from "../css/home2.module.css";
import Header from "../../components/header/header";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Card from "../../components/card/card";
const Home2 = ({ whatuser }) => {
  let data1 = [
    {
      title: "Course Evaluation",
      image: "Courses.png",
      desc: "Course Evaluation form by student.",
      link: "CourseEvalutionForm",
    },
    {
      title: "Teacher Evaluation",
      image: "Teacher.png",
      desc: "Teacher Evaluation form by student.",
      link: "teacherEvalutionForm",
    },
  ];

  let data2 = [
    ...data1,
    {
      title: "Degree Program",
      image: "DegreeProgram.png",
      desc: "Degree Program Evaluation Survey form by Student.",
      link: "DegreeProgramSurveyForm",
    }
  ];

  let data3 = [
    {
      title: "Faculty Satisfaction Survey",
      image: "Satisfaction.png",
      desc: "Faculty Satisfaction Survey From by Teacher.",
      link: "FacultySatisfactionForm",
    },
    {
      title: "Faculty Course Review",
      image: "FacultyCourse.png",
      desc: "Faculty Course Review From By Teacher.",
      link: "FacultyCourseForm",
    }
  ];

  return (
    <>
      <Header />
      <div className={styles.cardcon}>
        {whatuser === ""
          ? ""
          : whatuser === "stu"
          ? data1.map((d, i) => (
            <Card
              key={i}
              title={d.title}
              image={d.image}
              desc={d.desc}
              link={d.link}

            />
          ))
          : whatuser === "stu8"
          ? data2.map((d, i) => (
            <Card
              key={i}
              title={d.title}
              image={d.image}
              desc={d.desc}
              link={d.link}

            />
          ))
          : data3.map((d, i) => (
              <Card
                key={i}
                title={d.title}
                image={d.image}
                desc={d.desc}
                link={d.link}
              />
            ))}
      </div>
    </>
  );
};
export default Home2;
