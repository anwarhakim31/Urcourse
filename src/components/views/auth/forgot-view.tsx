import React from "react";

const ForgotView = ({
  setSuccess,
}: {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log(setSuccess);
  return <div>ForgotView</div>;
};

export default ForgotView;
