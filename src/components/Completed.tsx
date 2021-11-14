import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useNavigation from "../hooks/useNavigation";
import Card from "./styles/CardUi/Card";
import { resetValues } from "../features/orderSlice";
import { useAppSelector } from "../app/hooks";
import httpService from "../httpService/httpService";

const Completed = () => {
  const { selectStep } = useNavigation();
  const dispatch = useDispatch();
  const { order } = useAppSelector((state) => state);
  const { makePost } = httpService();

  useEffect(() => {
    makePost(
      "https://run.mocky.io/v3/240a6dfa-24d9-41b7-b224-ae870ddfbc95",
      order
    ).then((res) => console.log(res.data));
  }, [order]);

  const handleClick = () => {
    dispatch(resetValues());
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
