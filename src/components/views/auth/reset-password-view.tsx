import React from "react";

const ResetPasswordView = ({
  setSuccess,
}: {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log(setSuccess);
  return <div>ResetPasswordView</div>;
};

export default ResetPasswordView;
