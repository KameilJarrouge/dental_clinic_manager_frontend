import React from "react";
function ErrorMessage({ visible, error }) {
  if (!visible || !error) {
    return null;
  }
  return <div className="text-red-500 text-sm ">{error} </div>;
}

export default ErrorMessage;
