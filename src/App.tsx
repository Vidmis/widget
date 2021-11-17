import React from "react";
import Products from "./components/Products";
import ContactForm from "./components/ContactForm";
import OrderReview from "./components/OrderReview";
import Completed from "./components/Completed";
import styles from "./App.module.scss";
import { useAppSelector } from "./app/hooks";
import { useTranslation } from "react-i18next";

const App = () => {
  const { t, i18n } = useTranslation();
  const step = useAppSelector((state) => state.step.value);

  const handleLangSelect = (lang) => {
    i18n.changeLanguage(lang);
  };

  const onRenderStep = () => {
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
        <h1>{t("header.main_header")}</h1>
        <button onClick={() => handleLangSelect("en")}>English</button>
        <button onClick={() => handleLangSelect("lt")}>Lietuvių</button>
        {onRenderStep()}
      </div>
    </>
  );
};

export default App;
