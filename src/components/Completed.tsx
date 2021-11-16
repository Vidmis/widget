import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useNavigation from "../hooks/useNavigation";
import Card from "./styles/CardUi/Card";
import { resetValues } from "../features/orderSlice";
import { useAppSelector } from "../app/hooks";
import httpService from "../httpService/httpService";
import { useTranslation } from "react-i18next";

const Completed = () => {
  const { selectStep } = useNavigation();
  const dispatch = useDispatch();
  const { order } = useAppSelector((state) => state);
  const { t } = useTranslation();

  useEffect(() => {
    httpService
      .post(
        "https://run.mocky.io/v3/240a6dfa-24d9-41b7-b224-ae870ddfbc95",
        order
      )
      .then((res) => console.log(res.data));
  }, [order]);

  const handleClick = () => {
    dispatch(resetValues());
    selectStep(0);
  };

  return (
    <Card>
      <div>
        <h2>{t("completed.header")}</h2>
        <button type='button' onClick={handleClick}>
          {t("button.select_new")}
        </button>
      </div>
    </Card>
  );
};

export default Completed;
