import React, { useContext, useEffect, useState } from "react";
import ToothTest from "./ToothTest";
import { GiBabyFace } from "react-icons/gi";
import { MdOutlineFace } from "react-icons/md";
import ToothNote from "./ToothNote";
import { ModalsContext } from "../../context/modalsContext";
import ToothAddForm from "../../form/ToothAddForm";
import ToothContextMenu from "./ToothContextMenu";
import api from "../../api/api";
import { toast } from "react-toastify";
import { LoadingContext } from "../../context/loadingContext";
import TreatmentContextMenu from "./TreatmentContextMenu";
import { handleErrorChecking } from "../../pages/Home";
import { LoginModalContext } from "../../context/loginModalContext";
export const SELECT_MODE = 1;
export const VIEW_MODE = 2;
export const CREATE_MODE = 3;

function Jaw({
  className = "",
  refresh = false,
  patientId = 0,
  additionalId = 0,
  teeth = [],
  mode = SELECT_MODE,
  modifiable = true,
  selectedTeeth = {},
  setSelectedTeeth = (f) => f,
}) {
  const [babyTeeth, setBabyTeeth] = useState(false);
  const [patientTeeth, setPatientTeeth] = useState(teeth); //{ number: 14, id: 1 }
  const { setContextOn, setContextMenuIsOn } = useContext(ModalsContext);
  const { setLoading } = useContext(LoadingContext);
  const { loginModal } = useContext(LoginModalContext);
  const getPatientTeeth = async () => {
    setLoading(true);
    let res = await api.get(`/patients/${patientId}/teeth`);
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    // console.log(res.data);
    setPatientTeeth(res.data);
    setLoading(false);
  };
  useEffect(() => {
    getPatientTeeth();
  }, [patientId, refresh]);
  useEffect(() => {}, [selectedTeeth]);
  const handleToothAdd = async (note, number) => {
    setLoading(true);
    let res = await api.post(`/patients/${patientId}/teeth/create`, {
      number: number,
      notes: note,
    });
    toast.success(res.data.statusMessage);
    setContextMenuIsOn(false);
    setLoading(false);
    getPatientTeeth();
  };

  const handleToothUpdate = async (note, id) => {
    setLoading(true);
    let res = await api.put(`/teeth/${id}/update`, { notes: note });
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    toast.success(res.data.statusMessage);
    setContextMenuIsOn(false);
    setLoading(false);
    getPatientTeeth();
  };
  const handleToothDelete = async (id) => {
    if (!confirm(`Do you wish to delete this tooth?`)) return;
    setLoading(true);
    let res = await api.delete(`/teeth/${id}/delete`);
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    toast.success(res.data.statusMessage);
    setContextMenuIsOn(false);
    setLoading(false);
    getPatientTeeth();
  };
  let clickTooth = (f) => f,
    contextMenuTooth = (f) => f;

  switch (mode) {
    case CREATE_MODE:
      clickTooth = (selected, setselected, id, number, e, note, badges) => {
        if (!selected) {
          setSelectedTeeth((selectedTeeth) => {
            selectedTeeth[number] = { number: number };
            return selectedTeeth;
          });
        } else {
          setSelectedTeeth((selectedTeeth) => {
            delete selectedTeeth[number];
            return selectedTeeth;
          });
        }
        setselected(!selected);
      };
      contextMenuTooth = (id, number, e, selected, note, badges) => {
        e.preventDefault();
        if (!selected) return;
        setContextOn({
          left: e.clientX,
          top: e.clientY,
          content: (
            <ToothNote
              number={number}
              onCheck={(value) => {
                setSelectedTeeth((selectedTeeth) => {
                  selectedTeeth[number]["note"] = value;
                  return selectedTeeth;
                });
                setContextMenuIsOn(false);
              }}
              onDelete={() => {
                setSelectedTeeth((selectedTeeth) => {
                  delete selectedTeeth[number]["note"];
                  return selectedTeeth;
                });
                setContextMenuIsOn(false);
              }}
              originalValue={selectedTeeth[number]["note"] || ""}
            />
          ),
        });
        setContextMenuIsOn(true);
      };
      break;

    case SELECT_MODE:
      clickTooth = (
        selected,
        setselected,
        id,
        number,
        e = null,
        note,
        badges
      ) => {
        if (id === 0) {
          setContextOn({
            left: e.clientX,
            top: e.clientY,
            content: (
              <ToothAddForm
                onCheck={(note) => handleToothAdd(note, number)}
                onDelete={() => setContextMenuIsOn(false)}
                key={number}
                number={number}
                title="New Tooth"
              ></ToothAddForm>
            ),
          });
          setContextMenuIsOn(true);
        } else {
          if (!modifiable) return;
          if (!selected) {
            setSelectedTeeth((selectedTeeth) => {
              selectedTeeth[number] = { id: id };
              return selectedTeeth;
            });
          } else {
            setSelectedTeeth((selectedTeeth) => {
              delete selectedTeeth[number];
              return selectedTeeth;
            });
          }
          setselected(!selected);
        }
      };
      contextMenuTooth = (
        id,
        number,
        e,
        selected,
        note,
        badges,
        setSelected
      ) => {
        if (id === 0) return; // tooth is not added
        if (modifiable) return;
        e.preventDefault();
        setContextOn({
          left: e.clientX,
          top: e.clientY,
          content: (
            <TreatmentContextMenu
              number={number}
              options={[
                {
                  name: !selected
                    ? "Add to Treatment"
                    : "Remove from Treatment",
                  onClick: async () => {
                    // return;
                    setLoading(true);
                    let res = await api.post(
                      `/courses-patients/${additionalId}/${
                        !selected ? "add" : "remove"
                      }-course-patient-tooth`,
                      !selected
                        ? {
                            toothId: id,
                          }
                        : { cptId: selectedTeeth[number]["cptId"] }
                    );
                    if (!handleErrorChecking(res, loginModal, setLoading)) {
                      setLoading(false);
                      return;
                    }
                    setSelectedTeeth((selectedTeeth) => {
                      selectedTeeth[number] = { id: id, cptId: res.data.cptId };
                      return selectedTeeth;
                    });
                    setLoading(false);
                    toast.success(res.data.statusMessage);
                    setContextMenuIsOn(false);
                    getPatientTeeth();
                    setSelected(!selected);
                  },
                },
              ]}
            ></TreatmentContextMenu>
          ),
        });
        setContextMenuIsOn(true);
      };
      break;

    case VIEW_MODE:
      clickTooth = (selected, setselected, id, number, e, note, badges) => {
        e.preventDefault();
        if (id === 0) {
          setContextOn({
            left: e.clientX,
            top: e.clientY,
            content: (
              <ToothAddForm
                onCheck={(note) => handleToothAdd(note, number)}
                onDelete={() => setContextMenuIsOn(false)}
                key={number}
                number={number}
                title="New Tooth"
              ></ToothAddForm>
            ),
          });
        } else {
          setContextOn({
            left: e.clientX,
            top: e.clientY,
            content: (
              <ToothAddForm
                onCheck={(note) => handleToothUpdate(note, id)}
                id={id}
                key={number}
                number={number}
                title="Tooth Notes"
                originalValue={note}
              ></ToothAddForm>
            ),
          });
        }
        setContextMenuIsOn(true);
      };
      contextMenuTooth = (id, number, e, selected, note, badges) => {
        if (id === 0) return; // tooth is not added
        e.preventDefault();
        setContextOn({
          left: e.clientX,
          top: e.clientY,
          content: (
            <ToothContextMenu
              onDelete={() => handleToothDelete(id)}
              number={number}
              badges={badges}
            ></ToothContextMenu>
          ),
        });
        setContextMenuIsOn(true);
      };
  }

  let patientTeethNumbers = patientTeeth.map((tooth) => tooth.number);

  const displayTeeth = (quarter) => {
    return quarter.map((number) => {
      let index = patientTeethNumbers.indexOf(number);
      if (index !== -1) {
        return (
          <ToothTest
            setSelectedTeeth={setSelectedTeeth}
            selectedTeeth={selectedTeeth}
            key={number}
            id={patientTeeth[index].id}
            note={patientTeeth[index].notes}
            badges={patientTeeth[index].CoursePatientTeeth}
            selectable
            number={number}
            mode={mode}
            className={""}
            onClick={clickTooth}
            onContextMenu={contextMenuTooth}
          ></ToothTest>
        );
      } else {
        return (
          <ToothTest
            setSelectedTeeth={setSelectedTeeth}
            selectedTeeth={selectedTeeth}
            key={number}
            id={0}
            note=""
            selectable={false}
            number={number}
            mode={mode}
            className={""}
            onClick={clickTooth}
            onContextMenu={contextMenuTooth}
          ></ToothTest>
        );
      }
    });
  };
  let q1 = [17, 18, 16, 15, 14, 13, 12, 11];
  let q2 = [27, 28, 26, 25, 24, 23, 22, 21];
  let q3 = [47, 48, 46, 45, 44, 43, 42, 41];
  let q4 = [37, 38, 36, 35, 34, 33, 32, 31];
  let q5 = [55, 54, 53, 52, 51];
  let q6 = [65, 64, 63, 62, 61];
  let q7 = [85, 84, 83, 82, 81];
  let q8 = [75, 74, 73, 72, 71];
  return (
    // max-w-[300px]      overflow-y-scroll  scrollbar-track-transparent scrollbar-thumb-accent
    <div
      dir="ltr"
      className={`${className} min-w-[300px] scale-50 lg:scale-[.65] xl:scale-75 2xl:scale-100  min-h-[700px] 2xl:min-h-[700px]    overflow-x-hidden   bg-dark [#a74a4a]  rounded-full  relative  `}
    >
      {mode !== CREATE_MODE && (
        <div className="absolute  left-[90px] w-[120px] top-[270px] h-[45px] text-white text-center ">
          <div className="animate-pulseAndVanish opacity-0 rounded-md">
            Right Click Icon To Refresh
          </div>
        </div>
      )}
      <div
        className=" absolute  left-[130px] w-[45px] top-[330px] h-[45px] flex justify-center items-center  cursor-pointer text-secondary hover:text-white z-10"
        onClick={() => {
          setBabyTeeth(!babyTeeth);
        }}
        onContextMenu={(e) => {
          if (mode === CREATE_MODE) return;
          e.preventDefault();
          getPatientTeeth();
        }}
      >
        {" "}
        {!babyTeeth ? (
          <GiBabyFace className="w-full h-full" />
        ) : (
          <MdOutlineFace className="w-full h-full" />
        )}
      </div>

      <div
        className={`flex flex-wrap ${
          babyTeeth && "invisible -z-10"
        } absolute top-0 left-0 `}
      >
        <div className="min-w-[150px] min-h-[350px]   relative pt-1 -scale-x-[1] ">
          {displayTeeth(q1)}
        </div>
        <div className="min-w-[150px] min-h-[350px]   relative pt-1  ">
          {displayTeeth(q2)}
        </div>

        <div className="min-w-[150px] min-h-[350px]   relative pt-1 -scale-x-[1] -scale-y-[1] ">
          {displayTeeth(q3)}
        </div>
        <div className="min-w-[150px] min-h-[350px]   relative pt-1 -scale-y-[1]  ">
          {displayTeeth(q4)}
        </div>
      </div>
      <div
        className={`flex flex-wrap ${
          !babyTeeth && "invisible -z-10"
        } absolute left-0 top-0`}
      >
        {" "}
        <div className="min-w-[150px] min-h-[350px]   relative pt-1 -scale-x-[1] ">
          {displayTeeth(q5)}
        </div>
        <div className="min-w-[150px] min-h-[350px]   relative pt-1  ">
          {displayTeeth(q6)}
        </div>
        <div className="min-w-[150px] min-h-[350px]   relative pt-1 -scale-x-[1] -scale-y-[1] ">
          {displayTeeth(q7)}
        </div>
        <div className="min-w-[150px] min-h-[350px]   relative pt-1 -scale-y-[1]  ">
          {displayTeeth(q8)}
        </div>
      </div>
    </div>
  );
}

export default Jaw;
