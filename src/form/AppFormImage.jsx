import { useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
// import AppText from "../AppText";
// import DisplayNumberAsString from "../DisplayNumberAsString";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { MdOutlineChangeCircle } from "react-icons/md";
function AppFormImage({
  name,
  imgUrl = "",
  id = 0,
  person_id = 0,
  onDelete = (f) => f,
  onUpdate = (f) => f,
  onCreate = (f) => f,
  svg = null,
  title = "Xray",
  ...otherProps
}) {
  const [focused, setFocuesd] = useState(false);

  // const handlesubmit = async (values) => {
  //   let fd = new FormData();
  //   fd.append("id_number", values.id_number);

  //   if (values.file !== undefined) {
  //     fd.append("image1", values.image1, "image1");
  //   }

  //   const res = await api.post("/api/people/add", fd, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  //   if (res.data.status === "ok") {
  //     toast.success(res.data.message);
  //     onClose();
  //     refresh();
  //   }
  // };
  const fileInput = useRef(null);
  const [img, setImg] = useState(imgUrl);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (img === "") {
      onCreate(person_id, file, name);
    } else {
      onUpdate(id, file, name);
    }
    setFieldValue(name, file);
    setImg(URL.createObjectURL(file));
  };
  useEffect(() => {
    setImg(imgUrl);
  }, [imgUrl]);

  const invokeInputFile = () => {
    fileInput.current.click();
  };

  const handleRemove = () => {
    setImg("");
    setFieldValue(name, undefined);
    onDelete();
  };

  const { setFieldValue } = useFormikContext();

  return (
    <div className="w-fit my-2 h-fit flex flex-col justify-start items-start">
      <div
        className={`
             font-bold w-full text-sm 2xl:text-base text-light flex justify-start items-center gap-2 border-b-2 
          ${
            focused
              ? "border-b-light   transition-all duration-500  font-bold   "
              : "border-b-transparent"
          }`}
      >
        {svg}
        {title}
      </div>
      <div
        tabIndex={"0"}
        onFocus={() => {
          setFocuesd(true);
        }}
        onBlur={() => {
          setFocuesd(false);
        }}
        className={`mt-2 min-w-[412px] ${
          !img && "animate-pulseAndVanish"
        }  min-h-[192px] border-[0.2px] border-dark   rounded-sm group relative `}
      >
        {img ? (
          <img src={img} alt={""} className="w-[412px] h-[192px]  " />
        ) : (
          <div className="w-[412px] h-[192px]"></div>
        )}
        <div
          className={`absolute top-0  left-0 w-full h-full bg-dark/30 text-light hidden group-hover:flex justify-center items-center `}
        >
          {!img ? (
            <AiOutlinePlus
              onClick={invokeInputFile}
              className="w-[1.7rem] 2xl:w-[2rem] h-fit hover:animate-wiggle hover:text-green-600 cursor-pointer transition-colors "
            ></AiOutlinePlus>
          ) : (
            <>
              <MdOutlineChangeCircle
                onClick={invokeInputFile}
                className="w-[1.7rem] 2xl:w-[2rem] h-fit hover:animate-wiggle hover:text-green-600 cursor-pointer transition-colors"
              ></MdOutlineChangeCircle>
              <BiTrash
                onClick={handleRemove}
                className="w-[1.7rem] 2xl:w-[2rem] h-fit hover:animate-wiggle hover:text-red-600 cursor-pointer transition-colors"
              ></BiTrash>
            </>
          )}
        </div>
      </div>

      <input
        ref={fileInput}
        type="file"
        onChange={onImageChange}
        className="hidden"
      />
    </div>
  );
}

export default AppFormImage;
