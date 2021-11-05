import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addContacts } from "../features/orderSlice";
import Card from "./styles/CardUi/Card";

const ContactForm = ({ setStep }) => {
  const dispatch = useDispatch();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstNameRef.current.value !== "" &&
      lastNameRef.current.value !== "" &&
      emailRef.current.value !== ""
    ) {
      dispatch(
        addContacts({
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
        })
      );
      setStep(3);
    }
  };

  const handleChange = (e) => {
    if (e.target.value) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className='contact-card'>
        <h3>Contact details</h3>
        <div>
          <input
            type='text'
            placeholder='Enter user name'
            ref={firstNameRef}
            autoComplete='given-name'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <input
            type='text'
            placeholder='Enter last name'
            ref={lastNameRef}
            autoComplete='family-name'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <input
            type='email'
            placeholder='Enter email'
            ref={emailRef}
            autoComplete='email'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button disabled={!isDisabled} type='submit'>
          Next
        </button>
      </form>
    </Card>
  );
};

export default ContactForm;
