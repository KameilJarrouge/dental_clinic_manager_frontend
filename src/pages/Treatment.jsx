import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import api from "../api/api";
import SessionsCard from "../components/PatientCards/SessionsCard";
import SectionHeader from "../components/SectionHeader";
import TitleHeader from "../components/TitleHeader";
import TwoPanels from "../components/TwoPanels";
import { LoadingContext } from "../context/loadingContext";
import { LoginModalContext } from "../context/loginModalContext";
import TreatmentAddForm from "../form/TreatmentAddForm";
import { handleErrorChecking } from "./Home";

function Treatment(props) {
  let location = useLocation();
  const [patient, setPatient] = useState({});
  const { setLoading } = useContext(LoadingContext);
  const { loginModal } = useContext(LoginModalContext);
  let { id } = useParams();
  const getPatient = async () => {
    let res = await api.get(`/patients/${id}`);
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setPatient(res.data);
  };
  useEffect(() => {
    getPatient();
  }, [id]);
  const [viewedTreatmentId, setViewedTreatmentId] = useState(
    location.state.treatmentId
  );

  return (
    <div
      className={
        "w-full h-full flex flex-col justify-start items-center gap-3 bg-transparent p-1 px-4 py-5 2xl:py-10 "
      }
    >
      <div className="w-full h-full flex flex-col gap-2 py-1 px-3 bg-dark/20 border-l-4 border-l-blue-800/70  rounded-lg   ">
        <TwoPanels
          left={
            <div className="w-full  h-full flex flex-col">
              <TitleHeader
                dark
                className="border-b-blue-800/70 "
                title={<Link to={`/patients/${id}`}>{patient.name}</Link>}
              ></TitleHeader>
              <SessionsCard treatmentId={viewedTreatmentId}></SessionsCard>
            </div>
          }
          right={<TreatmentAddForm id={viewedTreatmentId} patientId={id} />}
        />
      </div>
    </div>
  );
}

export default Treatment;
