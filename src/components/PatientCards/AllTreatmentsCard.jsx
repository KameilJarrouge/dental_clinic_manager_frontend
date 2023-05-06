import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { MdSearch } from "react-icons/md";
import api from "../../api/api";
import { LoadingContext } from "../../context/loadingContext";
import { LoginModalContext } from "../../context/loginModalContext";
import { handleErrorChecking } from "../../pages/Home";
import ATCTreatmentCard from "../ActiveTreatmentCard/ATCTreatmentCard";
import { BinarySwitchInput } from "../BinarySwitchInput";
import LoadMoreCard from "../LoadMoreCard";
import SectionHeader from "../SectionHeader";

function AllTreatmentsCard({ patientId = 0 }) {
  const [loading, setLoading] = useState(false);
  const [treatments, setTreatments] = useState([]);
  const { shouldRefresh } = useContext(LoadingContext);
  const [order, setOrder] = useState(true); // for latest first
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState(null);
  const { loginModal } = useContext(LoginModalContext);
  const [take, setTake] = useState(5);
  const getTreatments = async () => {
    setLoading(true);
    let res = await api.get(
      `/patients/${patientId}/courses-patients?date=${moment(searchDate).format(
        "yyyy-MM-DD"
      )}&name=${searchName}&order=${order}&take=${take}`
    );
    if (!handleErrorChecking(res, loginModal, setLoading)) {
      return;
    }
    setTreatments(res.data);
    setLoading(false);
  };
  useEffect(() => {
    getTreatments();
  }, [patientId, take, shouldRefresh]);

  return (
    <div
      key={3}
      className={`w-full h-[49%] animate-pulseOnce bg-secondary/70 shadow-md border border-dark/40 shadow-dark rounded-lg flex flex-col justify-between p-2 gap-2`}
    >
      <div className="flex flex-col gap-2 h-full">
        <SectionHeader
          title="Treatments"
          commands={
            <>
              <MdSearch
                onClick={() => getTreatments()}
                className="w-[1.7rem] 2xl:w-[2rem] hover:text-green-700 cursor-pointer"
              />

              <DateTimePicker
                className={`w-fit h-full bg-light   text-dark rounded-sm text-base   px-2 flex     outline-none`}
                onChange={(value) => setSearchDate(value)}
                value={searchDate}
                format="yyyy/ MM / dd"
                disableClock={true}
                maxDate={new Date("2099-12-31")}
                calendarIcon={null}
              />
              <BinarySwitchInput
                className={"text-base min-w-fit"}
                value={order}
                setValue={setOrder}
                displayOff={
                  <AiOutlineArrowDown className="w-[20px] h-fit py-0.5" />
                }
                displayOn={
                  <AiOutlineArrowUp className="w-[20px] h-fit py-0.5" />
                }
              ></BinarySwitchInput>
            </>
          }
          // direction="left"
          dark
          className="border-b-badge-13/70"
        ></SectionHeader>
        <div className="flex flex-col gap-2   overflow-y-scroll  scrollbar-track-transparent  scrollbar-thumb-accent  scrollbar-thin     max-h-full   py-1  ">
          {loading ? (
            <div className="font-bold">Loading...</div>
          ) : (
            <>
              {treatments.map((treatment) => (
                <ATCTreatmentCard
                  refresh={() => getTreatments()}
                  treatment={treatment}
                  key={treatment.id}
                  patientId={patientId}
                />
              ))}

              {treatments.length === 0 ? (
                <div className="font-bold ">No Treatments Yet!</div>
              ) : (
                <div className="h-[2rem] w-full my-1  ">
                  <LoadMoreCard
                    by={5}
                    setValue={setTake}
                    value={take}
                    length={treatments.length}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllTreatmentsCard;
