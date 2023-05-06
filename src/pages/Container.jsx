import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getToken } from "../api/token";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import { LoginModalContext } from "../context/loginModalContext";
import { ModalsContext } from "../context/modalsContext";
import CreatePatientModal from "../Modal/CreatePatientModal";
import LoginModal from "../Modal/LoginModal";
import ContextMenu from "../Modal/ContextMenu";
import CreateCourseModal from "../Modal/CreateCourseModal";
import { LoadingContext } from "../context/loadingContext";
import CreateCheckupModal from "../Modal/CreateCheckupModal";
import CreateXrayModal from "../Modal/CreateXrayModal";
import CreateTreatmentModal from "../Modal/CreateTreatmentModal";
import CreateSessionModal from "../Modal/CreateSessionModal";
import UserUpdateModal from "../Modal/UserUpdateModal";
function Container() {
  const [loginModalOn, setLoginModalOn] = useState(false);
  const [updateUserModalOn, setUpdateUserModalOn] = useState(false);
  const [createPatientModalOn, setCreatePatientModalOn] = useState(false);
  const [createCourseModalOn, setCreateCourseModalOn] = useState(false);
  const [createCheckupModalOn, setCreateCheckupModalOn] = useState(false);
  const [createSessionModalOn, setCreateSessionModalOn] = useState(false);
  const [createXrayModalOn, setCreateXrayModalOn] = useState(false);
  const [createTreatmentModalOn, setCreateTreatmentModalOn] = useState(false);
  const [viewedTreatmentId, setViewedTreatmentId] = useState(0);
  const [viewedPatientId, setViewedPatientId] = useState(0);
  const [navigatedViewedPatientId, setNavigatedViewedPatientId] = useState(0);
  const [selectedId, setSelectedId] = useState(0);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(getToken() !== null);
  const [contextMenuIsOn, setContextMenuIsOn] = useState(false);
  const [contextOn, setContextOn] = useState({
    top: "0",
    left: "0",
    content: <div>Hello From Context Menu</div>,
  });
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col bg-light font-Times-New-Roman text-dark
      bg-background-image bg-repeat  relative 
      "
    >
      {loading && <Loading />}
      {/* color palette */}
      {false && (
        <div className="absolute w-full h-[20svh] top-0 left-0 flex flex-col bg-white">
          <div className="w-full h-[4svh] bg-dark text-center text-white">
            dark
          </div>
          <div className="w-full h-[4svh] bg-primary text-center text-white">
            primary
          </div>
          <div className="w-full h-[4svh] bg-secondary text-center text-black">
            secondary
          </div>
          <div className="w-full h-[4svh] bg-light text-center text-black">
            light
          </div>
          <div className="w-full h-[4svh] bg-accent text-center text-black">
            accent
          </div>
        </div>
      )}

      <LoadingContext.Provider
        value={{
          setLoading: setLoading,
          shouldRefresh: refreshToggle,
          toggleRefresh: () => setRefreshToggle(!refreshToggle),
        }}
      >
        <LoginModalContext.Provider
          value={{
            loginModal: (on) => setLoginModalOn(on),
            updateUserModalOn: updateUserModalOn,
            setUpdateUserModalOn: setUpdateUserModalOn,
            loggedIn: loggedIn,

            setLoggedIn: setLoggedIn,
          }}
        >
          <ModalsContext.Provider
            value={{
              contextOn: contextOn,
              setContextOn: setContextOn,
              contextMenuIsOn: contextMenuIsOn,
              setContextMenuIsOn: setContextMenuIsOn,
              setCreatePatientModalOn: setCreatePatientModalOn,
              createPatientModalOn: createPatientModalOn,
              createCourseModalOn: createCourseModalOn,
              setCreateCourseModalOn: setCreateCourseModalOn,
              createCheckupModalOn: createCheckupModalOn,
              setCreateCheckupModalOn: setCreateCheckupModalOn,
              createSessionModalOn: createSessionModalOn,
              setCreateSessionModalOn: setCreateSessionModalOn,
              createXrayModalOn: createXrayModalOn,
              setCreateXrayModalOn: setCreateXrayModalOn,
              createTreatmentModalOn: createTreatmentModalOn,
              setCreateTreatmentModalOn: setCreateTreatmentModalOn,
              selectedId: selectedId,
              setSelectedId: setSelectedId,
              viewedPatientId: viewedPatientId,
              setViewedPatientId: setViewedPatientId,
              viewedTreatmentId: viewedTreatmentId,
              setViewedTreatmentId: setViewedTreatmentId,
              navigatedViewedPatientId: navigatedViewedPatientId,
              setNavigatedViewedPatientId: setNavigatedViewedPatientId,
            }}
          >
            {/* context menu */}

            <ContextMenu
              open={contextMenuIsOn}
              onClose={() => setContextMenuIsOn(false)}
            />

            {/* login modal */}
            {loginModalOn && (
              <LoginModal
                open={loginModalOn}
                onClose={() => setLoginModalOn(false)}
              ></LoginModal>
            )}
            {updateUserModalOn && (
              <UserUpdateModal
                open={updateUserModalOn}
                onClose={() => setUpdateUserModalOn(false)}
              ></UserUpdateModal>
            )}
            {createPatientModalOn && (
              <CreatePatientModal
                open={createPatientModalOn}
                onClose={() => {
                  setSelectedId(0);
                  setCreatePatientModalOn(false);
                }}
              ></CreatePatientModal>
            )}
            {createCourseModalOn && (
              <CreateCourseModal
                open={createCourseModalOn}
                onClose={() => {
                  setSelectedId(0);
                  setCreateCourseModalOn(false);
                }}
                id={selectedId}
              ></CreateCourseModal>
            )}
            {createCheckupModalOn && (
              <CreateCheckupModal
                viewedPatientId={viewedPatientId}
                open={createCheckupModalOn}
                onClose={() => {
                  setSelectedId(0);
                  setCreateCheckupModalOn(false);
                }}
                id={selectedId}
              />
            )}
            {createSessionModalOn && (
              <CreateSessionModal
                viewedTreatmentId={viewedTreatmentId}
                open={createSessionModalOn}
                onClose={() => {
                  setSelectedId(0);
                  setCreateSessionModalOn(false);
                }}
                id={selectedId}
              />
            )}
            {createXrayModalOn && (
              <CreateXrayModal
                viewedPatientId={viewedPatientId}
                open={createXrayModalOn}
                onClose={() => {
                  setSelectedId(0);
                  setCreateXrayModalOn(false);
                }}
                id={selectedId}
              />
            )}
            {createTreatmentModalOn && (
              <CreateTreatmentModal
                viewedPatientId={viewedPatientId}
                open={createTreatmentModalOn}
                onClose={() => {
                  setSelectedId(0);
                  setCreateTreatmentModalOn(false);
                }}
                id={selectedId}
              />
            )}

            <div className="w-full bg-dark h-[7svh] 2xl:h-[6svh] flex justify-start">
              <Header></Header>
            </div>
            <div className="w-full h-[93svh] 2xl:h-[94svh] flex flex-row ">
              {/* sidebar */}
              <Sidebar></Sidebar>
              {/* page */}
              <div className="w-full h-full px-1">
                <Outlet />
              </div>
            </div>
            <div className="w-1/2 absolute bottom-0 left-0 bg-gradient-to-l from-black/60 to-dark/60 h-[2svh] 2xl:h-[2svh]"></div>
            <div className="w-1/2 absolute bottom-0 right-0 bg-gradient-to-l from-dark/60 to-black/60 h-[2svh] 2xl:h-[2svh]"></div>
          </ModalsContext.Provider>
        </LoginModalContext.Provider>
      </LoadingContext.Provider>
    </div>
  );
}

export default Container;
