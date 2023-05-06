import React, { useContext, useState } from "react";
import {
  MdClear,
  MdOutlineAccessTime,
  MdOutlinePhone,
  MdOutlineInfo,
  MdOutlineMedicalServices,
  MdOutlinePersonOutline,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { IoMaleFemaleOutline } from "react-icons/io5";
import { BiSave } from "react-icons/bi";
import { TbCheckupList, TbDentalOff } from "react-icons/tb";
import Jaw, { CREATE_MODE } from "../components/Teeth/Jaw";
import TitleHeader from "../components/TitleHeader";
import AppForm from "./AppForm";
import AppFormField from "./AppFormField";
import AppFormFieldBinarySwitch from "./AppFormFieldBinarySwitch";
import AppFormTextArea from "./AppFormTextArea";
import SubmitButton from "./SubmitButton";
import ClearButton from "./ClearButton";
import CustomizedClearButton from "./CustomizedClearButton";
import api from "../api/api";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { LoadingContext } from "../context/loadingContext";
import { ModalsContext } from "../context/modalsContext";
import { handleErrorChecking } from "../pages/Home";
import { LoginModalContext } from "../context/loginModalContext";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("patient's name is required"),
  age: Yup.number().max(1000).min(1).typeError("please enter correct age"),
});
function PatientAddForm({ afterSubmit = (f) => f }) {
  const { setLoading } = useContext(LoadingContext);
  const {
    setViewedPatientId,
    setCreateCheckupModalOn,
    setCreateTreatmentModalOn,
  } = useContext(ModalsContext);
  const { loginModal } = useContext(LoginModalContext);
  const [teethSelection, setTeethSelection] = useState({});
  const [next, setNext] = useState((f) => f);
  const [refresh, setRefresh] = useState(false);
  const handleSubmit = async (data) => {
    // console.log("HELLO");
    let teeth = Object.keys(teethSelection).map(function (key) {
      return {
        number: teethSelection[key]["number"],
        notes: teethSelection[key]["note"] || "",
      };
    });
    setLoading(true);
    let res = await api.post("/patients/create", {
      ...data,
      teeth: teeth,
    });
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setViewedPatientId(res.data.id);
    // setCreateCheckupModalOn(true);
    if (next) next();
    setLoading(false);
    toast.success(res.data.statusMessage);
    setTeethSelection({});
    afterSubmit();
  };
  return (
    <div
      className="w-full h-full flex justify-start items-center 
            bg-secondary/80 rounded-lg  shadow-sm shadow-primary/40 overflow-y-hidden"
    >
      {/* form */}
      <div className="w-1/2 h-full bg-dark/80 rounded-lg flex justify-center items-start   overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin    scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin  ">
        <AppForm
          onSubmit={handleSubmit}
          initialValues={{
            name: "",
            sex: true,
            age: 1,
            contact: "",
            occupation: "",
            details: "",
          }}
          validationSchema={validationSchema}
        >
          <div className="w-3/4 flex flex-col items-center justify-start my-2  px-6 lg:px-2 ">
            <TitleHeader title="New Patient"></TitleHeader>
            <AppFormField
              svg={<MdOutlinePersonOutline className="w-[20px] h-[20px]" />}
              name={"name"}
              type="text"
              title="Name"
            ></AppFormField>
            <div className="w-full flex gap-2 2xl:gap-0 2xl:flex-col">
              <div className="w-1/2 2xl:w-full ">
                <AppFormFieldBinarySwitch
                  svg={<IoMaleFemaleOutline className="w-[20px] h-[20px]" />}
                  name={"sex"}
                  title="Sex"
                  displayOn="Male"
                  displayOff="Female"
                ></AppFormFieldBinarySwitch>
              </div>
              <div className="w-1/2 2xl:w-full">
                <AppFormField
                  svg={<MdOutlineAccessTime className="w-[20px] h-[20px]" />}
                  name={"age"}
                  type="number"
                  title="Age"
                  min={1}
                  max={200}
                ></AppFormField>
              </div>
            </div>
            <AppFormField
              svg={
                <MdOutlinePhone
                  className="w-[20px] h-[20px]  
                "
                />
              }
              name={"contact"}
              type="text"
              title="Contact"
            ></AppFormField>
            <AppFormField
              svg={<MdOutlineWorkOutline className="w-[20px] h-[20px]" />}
              name={"occupation"}
              type="text"
              title="Occupation"
            ></AppFormField>
            <AppFormTextArea
              svg={<MdOutlineInfo className="w-[20px] h-[20px]" />}
              name={"details"}
              title="Details"
            ></AppFormTextArea>
            <div className="w-full flex flex-wrap justify-start gap-x-1 ">
              <div className="w-full h-0.5 bg-accent/70 my-2 rounded-t-3xl"></div>
              <SubmitButton
                svg={<BiSave className="w-[20px]    h-fit"></BiSave>}
              ></SubmitButton>

              <SubmitButton
                before={() =>
                  setNext(() => () => setCreateTreatmentModalOn(true))
                }
                svg={
                  <>
                    <BiSave className="w-[20px]    h-fit" /> {"&"}
                    <MdOutlineMedicalServices className="w-[20px]    h-fit" />
                  </>
                }
              ></SubmitButton>
              <SubmitButton
                before={() =>
                  setNext(() => () => setCreateCheckupModalOn(true))
                }
                svg={
                  <>
                    <BiSave className="w-[20px]    h-fit" /> {"&"}
                    <TbCheckupList className="w-[20px]    h-fit" />
                  </>
                }
              ></SubmitButton>
              <ClearButton
                svg={<MdClear className="w-[20px]    h-fit" />}
              ></ClearButton>
              <CustomizedClearButton
                onClick={() => {
                  setTeethSelection({});
                }}
                svg={<TbDentalOff className="w-[20px]    h-fit" />}
              ></CustomizedClearButton>
            </div>
          </div>
        </AppForm>
      </div>
      {/* jaw */}
      <div className="w-1/2 flex justify-center items-center    ">
        <Jaw
          refresh={refresh}
          mode={CREATE_MODE}
          selectedTeeth={teethSelection}
          setSelectedTeeth={setTeethSelection}
        ></Jaw>
      </div>
    </div>
  );
}

export default PatientAddForm;
