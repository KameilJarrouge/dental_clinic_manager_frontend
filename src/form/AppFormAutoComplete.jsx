import { useFormikContext } from "formik";
import React, { useContext, useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { MdOutlineMedicalServices } from "react-icons/md";
import api from "../api/api";
import { handleErrorChecking } from "../pages/Home";
import { LoginModalContext } from "../context/loginModalContext";
import { LoadingContext } from "../context/loadingContext";
function AppFormAutoComplete({
  name,
  title = "",
  svg = null,
  displayKey = "name",
  idKey = "id",
  dataLink = "",
  updateable = true,
  ...otherProps
}) {
  const { setFieldValue, setFieldTouched, touched, errors, values } =
    useFormikContext();
  const [focused, setFocuesd] = useState(false);
  const [search, setSearch] = useState("");
  const [shouldShow, setShouldShow] = useState(true);
  const { loginModal } = useContext(LoginModalContext);
  const { setLoading } = useContext(LoadingContext);
  const [data, setData] = useState([]);
  const getData = async () => {
    if (!updateable) return;
    let result = await api.get(dataLink);
    if (!handleErrorChecking(result, loginModal, setLoading)) {
      return;
    }
    setData(result.data);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (values[name][displayKey] === undefined) return;
    setSearch(values[name][displayKey]);
  }, [values[name]]);

  return (
    <div className={`text-left my-2 flex flex-col shrink w-full relative`}>
      <div className={`flex flex-col text-light   `}>
        {/* title */}
        <div
          className={`
             font-bold text-sm 2xl:text-base flex justify-start items-center gap-2 border-b-2 
          ${
            focused
              ? "border-b-light   transition-all duration-500  font-bold   "
              : "border-b-transparent"
          }`}
        >
          {svg}
          {title}
        </div>
        {/* input */}
        <input
          disabled={!updateable}
          dir={"auto"}
          onFocus={() => {
            setFocuesd(true);
          }}
          className={`mt-2 bg-light text-primary  rounded-sm px-2 py-0.5 border-none  outline-none`}
          onChange={(e) => {
            setShouldShow(true);
            setSearch(e.target.value);
          }}
          onBlur={() => {
            setFieldTouched(name);

            setFocuesd(false);
          }}
          {...otherProps}
          value={search}
        />
      </div>
      {search !== "" && shouldShow && updateable && (
        <div className="w-full h-fit absolute bg-dark/70 border border-dark shadow-lg shadow-dark p-3 z-50 top-16 rounded-sm flex flex-col gap-3 justify-start items-center">
          {data
            .filter((item) => {
              if (item[displayKey].toLowerCase().includes(search.toLowerCase()))
                return item;
            })
            .map((item) => {
              return (
                <div
                  key={item[idKey]}
                  onClick={() => {
                    setFieldValue(name, item);
                    setSearch(item["name"]);
                    setShouldShow(false);
                  }}
                  className="w-full px-2 py-1 flex gap-2 items-center bg-light/90 rounded-md h-fit group hover:bg-white cursor-pointer"
                >
                  <MdOutlineMedicalServices className="w-[20px] h-[20px] group-hover:text-accent" />{" "}
                  <div className="">{item[displayKey]}</div>
                </div>
              );
            })}
        </div>
      )}
      <ErrorMessage visible={touched[name]} error={errors[name]}></ErrorMessage>
    </div>
  );
}

export default AppFormAutoComplete;
