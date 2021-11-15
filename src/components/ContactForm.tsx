import React, { useReducer, useRef } from "react";
import { useDispatch } from "react-redux";
import { addContacts } from "../features/orderSlice";
import useNavigation from "../hooks/useNavigation";
import Card from "./styles/CardUi/Card";

const reducer = (state, action) => {
  switch(action.type) {
    case "HANDLE_INPUT": 
        return {
            ...state,
            [action.field]: action.payload,
        };
    default:
        return state;
}
}



const ContactForm = () => {
  // const dispatch = useDispatch();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const { onNextStep, onPrevStep } = useNavigation();
  

 
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
      onNextStep();
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
          />
        </div>

        <div>
          <input
            type='text'
            placeholder='Enter last name'
            ref={lastNameRef}
            autoComplete='family-name'
          />
        </div>

        <div>
          <input
            type='email'
            placeholder='Enter email'
            ref={emailRef}
            autoComplete='email'
          />
        </div>

        <button type='button' onClick={onPrevStep}>
          Back
        </button>
        <button type='submit'>Next</button>
      </form>
    </Card>
  );
};

export default ContactForm;
