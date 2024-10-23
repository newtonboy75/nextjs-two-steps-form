import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Step1FormValues, Step2FormValues } from "../types/formTypes";

export const useTwoStepsForm = () => {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1FormValues | null>(null);

  const step1Form = useForm<Step1FormValues>({ mode: "onChange" }); // Step 1 form
  const step2Form = useForm<Step2FormValues>({ mode: "onChange", defaultValues: { termsAccepted: false } }); // Step 2 form

  const {
    setValue: setStep1Value,
    watch: step1Watch,
    trigger: step1Trigger,
    formState: { errors: step1Errors },
  } = step1Form;

  const {
    setValue: setStep2Value,
    trigger: step2Trigger,
    formState: { errors: step2Errors, isSubmitting },
  } = step2Form;

  const interestValue = step1Watch("interest");

  const onSubmitStep1: SubmitHandler<Step1FormValues> = (data) => {
    console.log(data);
    setStep1Data(data);
    setStep(2);
  };

  const onSubmitStep2: SubmitHandler<Step2FormValues> = (data) => {
    console.log("Form Data:", [step1Data, data]);
    return new Promise((resolve) => setTimeout(resolve, 6000)); // Simulate real submission
  };

  const handleBack = () => {
    setStep(1);
  };

  const getDropdownOptions = () => {
    switch (interestValue) {
      case "Cars":
        return ["Convertible", "Sedan", "SUV", "Other"];
      case "Music":
        return ["Folk", "Jazz", "Punk", "Other"];
      case "Sport":
        return ["Baseball", "Basketball", "Football", "Ice Hockey", "Other"];
      default:
        return [];
    }
  };

  return {
    step,
    step1Form,
    step2Form,
    step1Data,
    step1Errors,
    step2Errors,
    interestValue,
    setStep1Value,
    setStep2Value,
    step1Trigger,
    step2Trigger,
    onSubmitStep1,
    onSubmitStep2,
    handleBack,
    getDropdownOptions,
    isSubmitting,
  };
};
