import React from "react";
import { useDispatch } from "react-redux";
import useNavigation from "../hooks/useNavigation";
import Card from "./styles/CardUi/Card";
import { resetValues } from "../features/orderSlice";

const Completed = () => {
  const { selectStep } = useNavigation();
  const dispatch = useDispatch();
  
  const handleClick = () => {
    dispatch(resetValues())
    selectStep(0);
  };

  return (
    <Card>
      <div>
        <h2>Order Completed!</h2>
        <button type='button' onClick={handleClick}>
          Select new product(s)
        </button>
      </div>
    </Card>
  );
};

export default Completed;
