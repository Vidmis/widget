import React, { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";
import styles from "./Card.module.scss";
import buttonStyles from "../../styles/Button.module.scss";

interface CardProps extends ComponentPropsWithRef<"div"> {}

const Card: React.FC<CardProps> = ({ children, className = "", ...rest }) => {
  return (
    <>
      <div className={`${styles.card} ${className}`} {...rest}>
        {children}
      </div>
    </>
  );
};

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "submit",
  className = "",
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`${buttonStyles.button} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Card;
