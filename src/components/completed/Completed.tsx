import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useNavigation from "../../hooks/useNavigation";
import Card, { Button } from "../styles/CardUi/Card";
import { resetValues } from "../../features/orderSlice";
import { useAppSelector } from "../../app/hooks";
import httpService from "../../httpService/httpService";
import { useTranslation } from "react-i18next";
import styles from "./Completed.module.scss";

const Completed = () => {
  const { selectStep } = useNavigation();
  const dispatch = useDispatch();
  const { order } = useAppSelector((state) => state);
  const { t } = useTranslation();

  useEffect(() => {
    const abortCont = new AbortController();

    httpService
      .post(
        "https://run.mocky.io/v3/240a6dfa-24d9-41b7-b224-ae870ddfbc95",
        order
      )
      .then((res) => console.log(res.data))
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        }
      });

    return () => abortCont.abort();
  }, [order]);

  const handleClick = () => {
    dispatch(resetValues());
    selectStep(0);
  };

  return (
    <Card className={styles.compl_card}>
      <div className={styles.completed_wrapper}>
        <h2>{t("completed.header")}</h2>
        <Button type='button' onClick={handleClick} className={styles.button}>
          {t("button.select_new")}
        </Button>
      </div>
    </Card>
  );
};

export default Completed;
