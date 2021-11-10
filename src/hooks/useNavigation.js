import { useDispatch } from "react-redux";
import { nextStep, prevStep, firstStep, chooseStep } from "../features/stepSlice";

const useNavigation = () => {
  const dispatch = useDispatch();

  const onNextStep = () => {
    dispatch(nextStep());
  };

  const onPrevStep = () => {
    dispatch(prevStep());
  };

  const selectStep = (stepIndex) => {
    dispatch(chooseStep(stepIndex))
  }

  return { onNextStep, onPrevStep, selectStep };
};

export default useNavigation;
