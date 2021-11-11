import { useAppDispatch } from './../app/hooks';
import { nextStep, prevStep, chooseStep } from "../features/stepSlice";

const useNavigation = () => {
  const dispatch = useAppDispatch();

  const onNextStep = () => {
    dispatch(nextStep());
  };

  const onPrevStep = () => {
    dispatch(prevStep());
  };

  const selectStep = (stepIndex: number) => {
    dispatch(chooseStep(stepIndex))
  }

  return { onNextStep, onPrevStep, selectStep };
};

export default useNavigation;
