import React from "react";
import Products from "./components/Products";
import ContactForm from "./components/ContactForm";
import OrderReview from "./components/OrderReview";
import Completed from "./components/Completed";
import styles from "./App.module.scss";
import { useAppSelector } from "./app/hooks";

const App = () => {
  const step = useAppSelector((state) => state.step.value);

  const onClickNext = () => {
    switch (step) {
      case 0:
        return <Products />;
      case 1:
        return <ContactForm />;
      case 2:
        return <OrderReview />;
      case 3:
        return <Completed />;
    }
  };

  return (
    <>
      <div className={styles.app_wrapper}>
        <h1>Shopping Widget</h1>
        {onClickNext()}
      </div>
    </>
  );
};

export default App;
