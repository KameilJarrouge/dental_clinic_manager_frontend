import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import CourseCard from "../components/CourseCard";
import LoadMoreCard from "../components/LoadMoreCard";
import TitleHeader from "../components/TitleHeader";
import { LoadingContext } from "../context/loadingContext";
import { LoginModalContext } from "../context/loginModalContext";
import { handleErrorChecking } from "./Home";

function Courses() {
  const [searchKey, setSearchKey] = useState("");
  const [courses, setCourses] = useState([]);
  const [take, setTake] = useState(11);
  const { setLoading, shouldRefresh } = useContext(LoadingContext);
  const { loginModal } = useContext(LoginModalContext);
  const getCourses = async () => {
    setLoading(true);
    let res = await api.get(`/courses/?name=${searchKey}&take=${take}`);
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setCourses(res.data);
    setLoading(false);
  };
  useEffect(() => {
    getCourses();
  }, [take, shouldRefresh]);

  return (
    <div
      className={
        "w-full h-full flex flex-col justify-start items-center gap-3 bg-transparent p-1 px-4 py-5 2xl:py-10 "
      }
    >
      <div className="w-full h-full flex flex-col gap-2 py-1 px-3 bg-dark/20 border-l-4 border-badge-14/70   rounded-lg   ">
        <TitleHeader title="Courses" dark className="border-b-badge-14/70 " />
        <div className="w-full flex gap-4 justify-start items-center mb-2 ">
          <input
            placeholder="Search Patients"
            className="bg-light rounded-sm w-1/5 text-center border border-dark/50 outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") getCourses();
            }}
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
          />
        </div>

        {/* courses cards */}
        <div className="w-full min-h-fit max-h-full flex flex-wrap gap-4    overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin          rounded-lg p-2">
          {courses.map((course) => (
            <CourseCard
              id={course.id}
              key={course.id}
              effectName={course.effectName}
              name={course.name}
              colorIndex={course.colorIndex}
            ></CourseCard>
          ))}
          {courses.length !== 0 ? (
            <div className="flex flex-grow  min-w-[18rem] w-[20%] max-w-[33%] ">
              <LoadMoreCard
                setValue={setTake}
                by={5}
                value={take}
                length={courses.length}
              ></LoadMoreCard>
            </div>
          ) : (
            <div className=" font-bold text-lg text-dark">
              No Courses Were Found!
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
}

export default Courses;
