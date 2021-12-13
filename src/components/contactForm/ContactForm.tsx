import React, { useReducer } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addContacts } from "../../features/orderSlice";
import useNavigation from "../../hooks/useNavigation";
import Card, { Button } from "../styles/CardUi/Card";
import styles from "./ContactForm.module.scss";

interface Contacts {
  firstName: string;
  lastName: string;
  email: string;
}

const ContactForm = () => {
  const dispatch = useDispatch();
  const { onNextStep, onPrevStep } = useNavigation();
  const { t } = useTranslation();

  const initialValues: Contacts = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    initialValues
  );

  const { firstName, lastName, email } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName !== "" && lastName !== "" && email !== "") {
      dispatch(addContacts(formValues));
      onNextStep();
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className={styles.form_content}>
        <h3>{t("form.header")}</h3>
        <div className={styles.input_content}>
          <div>
            <input
              type='text'
              placeholder={t("form.placeholders.user_name")}
              name='firstName'
              value={firstName}
              autoComplete='given-name'
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type='text'
              placeholder={t("form.placeholders.last_name")}
              name='lastName'
              value={lastName}
              autoComplete='family-name'
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type='email'
              placeholder={t("form.placeholders.email")}
              name='email'
              value={email}
              autoComplete='email'
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <Button type='button' onClick={onPrevStep}>
            {t("button.back")}
          </Button>
          <Button>{t("button.next")}</Button>
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;
