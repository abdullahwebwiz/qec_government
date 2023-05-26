import "./App.css";
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
} from "react-router-dom";
const TeacherEvaluationForm = lazy(() =>
  import("./pages/forms/teacherevaluationform")
);
const DegreeProgramSurveyForm = lazy(() =>
  import("./pages/forms/degreeprogramsurveyform")
);
const FacultyCourseForm = lazy(() => import("./pages/forms/facultycourseform"));
const FacultySatisfactionForm = lazy(() =>
  import("./pages/forms/facultysatisfactionform")
);
const CourseEvalutionForm = lazy(() =>
  import("./pages/forms/courseevaluationform")
);

const Home = lazy(() => import("./pages/home"));
const Home2 = lazy(() => import("./pages/home2"));
const Contact = lazy(() => import("./pages/contact"));
const LogIn = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Suspense fallback={"Please wait while we load the page.."}>
                <Home2 />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={"Please wait while we load the page.."}>
                <Home2 />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={"Please wait while we load the page.."}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={"Please wait while we load the page.."}>
                <LogIn />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={"Please wait while we load the page.."}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/FacultyCourseForm"
            element={
              <Suspense fallback={"Please wait while we load the page.."}>
                <FacultyCourseForm />
              </Suspense>
            }
          />
          <Route
            path="/FacultySatisfactionForm"
            element={
              <Suspense fallback={"Please wait while we load the page.."}>
                <FacultySatisfactionForm />
              </Suspense>
            }
          />
          <Route
            path="/CourseEvalutionForm"
            element={
              <Suspense fallback={"Please wait while we load the page.."}>
                <CourseEvalutionForm />
              </Suspense>
            }
          />
          <Route
            path="/TeacherEvalutionForm"
            element={
              <Suspense fallback={"Please wait while we load the page.."}>
                <TeacherEvaluationForm />
              </Suspense>
            }
          />
          <Route
            path="/DegreeProgramSurveyForm"
            element={
              <Suspense fallback={"Please wait while we load the page.."}>
                <DegreeProgramSurveyForm />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <>
                <div>
                  No Page found
                  <br />
                  <Link to={"/"}>Return to home Page</Link>{" "}
                </div>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
