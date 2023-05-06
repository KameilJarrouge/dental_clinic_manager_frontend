import React, { useContext, useEffect, useState } from "react";
import SearchPatientCard from "./SearchPatientCard";
import api from "../api/api";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import LoadMoreCard from "./LoadMoreCard";
import { handleErrorChecking } from "../pages/Home";
import { LoadingContext } from "../context/loadingContext";
import { LoginModalContext } from "../context/loginModalContext";
export function NavBarSearch({ focused, setFocused }) {
  const [searchKey, setSearchKey] = useState("");
  const [withLimit, setWithLimit] = useState(true);
  const [take, setTake] = useState(5);
  const { setLoading } = useContext(LoadingContext);
  const { loginModal } = useContext(LoginModalContext);
  const [patients, setPatients] = useState([]);
  const getPatients = async () => {
    if (searchKey === "") {
      setPatients([]);
      return;
    }
    let res = await api.get(`/patients/search?name=${searchKey}&take=${take}`);
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setPatients(res.data);
  };
  const showSearchResult = (e) => {
    if (e.target.id === "search") return;
    if (
      document.getElementById("searchResultContainer") &&
      !document.getElementById("searchResultContainer").contains(e.target)
    ) {
      setFocused(false);
      setPatients([]);
    }
  };
  useEffect(() => {
    getPatients();
  }, [take]);
  useEffect(() => {
    window.addEventListener("click", showSearchResult);

    return () => {
      window.removeEventListener("click", showSearchResult);
    };
  }, []);
  return (
    <div className="w-fit flex items-center gap-1 relative">
      <input
        id="search"
        className="bg-secondary w-[20em] text-primary text-center rounded-md outline-none py-1 "
        type="text"
        placeholder="Search Patients"
        maxLength={30}
        onFocus={() => {
          setFocused(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setFocused(true);
            getPatients();
          }
        }}
        onChange={(e) => setSearchKey(e.target.value)}
        value={searchKey}
      />
      {/* <div className="group flex gap-1 items-center">
        <AiOutlineExclamationCircle
          onClick={() => setTake(1)}
          className={`w-[20px]   h-fit transition-colors ${
            withLimit ? "text-red-500" : "text-light"
          } cursor-pointer `}
        />
        <div className="text-red-500 text-sm invisible group-hover:visible">
          reset count
        </div>
      </div> */}
      {focused && (
        <div
          onClick={() => document.getElementById("search").focus()}
          id="searchResultContainer"
          className={`
          flex flex-col gap-2 justify-start items-center
          absolute top-[32px] -left-[90px] 
          w-[500px]  h-fit max-h-[50svh]  overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin  
          bg-dark shadow-lg shadow-dark rounded-xl
          border-t-[1px] border-light 
          mt-1 py-4 z-10`}
        >
          {patients.length === 0 && (
            <div className="w-full h-full flex justify-center items-center text-light">
              Type Some Words and Hit Enter!
            </div>
          )}
          {/* patient card */}
          {patients.map((patient) => (
            <SearchPatientCard
              key={patient.id}
              id={patient.id}
              name={patient.name}
            ></SearchPatientCard>
          ))}

          <div className="w-3/4">
            <LoadMoreCard
              by={5}
              setValue={setTake}
              value={take}
              length={patients.length}
            />
          </div>
        </div>
      )}
    </div>
  );
}
