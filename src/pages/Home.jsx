import { useContext, useEffect, useState } from "react";
import api, {
  AUTHORIZATION_ERROR_403,
  NETWORK_ERROR,
  SERVER_ERROR_500,
} from "../api/api";
import { LoginModalContext } from "../context/loginModalContext";
import { toast } from "react-toastify";
import TitleHeader from "../components/TitleHeader";
import PatientAddForm from "../form/PatientAddForm";
import { LoadingContext } from "../context/loadingContext";
import ATCCard from "../components/ActiveTreatmentCard/ATCCard";

/**
 *
 * @param {*} Response
 * @returns false if there is an error, true if ok
 */
export const handleErrorChecking = (res, loginModal, setLoading = (f) => f) => {
  if (res.hasOwnProperty("errorCode")) {
    switch (res.errorCode) {
      case SERVER_ERROR_500:
        toast.error("server error");
        break;
      case NETWORK_ERROR:
        toast.error("server possibly down");
        break;
      case AUTHORIZATION_ERROR_403:
        loginModal(true);
        break;
    }
    setLoading(false);
    return false;
  }
  return true;
};

export default function Home() {
  const { shouldRefresh, setLoading } = useContext(LoadingContext);
  const [filterKey, setFilterKey] = useState("");
  const [activePatients, setActivePatients] = useState([]);
  const { loginModal } = useContext(LoginModalContext);
  const getActivePatients = async () => {
    setLoading(true);
    let res = await api.get("/patients/active");
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setLoading(false);
    setActivePatients(res.data);
  };

  useEffect(() => {
    getActivePatients();
  }, [shouldRefresh]);

  return (
    <>
      <main
        className={
          "w-full h-full flex flex-col justify-start items-center bg-transparent p-1 px-4 py-5 2xl:py-10 "
        }
      >
        <div className="flex gap-4 w-full h-full  ">
          {/* left side */}
          <div className="w-1/2 rounded-lg bg-dark/20  flex flex-col justify-start items-center px-10  border-l-4 border-accent  shadow-sm shadow-primary/90 ">
            <div className="w-full my-2 gap-2  flex flex-col items-start  ">
              <TitleHeader
                title="Active Patients"
                dark
                className="border-b-accent/70"
              ></TitleHeader>

              <div className="w-full flex gap-4 justify-start items-center mb-2 ">
                <input
                  placeholder="Filter Patients"
                  className="bg-light rounded-sm w-1/3 text-center border border-dark/50 outline-none"
                  value={filterKey}
                  onChange={(e) => setFilterKey(e.currentTarget.value)}
                />
              </div>
            </div>
            {/* active courses goes here */}
            <div className="w-full flex flex-wrap  justify-start items-center gap-5   overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin        pb-4">
              {/* card */}

              {activePatients
                .filter((patient) =>
                  patient.name.toLowerCase().includes(filterKey.toLowerCase())
                )
                .map((patient) => (
                  <ATCCard key={patient.id} patient={patient}></ATCCard>
                ))}
            </div>
          </div>
          {/* right side */}
          <div className="w-1/2 h-full">
            <PatientAddForm></PatientAddForm>
          </div>
        </div>
      </main>
    </>
  );
}
