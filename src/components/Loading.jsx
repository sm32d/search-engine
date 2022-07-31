import React from "react";
import { Hearts } from "react-loader-spinner";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <Hearts color="#B01E28" height={100} width={110} />
    </div>
  );
};
