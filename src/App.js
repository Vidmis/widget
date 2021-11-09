import React, { useEffect, useState } from "react";
import Products from "./components/Products.jsx";
import ContactForm from "./components/ContactForm.jsx";
import OrderReview from "./components/OrderReview.jsx";
import Completed from "./components/Completed.jsx";
import styles from "./App.module.scss";
import useNavigation from "./hooks/useNavigation.js";

const App = () => {
  // const [step, setStep] = useState(1);
  // const [component, setComponent] = useState(<Products setStep={setStep} />);
  const { step } = useNavigation();

  useEffect(() => {
    console.log(step)
  }, [step])

  // useEffect(() => {
  //   switch (step) {
  //     case 1:
  //       setComponent(<Products setStep={setStep} />);
  //       break;
  //     case 2:
  //       setComponent(<ContactForm setStep={setStep} />);
  //       break;
  //     case 3:
  //       setComponent(<OrderReview setStep={setStep} />);
  //       break;
  //     case 4:
  //       setComponent(<Completed setStep={setStep} />);
  //       break;
  //   }
  // }, [step]);

  return (
    <>
      <div className={styles.app_wrapper}>
        <h1>Shopping Widget</h1>
        {/* {component} */}
        {/* {navigationStep} */}
        <Products />
      </div>
    </>
  );
};

export default App;
