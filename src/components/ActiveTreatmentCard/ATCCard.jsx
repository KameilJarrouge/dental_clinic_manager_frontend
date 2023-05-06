import React, { useState } from "react";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { Link } from "react-router-dom";
import ToothBadge from "../Teeth/ToothBadge";
import ATCHeader from "./ATCHeader";
import ATCTreatmentCard from "./ATCTreatmentCard";

function ATCCard({ patient }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full flex flex-col gap-2 h-fit bg-light/90 rounded-lg px-5 py-3 shadow-md shadow-black/60   ">
      {/* header of active course card */}
      <div className="w-full ">
        <ATCHeader
          title={<Link to={`/patients/${patient.id}`}>{patient.name}</Link>}
          dark
          expanded={expanded}
          expandable
          expand={() => setExpanded(!expanded)}
        ></ATCHeader>
      </div>

      <div
        className={` flex flex-col gap-2 overflow-y-hidden  ${
          !expanded && "max-h-[9rem] 2xl:max-h-[10rem] "
        }`}
      >
        {/* treatment */}
        {patient.CoursePatients.map((treatment) => (
          <ATCTreatmentCard
            key={treatment.id}
            treatment={treatment}
            patientId={patient.id}
          />
        ))}
        {/* <ATCTreatmentCard
          treatmentName={"Wisdom tooth removal"}
          badgeColor={1}
        ></ATCTreatmentCard>
        <ATCTreatmentCard
          treatmentName={"Scale and polish"}
          badgeColor={12}
        ></ATCTreatmentCard>
        <ATCTreatmentCard
          treatmentName={"Root canal treatment"}
          badgeColor={8}
        ></ATCTreatmentCard>
        <ATCTreatmentCard
          treatmentName={"Root canal treatment"}
          badgeColor={8}
        ></ATCTreatmentCard> */}
      </div>
    </div>
  );
}

export default ATCCard;
