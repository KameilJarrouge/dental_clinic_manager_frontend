import moment from "moment";
import React, { useContext, useState } from "react";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { GiEntryDoor } from "react-icons/gi";
import {
  MdOutlineExpandMore,
  MdOutlineIndeterminateCheckBox,
} from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { TbDental } from "react-icons/tb";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import ToothBadge from "../Teeth/ToothBadge";
import ATCVisitNumber from "./ATCVisitNumber";
import { LoadingContext } from "../../context/loadingContext";
import { ModalsContext } from "../../context/modalsContext";
import { handleErrorChecking } from "../../pages/Home";
import { LoginModalContext } from "../../context/loginModalContext";

function ATCTreatmentCard({
  treatment = null,
  patientId = 0,
  refresh = (f) => f,
}) {
  const [noteIsVisible, setNoteIsVisible] = useState(false);
  const { setLoading, toggleRefresh } = useContext(LoadingContext);
  const { setCreateSessionModalOn, setViewedTreatmentId } =
    useContext(ModalsContext);
  const { loginModal } = useContext(LoginModalContext);
  const handleStatusChange = async (finish) => {
    setLoading(true);
    let res = await api.put(`/courses-patients/${treatment.id}/update-status`, {
      isFinished: finish,
    });
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setLoading(false);
    refresh();
    toggleRefresh();
    toast.success(res.data.statusMessage);
  };
  return (
    <div
      className="w-full h-fit  bg-light rounded-md  p-1 2xl:p-2 flex flex-col justify-start items-start shadow-md shadow-black/30 transition-[height]
    border-[1px] border-dark/20"
    >
      <div className="w-full flex justify-between">
        <Link
          to={`/patients/${patientId}/treatments`}
          state={{ treatmentId: treatment.id }}
        >
          <div className="flex justify-start items-end gap-1">
            <AiOutlineMedicineBox className="w-[25px] 2xl:w-[30px] h-fit"></AiOutlineMedicineBox>
            <div className="flex gap-2 w-fit items-center  text-sm 2xl:text-base">
              <div className="flex h-full  items-start">
                <ToothBadge
                  color={treatment.Course.colorIndex}
                  isFinished={treatment.isFinished}
                  isOld={treatment.isOld}
                ></ToothBadge>
              </div>
              {treatment.Course.name}
              <ATCVisitNumber
                number={treatment.Sessions.length}
              ></ATCVisitNumber>
            </div>
          </div>
        </Link>

        {/* commands */}
        <div className="w-fit flex gap-2 items-center">
          {treatment.isOld ? (
            <></>
          ) : treatment.isFinished ? (
            <VscDebugStart
              onClick={() => handleStatusChange(false)}
              className="w-[20px]   h-fit cursor-pointer hover:text-blue-700"
            ></VscDebugStart>
          ) : (
            <>
              <GiEntryDoor
                onClick={() => {
                  setViewedTreatmentId(treatment.id);
                  setCreateSessionModalOn(true);
                }}
                className="w-[20px]   h-fit cursor-pointer hover:text-green-700"
              ></GiEntryDoor>
              <MdOutlineIndeterminateCheckBox
                onClick={() => handleStatusChange(true)}
                className="w-[20px]   h-fit cursor-pointer hover:text-red-700"
              ></MdOutlineIndeterminateCheckBox>
            </>
          )}
          <MdOutlineExpandMore
            onClick={() => setNoteIsVisible(!noteIsVisible)}
            className={`w-[25px] h-fit cursor-pointer ${
              noteIsVisible && "rotate-180"
            } transition-all `}
          ></MdOutlineExpandMore>
        </div>
      </div>
      {/* notes */}
      {noteIsVisible && (
        <div dir="auto" className="flex flex-col w-full ">
          <div className="w-full h-[1px] bg-dark my-1"></div>

          {treatment.CoursePatientTeeth.length !== 0 && (
            <>
              {/* <div className="w-full h-[1px] bg-dark my-1"></div> */}
              <div className="flex flex-wrap gap-2  px-2 text-dark items-center ">
                <TbDental className="w-[20px]   h-fit  " />:
                {treatment.CoursePatientTeeth.map((cpt) => (
                  <>
                    <div
                      key={cpt.Tooth.number}
                      className="w-fit bg-dark/95 text-light font-bold text-sm 2xl:text-base  rounded-lg px-1 "
                    >
                      {cpt.Tooth.number}
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
          <div className="w-full flex justify-end py-0.5 px-1  text-sm 2xl:text-base">
            <div className="w-fit bg-dark/10 rounded-md flex items-center gap-1 px-1 font-bold">
              {moment(treatment.createdAt).format("yyyy-MM-DD")}
              {!treatment.isOld && (
                <>
                  <BsArrowRight></BsArrowRight>
                  <div className="text-red-700">
                    {treatment.finishedAt
                      ? moment(treatment.finishedAt).format("yyyy-MM-DD")
                      : "?"}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-full h-[1px] bg-dark my-1 px-1"></div>
          {treatment.details}
        </div>
      )}
    </div>
  );
}

export default ATCTreatmentCard;
