import React, { useEffect, useState } from "react";
import Products from "./components/Products.jsx";
import ContactForm from "./components/ContactForm.jsx";
import OrderReview from "./components/OrderReview.jsx";
import Completed from "./components/Completed.jsx";
import { GlobalStyle } from "./components/styles/GlobalStyle.style";
import { AppWrapper, Title } from "./components/styles/AppWrapper.style.js";

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
      <AppWrapper>
        <GlobalStyle />
        <Title>Shopping Widget</Title>
        {component}
      </AppWrapper>
    </>
  );
};

export default App;
