import React, { useEffect, useState } from "react";
import Products from "./components/Products.jsx";
import ContactForm from "./components/ContactForm.jsx";
import OrderReview from "./components/OrderReview.jsx";
import Completed from "./components/Completed.jsx";

import styles from "./App.module.scss";

const App = () => {
  const [step, setStep] = useState(1);
  const [component, setComponent] = useState(<Products setStep={setStep} />);

  useEffect(() => {
    switch (step) {
      case 1:
        setComponent(<Products setStep={setStep} />);
        break;
      case 2:
        setComponent(<ContactForm setStep={setStep} />);
        break;
      case 3:
        setComponent(<OrderReview setStep={setStep} />);
        break;
      case 4:
        setComponent(<Completed setStep={setStep} />);
        break;
    }
  }, [step]);

  return (
    <>
      <div className={styles.app_wrapper}>
        <h1>Shopping Widget</h1>
        {component}
      </div>
    </>
  );
};

export default App;
