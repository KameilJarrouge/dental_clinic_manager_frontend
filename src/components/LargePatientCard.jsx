import React, { useContext, useEffect, useState } from "react";
import { BiEdit, BiSave, BiTrash } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import BinaryInformationRow from "./BinaryInformationRow";
import SectionHeader from "./SectionHeader";
import TextAreaInformationRow from "./TextAreaInformationRow";
import TextInformationRow from "./TextInformationRow";
import { LoadingContext } from "../context/loadingContext";
import api from "../api/api";
import AppForm from "../form/AppForm";
import * as Yup from "yup";
import AppFormField from "../form/AppFormField";
import {
  MdOutlineAccessTime,
  MdOutlineDeleteOutline,
  MdOutlineInfo,
  MdOutlinePersonOutline,
  MdOutlinePhone,
  MdOutlineWorkOutline,
  MdRestore,
} from "react-icons/md";
import AppFormFieldBinarySwitch from "../form/AppFormFieldBinarySwitch";
import { IoMaleFemaleOutline } from "react-icons/io5";
import AppFormTextArea from "../form/AppFormTextArea";
import SubmitButton from "../form/SubmitButton";
import ClearButton from "../form/ClearButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleErrorChecking } from "../pages/Home";
import { LoginModalContext } from "../context/loginModalContext";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("patient's name is required"),
  age: Yup.number().max(1000).min(1).typeError("please enter correct age"),
});
function LargePatientCard({ id }) {
  const [updateMode, setUpdateMode] = useState(false);
  const { setLoading } = useContext(LoadingContext);
  const [patient, setPatient] = useState({});
  const { loginModal } = useContext(LoginModalContext);
  let nav = useNavigate();
  const getPatient = async () => {
    let res = await api.get(`/patients/${id}`);
    if (handleErrorChecking(res)) {
      setPatient(res.data);
    }
  };
  useEffect(() => {
    getPatient();
  }, [id]);
  const handleSubmit = async (data) => {
    setLoading(true);
    let res = await api.put(`/patients/${id}/update`, data);
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setPatient(res.data.patient);
    setLoading(false);
    toast.success(res.data.statusMessage);
    setUpdateMode(false);
  };

  const handleDeletePatient = async () => {
    if (!confirm(`Do you wish to Delete This Patient?\n${patient.name}`))
      return;
    setLoading(true);
    let res = await api.delete(`/patients/${id}/delete`);
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setLoading(false);
    toast.success(res.data.statusMessage);
    nav("/patients");
  };
  return (
    <div className="w-full h-full bg-light/70 shadow-md border border-dark/40 shadow-dark rounded-lg flex flex-col justify-between p-2 gap-2   overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin    ">
      <div className="flex w-full h-full flex-col items-center gap-2">
        <SectionHeader
          title={<>Info</>}
          dark
          commands={
            updateMode ? (
              <RxCross2
                onClick={() => {
                  // setValue(data);
                  setUpdateMode(false);
                }}
                className="w-[20px]   h-fit cursor-pointer hover:text-red-700"
              />
            ) : (
              <>
                <BiTrash
                  onClick={() => handleDeletePatient()}
                  className="w-[20px]   h-fit cursor-pointer hover:text-red-700 "
                ></BiTrash>
                <BiEdit
                  onClick={() => {
                    setUpdateMode(true);
                  }}
                  className="w-[20px]   h-fit cursor-pointer hover:text-blue-700"
                />
              </>
            )
          }
        ></SectionHeader>
        {/* info */}

        {!updateMode ? (
          <>
            <TextInformationRow
              data={patient.name}
              title="Name"
              updateMode={updateMode}
            />
            <BinaryInformationRow
              updateMode={updateMode}
              data={patient.sex}
              title="Sex"
              displayOff={"Female"}
              displayOn="Male"
            />
            <TextInformationRow
              data={patient.age}
              title="Age"
              type="number"
              updateMode={updateMode}
            />
            <TextInformationRow
              data={patient.contact || ""}
              title="Contact"
              updateMode={updateMode}
            />
            <TextInformationRow
              data={patient.occupation || ""}
              title="Occupation"
              updateMode={updateMode}
            />
            <TextAreaInformationRow
              data={patient.details || ""}
              title="Details"
              updateMode={updateMode}
            />
          </>
        ) : (
          <AppForm
            onSubmit={handleSubmit}
            initialValues={{
              name: patient.name,
              sex: patient.sex,
              age: patient.age,
              contact: patient.contact,
              occupation: patient.occupation,
              details: patient.details,
            }}
            validationSchema={validationSchema}
          >
            <div className="w-full 2xl:w-[65%] bg-dark/70 h-full   overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin       rounded-md  flex flex-col items-center justify-start my-2  py-1  px-6 lg:px-2 ">
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
              <div className="w-full flex flex-wrap justify-center gap-x-1 ">
                <div className="w-full h-0.5 bg-accent/70 my-2 rounded-t-3xl"></div>
                <SubmitButton
                  svg={<BiSave className="w-[20px]    h-fit"></BiSave>}
                ></SubmitButton>

                <ClearButton
                  svg={<MdRestore className="w-[20px]    h-fit" />}
                ></ClearButton>
              </div>
            </div>
          </AppForm>
        )}
      </div>
    </div>
  );
}

export default LargePatientCard;
