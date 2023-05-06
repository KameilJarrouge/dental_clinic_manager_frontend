import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Container from "./pages/Container";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import Patients from "./pages/Patients";
import Courses from "./pages/Courses";
import Patient from "./pages/Patient";
import Treatment from "./pages/Treatment";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} theme="dark" />

      <div className="h-[100vh] w-full  ">
        <Routes>
          <Route path="/" element={<Container></Container>}>
            <Route path="/home" element={<Home />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/:id" element={<Patient />} />
            <Route path="/patients/:id/treatments" element={<Treatment />} />
            <Route path="/courses" element={<Courses></Courses>} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
