import React, { useEffect, useState } from "react";
import "./App.scss";
import Products from "./components/Products.jsx";
import ContactForm from "./components/ContactForm.jsx";
import OrderReview from "./components/OrderReview.jsx";
import Completed from "./components/Completed.jsx";

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
    <div className='App'>
      <h1 className="app_name">Widget App</h1>
      {component}
    </div>
  );
};

export default App;
