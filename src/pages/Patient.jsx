import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LargePatientCard from "../components/LargePatientCard";
import Jaw, { VIEW_MODE } from "../components/Teeth/Jaw";
import { BsArrowDown } from "react-icons/bs";
import CheckupsCard from "../components/PatientCards/CheckupsCard";
import ActiveTreatmentsCard from "../components/PatientCards/ActiveTreatmentsCard";
import AllTreatmentsCard from "../components/PatientCards/AllTreatmentsCard";
import XraysCard from "../components/PatientCards/XraysCard";
import { ModalsContext } from "../context/modalsContext";
function Patient() {
  let { id } = useParams();
  const [CardsFlipped, setCardsFlipped] = useState(false);
  const { setNavigatedViewedPatientId } = useContext(ModalsContext);
  useEffect(() => {
    setNavigatedViewedPatientId(id);
  }, [id]);

  return (
    <div
      className={
        "w-full h-full flex flex-col justify-start items-center gap-3 bg-transparent p-1 px-4 py-5 2xl:py-10 overflow-y-hidden relative  "
      }
    >
      <div className="w-fit h-fit flex gap-2 absolute opacity-0 top-2 left-[40.5%]  rounded-md p-1  animate-pulseAndVanish ">
        <div className="    text-light font-bold  select-none">
          Right Click to Swtich
        </div>
        <div>
          <BsArrowDown
            className={`w-[20px]   h-[25px]   animate-bounceAndVanish text-light `}
          />
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-2 py-1 px-3 bg-dark/20 border-l-4 border-badge-18 rounded-lg   ">
        <div className="flex w-full h-full py-2 gap-3">
          <div className="w-2/5 h-full py-1">
            <LargePatientCard id={id}></LargePatientCard>
          </div>
          {/* middle */}
          <div
            onContextMenu={(e) => {
              e.preventDefault();
              setCardsFlipped(!CardsFlipped);
            }}
            className="w-2/5 h-full py-1 flex flex-col gap-[2%]  overflow-hidden "
          >
            {!CardsFlipped ? (
              <>
                <ActiveTreatmentsCard patientId={id}></ActiveTreatmentsCard>
                <CheckupsCard patientId={id}></CheckupsCard>
              </>
            ) : (
              <>
                <AllTreatmentsCard patientId={id}></AllTreatmentsCard>
                <XraysCard patientId={id}></XraysCard>
              </>
            )}
          </div>

          <div className="w-[25%] h-full flex items-center justify-center relative">
            <div className="w-fit h-fit">
              <Jaw mode={VIEW_MODE} patientId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient;
