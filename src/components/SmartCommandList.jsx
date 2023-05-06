import React, { useContext } from "react";
import { AiOutlineMedicineBox, AiOutlineUserAdd } from "react-icons/ai";
import { FaXRay } from "react-icons/fa";
import { MdOutlineMedicalServices } from "react-icons/md";
import { TbCheckupList } from "react-icons/tb";
import { ModalsContext } from "../context/modalsContext";
import Command from "./Command";

function SmartCommandList() {
  const {
    setCreatePatientModalOn,
    setCreateCourseModalOn,
    setSelectedId,
    setCreateCheckupModalOn,
    setCreateXrayModalOn,
    setCreateTreatmentModalOn,
    navigatedViewedPatientId,
    setViewedPatientId,
  } = useContext(ModalsContext);
  const getPageRelatedCommands = () => {
    if (window.location.href.includes("/patients/")) {
      return (
        <>
          <Command
            icon={
              <MdOutlineMedicalServices
                onClick={() => {
                  setViewedPatientId(navigatedViewedPatientId);
                  setCreateTreatmentModalOn(true);
                }}
                className="w-[1.7rem] 2xl:w-[1.9rem] h-fit "
              />
            }
            subtitle="Treatment"
          ></Command>
          <Command
            onClick={() => {
              setViewedPatientId(navigatedViewedPatientId);
              setCreateCheckupModalOn(true);
            }}
            icon={
              <TbCheckupList className="w-[1.7rem] 2xl:w-[1.9rem] h-fit " />
            }
            subtitle="Checkup"
          ></Command>
          <Command
            icon={
              <FaXRay
                onClick={() => {
                  setViewedPatientId(navigatedViewedPatientId);
                  setCreateXrayModalOn(true);
                }}
                className="w-[1.7rem] 2xl:w-[1.9rem] h-fit "
              />
            }
            subtitle="Xray"
          ></Command>

          <div className="w-3/4 h-[1px] flex justify-center">
            <div className="h-[2px] w-full bg-gradient-to-l from-secondary to-dark/80"></div>
            <div className="h-[2px] w-full bg-gradient-to-l from-dark/80 to-secondary"></div>
          </div>
        </>
      );
    }
  };
  return (
    <div
      className={`w-fit min-w-[4em]  h-fit      mx-2 2xl:mx-3 bg-dark/90 rounded-xl flex flex-col items-center gap-2 2xl:gap-5 py-5 border-l-4 border-green-700 `}
    >
      {/* page related commands */}
      {getPageRelatedCommands()}
      {/* general commands */}
      <Command
        onClick={() => setCreatePatientModalOn(true)}
        icon={
          <AiOutlineUserAdd className="w-[1.7rem] 2xl:w-[1.9rem] h-fit hover:text-green-700 "></AiOutlineUserAdd>
        }
        subtitle="Patient"
      ></Command>

      <Command
        onClick={() => {
          setSelectedId(0);
          setCreateCourseModalOn(true);
        }}
        icon={
          <AiOutlineMedicineBox className="w-[1.7rem] 2xl:w-[1.9rem] h-fit hover:text-green-700 "></AiOutlineMedicineBox>
        }
        subtitle="Course"
      ></Command>

      {/* <Command
        icon={
          <AiOutlineMacCommand className="w-[1.7rem] 2xl:w-[1.9rem] h-fit hover:text-green-700  "></AiOutlineMacCommand>
        }
        subtitle="Effect"
      ></Command>
      <Command
        icon={
          <AiOutlineMacCommand className="w-[1.7rem] 2xl:w-[1.9rem] h-fit hover:text-green-700  "></AiOutlineMacCommand>
        }
        subtitle="Effect"
      ></Command> */}
    </div>
  );
}

export default SmartCommandList;
