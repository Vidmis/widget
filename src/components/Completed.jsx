import React from "react";

const Completed = ({setStep}) => {
    return (
        <div>
            <h2>Order Completed!</h2>
            <button onClick={() => setStep(1)}>Select new product(s)</button>
        </div>
    );
}
 
export default Completed;