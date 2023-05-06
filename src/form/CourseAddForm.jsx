import React, { useContext, useEffect, useState } from "react";
import { MdClear, MdOutlinePersonOutline, MdRestore } from "react-icons/md";
import { BiSave, BiTrash } from "react-icons/bi";
import TitleHeader from "../components/TitleHeader";
import AppForm from "./AppForm";
import AppFormField from "./AppFormField";
import SubmitButton from "./SubmitButton";
import ClearButton from "./ClearButton";
import ToothBadge from "../components/Teeth/ToothBadge";
import AppFormColorSelector from "./AppFormColorSelector";
import ToothBadgePreview from "../components/ToothBadgePreview";
import * as Yup from "yup";
import { LoadingContext } from "../context/loadingContext";
import api from "../api/api";
import { toast } from "react-toastify";
import CustomizedClearButton from "./CustomizedClearButton";
import { handleErrorChecking } from "../pages/Home";
import { LoginModalContext } from "../context/loginModalContext";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("course's name is required"),
});
function CourseAddForm({ onClose, id = 0 }) {
  const { setLoading, toggleRefresh } = useContext(LoadingContext);
  const { loginModal } = useContext(LoginModalContext);
  const [course, setCourse] = useState({
    name: "",
    colorIndex: 1,
    effectName: "",
  });
  const getCourse = async () => {
    let res = await api.get(`/courses/${id}`);
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setCourse(res.data);
  };
  useEffect(() => {
    if (id !== 0) getCourse();
    else {
      setCourse({
        name: "",
        colorIndex: 1,
        effectName: "",
      });
    }
  }, [id]);

  const handleDelete = async () => {
    if (id === 0) return;
    if (!confirm(`Do you wish to delete this course?\n${course.name}`)) return;
    setLoading(true);
    let res = await api.delete(`/courses/${id}/delete`);
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setLoading(false);
    onClose();
    toggleRefresh();
    toast.success(res.data.statusMessage);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    let res = await api.post(
      `/courses/${id === 0 ? "create" : `${id}/update`}`,
      {
        name: data.name,
        effectName: data.effectName === "" ? data.name : data.effectName,
        colorIndex: data.colorIndex,
      }
    );
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
      className="w-full h-fit flex justify-start items-center 
            bg-secondary/80 rounded-lg  shadow-sm shadow-primary/40 overflow-y-hidden"
    >
      {/* form */}
      <div className="w-full h-fit bg-dark/80 rounded-lg flex justify-center items-start   overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin       py-2">
        <AppForm
          onSubmit={handleSubmit}
          initialValues={course}
          validationSchema={validationSchema}
        >
          <div className="w-3/4 flex flex-col items-center justify-start my-2  px-6 lg:px-2 ">
            <TitleHeader
              title={`${id === 0 ? "New" : "Edit"} Course`}
            ></TitleHeader>
            <AppFormField
              svg={<MdOutlinePersonOutline className="w-[20px] h-[20px]" />}
              name={"name"}
              type="text"
              title="Name"
            ></AppFormField>
            <AppFormField
              svg={<ToothBadge className="w-[20px] h-[20px]" />}
              name={"effectName"}
              type="text"
              title="Effect Name"
            ></AppFormField>
            <AppFormColorSelector
              name={"colorIndex"}
              title="Effect Color"
            ></AppFormColorSelector>

            <ToothBadgePreview></ToothBadgePreview>
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

export default CourseAddForm;
