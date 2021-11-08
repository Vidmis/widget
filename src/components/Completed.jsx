import React from "react";
import Card from "./styles/CardUi/Card";

const Completed = ({ setStep }) => {
  const handleClick = () => {
    setStep(1);
    window.location.reload();
  };

  return (
    <Card>
      <div>
        <h2>Order Completed!</h2>
        <button onClick={handleClick}>Select new product(s)</button>
      </div>
    </Card>
  );
};

export default Completed;
