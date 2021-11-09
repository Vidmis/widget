import React from "react";
import styles from "./Card.module.scss";
import useNavigation from "../../../hooks/useNavigation";

const Card = ({ children }) => {
  const {onClickNext} = useNavigation();

  return (
    <div className={styles.card}>
      {children}{" "}
      <button onClick={() => onClickNext(1)}>
        Card Next
      </button>
    </div>)
};

export default Card;
