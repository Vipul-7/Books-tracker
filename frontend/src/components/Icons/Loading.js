import React from "react";
import loading from "./Book.gif";

const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
