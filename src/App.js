import React from "react";
import Products from "./components/Products.jsx";
import ContactForm from "./components/ContactForm.jsx";
import OrderReview from "./components/OrderReview.jsx";
import Completed from "./components/Completed.jsx";
import styles from "./App.module.scss";
import { useSelector } from "react-redux";

const App = () => {
  const { step } = useSelector((state) => state);

  const onClickNext = () => {
    switch (step.value) {
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
