import { useEffect, useState } from "react";

const useNavigation = (current) => {
  const [step, setStep] = useState(current);

//   const onClickNext = setStep((currentStep) => {
//     const nextStep = currentStep + 1;

//     if (nextStep > step) {
//       return currentStep;
//     }

//     return nextStep;
//   });
//   return {step};
    return {step}

};

export default useNavigation;
