import "./App.css";
import React, { lazy, Suspense, useEffect, useState } from "react";
import PlzWait from "./pages/plzwait";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
} from "react-router-dom";
import Bsform from "./pages/bsform";
import Cookies from "js-cookie";
import axios from "axios";
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
const Contact = lazy(() => import("./pages/contact"));
const LogIn = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const Profile = lazy(() => import("./pages/profile"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Suspense fallback={<PlzWait />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={<PlzWait />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<PlzWait />}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<PlzWait />}>
                <LogIn />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<PlzWait />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/FacultyCourseForm"
            element={
              <Suspense fallback={<PlzWait />}>
                <FacultyCourseForm />
              </Suspense>
            }
          />
          <Route
            path="/FacultySatisfactionForm"
            element={
              <Suspense fallback={<PlzWait />}>
                <FacultySatisfactionForm />
              </Suspense>
            }
          />
          <Route
            path="/CourseEvalutionForm"
            element={
              <Suspense fallback={<PlzWait />}>
                <CourseEvalutionForm />
              </Suspense>
            }
          />
          <Route
            path="/TeacherEvalutionForm"
            element={
              <Suspense fallback={<PlzWait />}>
                <TeacherEvaluationForm />
              </Suspense>
            }
          />
          <Route
            path="/DegreeProgramSurveyForm"
            element={
              <Suspense fallback={<PlzWait />}>
                <DegreeProgramSurveyForm />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<PlzWait />}>
                <Profile />
              </Suspense>
            }
          />

          <Route
            path="/bsform"
            element={
              <Suspense fallback={<PlzWait />}>
                <Bsform />
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
