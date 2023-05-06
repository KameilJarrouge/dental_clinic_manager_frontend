import React, { useContext, useEffect, useState } from "react";
import { MdClear, MdDateRange, MdRestore } from "react-icons/md";
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

function SessionAddForm({ onClose, id = 0, treatmentId = 0 }) {
  const { setLoading, toggleRefresh } = useContext(LoadingContext);
  const [session, setSession] = useState({
    createdAt: new Date(),
    details: "",
  });
  const getCheckup = async () => {
    let res = await api.get(`/sessions/${id}`);
    setSession({
      createdAt: new Date(res.data.createdAt),
      details: res.data.details,
      id: res.data.id,
    });
  };
  useEffect(() => {
    if (id !== 0) getCheckup();
    else {
      setSession({
        createdAt: new Date(),
        details: "",
      });
    }
  }, [id]);

  const handleDelete = async () => {
    if (id === 0) return;
    if (!confirm(`Do you wish to delete this checkup?`)) return;
    setLoading(true);
    let res = await api.delete(`/sessions/${id}/delete`);
    setLoading(false);
    onClose();
    toggleRefresh();
    toast.success(res.data.statusMessage);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    let res;
    if (id === 0) {
      res = await api.post(`/courses-patients/${treatmentId}/sessions/create`, {
        createdAt: data.createdAt,
        details: data.details,
      });
    } else {
      res = await api.put(`/sessions/${id}/update`, {
        createdAt: data.createdAt,
        details: data.details,
      });
    }
    setLoading(false);
    onClose();
    toggleRefresh();
    toast.success(res.data.statusMessage);
  };
  return (
    <div
      className="w-full h-fit flex justify-start items-center 
            bg-secondary/80 rounded-lg  shadow-sm shadow-primary/40 overflow-y-hidden"
    >
      {/* form */}
      <div className="w-full h-fit bg-dark/80 rounded-lg flex justify-center items-start   overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin       py-2">
        <AppForm
          onSubmit={handleSubmit}
          initialValues={session}
          validationSchema={null}
        >
          <div className="w-3/4 flex flex-col items-center justify-start my-2  px-6 lg:px-2 ">
            <TitleHeader
              title={`${id === 0 ? "New" : "Edit"} Session`}
            ></TitleHeader>
            <AppFormDatePicker
              name={"createdAt"}
              svg={<MdDateRange className="w-[20px] h-[20px]" />}
              title="Date"
              type={"date"}
            ></AppFormDatePicker>
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
    </div>
  );
}

export default SessionAddForm;
