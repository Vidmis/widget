import React from "react";
import styles from "./Card.module.scss";
import useNavigation from "../../../hooks/useNavigation";

const Card = ({ children }) => {
  const {step} = useNavigation(4);

  return (
    <div className={styles.card}>
      {children}{" "}
      <button onClick={() => console.log("this is a step ", step)}>
        Card Next
      </button>
    </div>)
};

export default Card;
