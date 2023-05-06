import React, { useContext, useLayoutEffect, useState } from "react";
import LoadMoreCard from "../components/LoadMoreCard";
import PatientCard from "../components/PatientCard";
import TitleHeader from "../components/TitleHeader";
import api from "../api/api";
import { LoadingContext } from "../context/loadingContext";
import { handleErrorChecking } from "./Home";
import { LoginModalContext } from "../context/loginModalContext";
function Patients() {
  const [searchKey, setSearchKey] = useState("");
  const [take, setTake] = useState(11);
  const [patients, setPatients] = useState([]);
  const { setLoading } = useContext(LoadingContext);
  const { loginModal } = useContext(LoginModalContext);
  const getPatients = async () => {
    setLoading(true);
    let res = await api.get(`/patients/?name=${searchKey}&take=${take}`);
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setPatients(res.data);
    setLoading(false);
  };
  useLayoutEffect(() => {
    getPatients();
  }, [take]);
  return (
    <div
      className={
        "w-full h-full flex flex-col justify-start items-center gap-3 bg-transparent p-1 px-4 py-5 2xl:py-10 "
      }
    >
      <div className="w-full h-full flex flex-col gap-2 py-1 px-3 bg-dark/20 border-l-4 border-l-blue-700/70  rounded-lg   ">
        <TitleHeader title="Patients" dark className="border-b-blue-700/70 " />
        <div className="w-full flex gap-4 justify-start items-center mb-2 ">
          <input
            placeholder="Search Patients"
            className="bg-light rounded-sm w-1/5 text-center border border-dark/50 outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") getPatients();
            }}
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
          />
        </div>
        {/* patient cards */}
        <div className="w-full min-h-fit max-h-full flex flex-wrap gap-4   overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin          rounded-lg p-2">
          {patients.map((patient) => (
            <PatientCard
              name={patient.name}
              age={patient.age}
              id={patient.id}
              key={patient.id}
              occupation={patient.occupation}
              sex={patient.sex}
            ></PatientCard>
          ))}

          {patients.length !== 0 ? (
            <div className="flex flex-grow  min-w-[18rem] w-[20%] max-w-[33%] ">
              <LoadMoreCard
                setValue={setTake}
                by={5}
                value={take}
                length={patients.length}
              ></LoadMoreCard>
            </div>
          ) : (
            <div className=" font-bold text-lg text-dark">
              No Patients Were Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Patients;
