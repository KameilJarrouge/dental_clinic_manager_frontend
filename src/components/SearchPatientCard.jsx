import React, { useContext } from "react";
import { FaXRay } from "react-icons/fa";
import { MdOutlineMedicalServices } from "react-icons/md";
import { TbCheckupList } from "react-icons/tb";
import { Link } from "react-router-dom";
import { ModalsContext } from "../context/modalsContext";
function SearchPatientCard({ id = 1, name = "Kamil Jarrouge " }) {
  const {
    setCreateCheckupModalOn,
    setCreateXrayModalOn,
    setCreateTreatmentModalOn,
    setViewedPatientId,
  } = useContext(ModalsContext);
  return (
    <div className="h-fit flex flex-wrap justify-between items-center w-11/12 bg-light rounded-lg px-3  py-2">
      <div className="flex gap-2 max-w-[45%]">
        <Link to={`/patients/${id}`}>
          <div className="text-ellipsis w-full whitespace-nowrap overflow-hidden scrollbar-none font-semibold text-sm 2xl:text-base ">
            {name}
          </div>
        </Link>
      </div>
      <div className="flex gap-3 items-center">
        <div className="w-[2px] h-[1.5rem] bg-green-700"></div>
        {/* commands */}
        <MdOutlineMedicalServices
          onClick={() => {
            setViewedPatientId(id);
            setCreateTreatmentModalOn(true);
          }}
          className="cursor-pointer w-[20px]    h-fit hover:text-green-700 "
        ></MdOutlineMedicalServices>
        <TbCheckupList
          onClick={() => {
            setViewedPatientId(id);
            setCreateCheckupModalOn(true);
          }}
          className="cursor-pointer w-[20px]   h-fit hover:text-green-700"
        ></TbCheckupList>
        <FaXRay
          onClick={() => {
            setViewedPatientId(id);
            setCreateXrayModalOn(true);
          }}
          className="cursor-pointer w-[20px]   h-fit hover:text-green-700"
        ></FaXRay>
      </div>
    </div>
  );
}

export default SearchPatientCard;
