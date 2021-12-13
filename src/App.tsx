import React, { useState } from "react";
import Products from "./components/products/Products";
import ContactForm from "./components/contactForm/ContactForm";
import OrderReview from "./components/orderReview/OrderReview";
import Completed from "./components/completed/Completed";
import styles from "./App.module.scss";
import { useAppSelector } from "./app/hooks";
import { useTranslation } from "react-i18next";

const App = () => {
  const { t, i18n } = useTranslation();
  const step = useAppSelector((state) => state.step.value);
  const [lngClr, setLngClr] = useState("eng");

  const handleLangSelect = (lang: string, id: string) => {
    i18n.changeLanguage(lang);
    setLngClr(id);
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
      <div className={styles.tr_buttons}>
        <button
          onClick={() => handleLangSelect("en", "eng")}
          className={`${lngClr.includes("eng") ? styles.lng_button_color : null}`}
        >
          English
        </button>
        <button
          onClick={() => handleLangSelect("lt", "ltu")}
          className={`${lngClr.includes("ltu") ? styles.lng_button_color : null}`}
        >
          Lietuvių
        </button>
      </div>
      <div className={styles.app_wrapper}>
        <h1>{t("header.main_header")}</h1>
        {onRenderStep()}
      </div>
    </>
  );
};

export default App;
