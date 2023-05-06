import React, { useContext, useEffect, useState } from "react";
import {
  MdClear,
  MdDateRange,
  MdOutlineMedicalServices,
  MdRestore,
  MdTimelapse,
} from "react-icons/md";
import { BiSave, BiTrash } from "react-icons/bi";
import TitleHeader from "../components/TitleHeader";
import AppForm from "./AppForm";
import SubmitButton from "./SubmitButton";
import ClearButton from "./ClearButton";
import { CgNotes } from "react-icons/cg";
import { LoadingContext } from "../context/loadingContext";
import api from "../api/api";
import { toast } from "react-toastify";
import CustomizedClearButton from "./CustomizedClearButton";
import AppFormDatePicker from "./AppFormDatePicker";
import AppFormTextArea from "./AppFormTextArea";
import AppFormFieldBinarySwitch from "./AppFormFieldBinarySwitch";
import { FiChevronsRight } from "react-icons/fi";
import AppFormAutoComplete from "./AppFormAutoComplete";
import Jaw, { SELECT_MODE } from "../components/Teeth/Jaw";
import { useNavigate } from "react-router-dom";
import ToothBadge from "../components/Teeth/ToothBadge";
import { handleErrorChecking } from "../pages/Home";
import { LoginModalContext } from "../context/loginModalContext";
function TreatmentAddForm({ onClose = (f) => f, id = 0, patientId = 0 }) {
  const { setLoading, toggleRefresh } = useContext(LoadingContext);
  let navigate = useNavigate();
  const [selectedTeeth, setSelectedTeeth] = useState({});
  const [refresh, setRefresh] = useState(false);
  const { loginModal } = useContext(LoginModalContext);
  const [treatment, setTreatment] = useState({
    createdAt: new Date(),
    isFinished: false,
    isOld: false,
    details: "",
    course: {},
  });
  const getTreatment = async () => {
    let res = await api.get(`/courses-patients/${id}`);
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    // console.log(res.data);
    setTreatment({
      createdAt: new Date(res.data.createdAt),
      isFinished: res.data.isFinished,
      isOld: res.data.isOld,
      details: res.data.details,
      course: {
        id: res.data.Course.id,
        name: res.data.Course.name,
        color: res.data.Course.colorIndex,
      },
    });
    let teeth = {};
    res.data.CoursePatientTeeth.map((cpt) => {
      teeth[cpt.Tooth.number] = { id: cpt.Tooth.id, cptId: cpt.id };
    });
    setSelectedTeeth(teeth);
  };
  useEffect(() => {
    if (id !== 0) {
      getTreatment();
    } else {
      setTreatment({
        createdAt: new Date(),
        isFinished: false,
        isOld: false,
        details: "",
        course: {},
      });
    }
  }, [id]);

  const handleDelete = async () => {
    if (id === 0) return;
    if (!confirm(`Do you wish to delete this Treatment?`)) return;
    setLoading(true);
    let res = await api.delete(`/courses-patients/${id}/delete`);
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setLoading(false);
    onClose();
    toggleRefresh();
    navigate(`/patients/${patientId}`);
    toast.success(res.data.statusMessage);
  };

  const handleSubmit = async (data) => {
    // console.log(
    //   `/patients/${patientId}/courses-patients/create/${data.course.id}`
    // );
    // return;
    // return;
    setLoading(true);
    let teeth = Object.keys(selectedTeeth).map(
      (key) => selectedTeeth[key]["id"]
    );
    let res;
    if (id === 0) {
      res = await api.post(`/patients/${patientId}/courses-patients/create/`, {
        createdAt: data.createdAt,
        isFinished: data.isFinished,
        isOld: data.isOld,
        courseId: data.course.id,
        details: data.details,
        teeth: teeth,
      });
    } else {
      res = await api.put(`/courses-patients/${id}/update`, {
        createdAt: data.createdAt,
        isFinished: data.isFinished,
        isOld: data.isOld,
        details: data.details,
      });
    }
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setLoading(false);
    toast.success(res.data.statusMessage);
    onClose();
    setRefresh(!refresh);
    getTreatment();
    toggleRefresh();
  };
  return (
    <div
      className="w-full h-full 2xl:h-full flex justify-start items-center 
          bg-secondary/80 rounded-lg  shadow-sm shadow-primary/40 overflow-y-hidden"
    >
      {/* form */}
      <div className="w-1/2 h-full bg-dark/80 rounded-lg flex justify-center items-start   overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin      ">
        <AppForm
          onSubmit={handleSubmit}
          initialValues={treatment}
          validationSchema={null}
        >
          <div className="w-3/4 h-fit flex flex-col items-center justify-start my-2  px-6 lg:px-2 ">
            <TitleHeader
              title={`${id === 0 ? "New" : "Edit"} Treatment`}
            ></TitleHeader>
            <AppFormAutoComplete
              updateable={id === 0}
              dataLink={`/courses/names`}
              name={"course"}
              title={
                <>
                  Course{" "}
                  {id !== 0 && (
                    <ToothBadge
                      isFinished={treatment.isFinished}
                      isOld={treatment.isOld}
                      color={treatment.course.color}
                    />
                  )}
                </>
              }
              svg={<MdOutlineMedicalServices className="w-[20px] h-[20px]" />}
            ></AppFormAutoComplete>
            <AppFormDatePicker
              name={"createdAt"}
              svg={<MdDateRange className="w-[20px] h-[20px]" />}
              title="Date"
              type={"date"}
            ></AppFormDatePicker>
            <AppFormFieldBinarySwitch
              svg={<MdTimelapse className="w-[20px] h-[20px]" />}
              title="Time Status"
              displayOff="New Treatment"
              displayOn="Old Treatment"
              name={"isOld"}
            ></AppFormFieldBinarySwitch>
            <AppFormFieldBinarySwitch
              svg={<FiChevronsRight className="w-[20px] h-[20px]" />}
              title="Progress Status"
              displayOff="In Progress"
              displayOn="Finished"
              name={"isFinished"}
            ></AppFormFieldBinarySwitch>
            <AppFormTextArea
              svg={<CgNotes className="w-[20px] h-[20px]" />}
              name={"details"}
              title="Details"
            ></AppFormTextArea>

            <div className="w-full flex flex-wrap justify-start gap-x-1 ">
              <div className="w-full h-0.5 bg-accent/70 my-2 rounded-t-3xl"></div>
              <SubmitButton
                svg={<BiSave className="w-[20px]    h-fit"></BiSave>}
              ></SubmitButton>

              {id !== 0 ? (
                <>
                  <CustomizedClearButton
                    onClick={handleDelete}
                    svg={<BiTrash className="w-[20px]    h-fit" />}
                  ></CustomizedClearButton>
                  <ClearButton
                    svg={<MdRestore className="w-[20px]    h-fit" />}
                  ></ClearButton>
                </>
              ) : (
                <ClearButton
                  svg={<MdClear className="w-[20px]    h-fit" />}
                ></ClearButton>
              )}
            </div>
          </div>
        </AppForm>
      </div>
      <div className="w-1/2  flex justify-center items-center    ">
        <Jaw
          refresh={refresh}
          additionalId={id}
          patientId={patientId}
          mode={SELECT_MODE}
          modifiable={id === 0}
          selectedTeeth={selectedTeeth}
          setSelectedTeeth={setSelectedTeeth}
        ></Jaw>
      </div>
    </div>
  );
}

export default TreatmentAddForm;
