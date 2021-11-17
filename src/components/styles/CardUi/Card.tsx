import React, { ComponentPropsWithRef, MouseEventHandler } from "react";
import styles from "./Card.module.scss";
import buttonStyles from "../../styles/Button.module.scss";

const Card = ({ children }) => {
  return (
    <>
      <div className={styles.card}>{children}</div>
    </>
  );
};

// interface ButtonProps {
//   onClick?: MouseEventHandler<HTMLButtonElement>
// }

interface ButtonProps extends ComponentPropsWithRef<"button"> {}

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
