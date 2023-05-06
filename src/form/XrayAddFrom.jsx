import React, { useContext, useEffect, useState } from "react";
import { MdClear, MdDateRange, MdRestore } from "react-icons/md";
import { BiSave, BiTrash } from "react-icons/bi";
import TitleHeader from "../components/TitleHeader";
import AppForm from "./AppForm";
import SubmitButton from "./SubmitButton";
import ClearButton from "./ClearButton";
import { CgNotes } from "react-icons/cg";
import { LoadingContext } from "../context/loadingContext";
import api, { BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import CustomizedClearButton from "./CustomizedClearButton";
import AppFormDatePicker from "./AppFormDatePicker";
import AppFormTextArea from "./AppFormTextArea";
import AppFormImage from "./AppFormImage";
import { FaXRay } from "react-icons/fa";
import { handleErrorChecking } from "../pages/Home";
import { LoginModalContext } from "../context/loginModalContext";

function XrayAddForm({ onClose, id = 0, patientId = 0 }) {
  const { setLoading, toggleRefresh } = useContext(LoadingContext);
  const { loginModal } = useContext(LoginModalContext);
  const [fileName, setFileName] = useState("");
  const [xray, setXray] = useState({
    createdAt: new Date(),
    file: null,
    notes: "",
  });
  const getXray = async () => {
    let res = await api.get(`/attachments/${id}`);
    setXray({
      createdAt: new Date(res.data.createdAt),
      notes: res.data.notes,
      file: null,
    });
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setFileName(res.data.fileName);
  };
  useEffect(() => {
    if (id !== 0) getXray();
    else {
      setXray({
        createdAt: new Date(),
        file: null,
        notes: "",
      });
    }
  }, [id]);

  const handleDelete = async () => {
    if (id === 0) return;
    if (!confirm(`Do you wish to delete this xray?`)) return;
    setLoading(true);
    let res = await api.delete(`/attachments/${id}/delete`);
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setLoading(false);
    onClose();
    toggleRefresh();
    toast.success(res.data.statusMessage);
  };

  const handleSubmit = async (data) => {
    if (fileName === "" && (data.file === undefined || data.file === null)) {
      toast.error("Please make sure to add an Xray!");
      return;
    }
    setLoading(true);
    let fd = new FormData();
    fd.append("notes", data.notes);
    fd.append("createdAt", data.createdAt);
    if (data.file !== undefined && data.file !== null) {
      fd.append("file", data.file, data.file.name);
    }

    let res;
    if (id === 0) {
      res = await api.post(`/patients/${patientId}/attachments/create`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      res = await api.put(`/attachments/${id}/update`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setLoading(false);
    onClose();
    toggleRefresh();
    toast.success(res.data.statusMessage);
  };
  return (
    <div
      className="w-full min-w-[50rem] h-fit flex justify-start items-center 
            bg-secondary/80 rounded-lg  shadow-sm shadow-primary/40 overflow-y-hidden"
    >
      {/* form */}
      <div className="w-full h-fit bg-dark/80 rounded-lg flex justify-center items-start   overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin       py-2">
        <AppForm
          onSubmit={handleSubmit}
          initialValues={xray}
          validationSchema={null}
        >
          <div className="w-full min-w-3/4 flex flex-col items-center justify-start my-2  px-6 lg:px-2 ">
            <TitleHeader
              title={`${id === 0 ? "New" : "Edit"} Xray`}
            ></TitleHeader>
            <div className="flex  gap-4  w-full h-full">
              <AppFormImage
                imgUrl={fileName === "" ? "" : `${BASE_URL}/xrays/${fileName}`}
                name={"file"}
                title="Xray"
                svg={<FaXRay className="w-[20px] h-[20px]" />}
                onDelete={() => setFileName("")}
              ></AppFormImage>
              <div className="flex flex-col w-full h-full">
                <AppFormDatePicker
                  name={"createdAt"}
                  svg={<MdDateRange className="w-[20px] h-[20px]" />}
                  title="Date"
                  type={"date"}
                ></AppFormDatePicker>
                <AppFormTextArea
                  svg={<CgNotes className="w-[20px] h-[20px]" />}
                  name={"notes"}
                  title="Notes"
                ></AppFormTextArea>
              </div>
            </div>

            <div className="w-full flex flex-wrap justify-center gap-x-1 ">
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

export default XrayAddForm;
