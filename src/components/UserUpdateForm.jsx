import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api, {
  AUTHENTICATION_ERROR_401,
  NETWORK_ERROR,
  SERVER_ERROR_500,
} from "../api/api";
import { setToken } from "../api/token";
import { LoadingContext } from "../context/loadingContext";
import { LoginModalContext } from "../context/loginModalContext";
import AppForm from "../form/AppForm";
import AppFormField from "../form/AppFormField";
import SubmitButton from "../form/SubmitButton";

function UserUpdateForm({ next = (f) => f() }) {
  const { setLoggedIn } = useContext(LoginModalContext);
  const { setLoading } = useContext(LoadingContext);
  const handleSubmit = async (data) => {
    setLoading(true);
    let res = await api.put("/user/update", {
      username: data.username,
      password: data.password,
      newUsername: data.newUsername,
      newPassword: data.newPassword,
    });
    setLoading(false);
    if (res.hasOwnProperty("errorCode")) {
      switch (res.errorCode) {
        case SERVER_ERROR_500:
          toast.error("server error");
          break;
        case NETWORK_ERROR:
          toast.error("server possibly down");
          break;
        case AUTHENTICATION_ERROR_401:
          toast.error("check credentials");
          break;
      }
      return;
    } else {
      //   setToken(res.data.accessToken);
      //   setLoggedIn(true);
      toast.success(res.data.statusMessage);
      next();
    }
  };
  return (
    <div className=" h-full flex flex-col justify-center items-center p-1">
      <AppForm
        onSubmit={handleSubmit}
        initialValues={{
          username: "",
          password: "",
          newUsername: "",
          newPassword: "",
        }}
        validationSchema={null}
      >
        <div className="w-3/4 flex flex-col items-center justify-around my-5  px-6 lg:px-2 ">
          <AppFormField
            name={"username"}
            type="text"
            title="username"
          ></AppFormField>
          <AppFormField
            name={"password"}
            type="password"
            title="password"
          ></AppFormField>
          <AppFormField
            name={"newUsername"}
            type="text"
            title="New username"
          ></AppFormField>
          <AppFormField
            name={"newPassword"}
            type="password"
            title="New password"
          ></AppFormField>
          <SubmitButton title={"Update"}></SubmitButton>
        </div>
      </AppForm>
    </div>
  );
}

export default UserUpdateForm;
