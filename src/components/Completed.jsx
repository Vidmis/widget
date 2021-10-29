import React from "react";
import { CardStyle } from "./styles/Card.style.js";

const Completed = ({ setStep }) => {
  const handleClick = () => {
    setStep(1);
    window.location.reload();
  };

  return (
    <CardStyle>
      <div>
        <h2>Order Completed!</h2>
        <button onClick={handleClick}>Select new product(s)</button>
      </div>
    </CardStyle>
  );
};

export default Completed;
