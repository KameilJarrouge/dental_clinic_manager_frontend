import React, { useContext } from "react";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { FaXRay } from "react-icons/fa";
import { TbCheckupList } from "react-icons/tb";
import ATCHeader from "./ActiveTreatmentCard/ATCHeader";
import { Link } from "react-router-dom";
import TextInformationRow from "./TextInformationRow";
import { ModalsContext } from "../context/modalsContext";
import { MdOutlineMedicalServices } from "react-icons/md";

function PatientCard({
  id = 1,
  name = "Kamil Jarrouge",
  age = 24,
  sex = true,
  occupation = "IT Engineer",
}) {
  const {
    setCreateCheckupModalOn,
    setCreateXrayModalOn,
    setCreateTreatmentModalOn,
    setViewedPatientId,
  } = useContext(ModalsContext);
  return (
    <div className="min-h-[10rem] min-w-[18rem] w-[20%] max-w-[33%] flex-grow  h-fit bg-secondary/70 shadow-md border border-dark/40 shadow-dark rounded-lg flex flex-col justify-between p-2 gap-2">
      <div className="flex flex-col gap-2">
        <Link to={`/patients/${id}`}>
          <ATCHeader
            title={`${name} (${age} year/s)`}
            dark
            direction="left"
          ></ATCHeader>
        </Link>
        {/* info */}
        <TextInformationRow title={"Occupation"} data={occupation} />
        <TextInformationRow title={"Sex"} data={sex ? "Male" : "Female"} />
      </div>
      {/* commands & links */}
      <div className="flex flex-wrap justify-end gap-3 ">
        <div className="flex p-1 border-2 border-green-700/50 rounded-lg gap-3 py-1 px-2  ">
          <FaXRay
            onClick={() => {
              setViewedPatientId(id);
              setCreateXrayModalOn(true);
            }}
            className=" w-[20px]   h-fit hover:text-green-700 cursor-pointer"
          ></FaXRay>
          <MdOutlineMedicalServices
            onClick={() => {
              setViewedPatientId(id);
              setCreateTreatmentModalOn(true);
            }}
            className=" w-[20px]    h-fit hover:text-green-700 cursor-pointer "
          ></MdOutlineMedicalServices>

          <TbCheckupList
            onClick={() => {
              setViewedPatientId(id);
              setCreateCheckupModalOn(true);
            }}
            className=" w-[20px]   h-fit hover:text-green-700 cursor-pointer "
          ></TbCheckupList>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;
