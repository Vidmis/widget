import React from "react";

const OrderReview = ({setStep}) => {
  return (
    <div>
      <h2>Order Review</h2>
      <button onClick={() => setStep(4)}>Next</button>
    </div>
  );
};

export default OrderReview;
