import React from "react";

const ContactForm = ({setStep}) => {
  return (
    <div>
      <h2>Contact Form</h2>
        <button onClick={() => setStep(3)}>Next</button>
    </div>
  );
};

export default ContactForm;
