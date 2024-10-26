"use client";

import { useTwoStepsForm } from "./hooks/useTwoStepsForm";
import { useState } from "react";
import Step1Form from "@/components/forms/Step1Form";
import Step2Form from "@/components/forms/Step2Form";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);
  const {
    step,
    step1Form,
    step2Form,
    onSubmitStep1,
    onSubmitStep2,
    handleBack,
    getDropdownOptions,
    getDropdownOptionsLabel,
    setStep1Value,
    setStep2Value,
    step1Trigger,
    step2Trigger,
    step1Errors,
    step2Errors,
    interestValue,
    isSubmitting,
  } = useTwoStepsForm();

  const { register: registerStep1, handleSubmit: handleSubmitStep1 } =
    step1Form;
  const { register: registerStep2, handleSubmit: handleSubmitStep2 } =
    step2Form;

  const handleCheckChanged = (checked: boolean) => {
    setIsChecked(checked);
    setStep2Value("termsAccepted", checked, { shouldValidate: true });
  };

  return (
    <>
      <h1 className="mt-10 font-bold text-3xl w-full text-center">
        Two-Steps Form
      </h1>
      <div className="max-w-lg mx-auto py-8 px-8">
        {step === 1 && (
          <Step1Form
            register={registerStep1}
            handleSubmit={handleSubmitStep1}
            onSubmit={onSubmitStep1}
            errors={step1Errors}
            setStep1Value={setStep1Value}
            step1Trigger={step1Trigger}
            interestValue={interestValue}
          />
        )}

        {step === 2 && (
          <Step2Form
            register={registerStep2}
            handleSubmit={handleSubmitStep2}
            onSubmit={onSubmitStep2}
            errors={step2Errors}
            isChecked={isChecked}
            handleCheckChanged={handleCheckChanged}
            setStep2Value={setStep2Value}
            step2Trigger={step2Trigger}
            dropdownOptions={getDropdownOptions()}
            dropdownLabel={getDropdownOptionsLabel()}
            handleBack={handleBack}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </>
  );
}
