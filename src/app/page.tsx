"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useTwoStepsForm } from "./hooks/useTwoStepsForm";
import { useState } from "react";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);

  const {
    step,
    step1Form,
    step2Form,
    step1Data,
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
    step1Form; //Step 1
  const { register: registerStep2, handleSubmit: handleSubmitStep2 } =
    step2Form; // Step 2

  const handleCheckChanged = (checked: boolean) => {
    setIsChecked(checked);
    setStep2Value("termsAccepted", checked, { shouldValidate: true }); // Setting termsAccepted boolean value manually due to shadcn not setting value
  };

  return (
    <>
      <h1 className="mt-10 font-bold text-3xl w-full text-center">
        Two-Steps Form
      </h1>
      <div className="max-w-lg mx-auto py-8 px-8">
        {step === 1 && (
          <form
            onSubmit={handleSubmitStep1(onSubmitStep1)}
            className="space-y-4"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-bold my-2">
                Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                {...registerStep1("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email",
                  },
                })}
                className="w-full"
              />
              {step1Errors.email && (
                <p className="text-red-600 block text-xs my-2">
                  {step1Errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-bold my-2"
              >
                First Name
              </label>
              <Input
                type="text"
                id="firstName"
                placeholder="First Name"
                {...registerStep1("firstName", {
                  required: "First name is required",
                })}
                className="w-full"
              />
              {step1Errors.firstName && (
                <p className="text-red-600 block text-xs my-2">
                  {step1Errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-bold my-2"
              >
                Last Name
              </label>
              <Input
                type="text"
                id="lastName"
                placeholder="Last Name"
                {...registerStep1("lastName", {
                  required: "Last name is required",
                })}
                className="w-full"
              />
              {step1Errors.lastName && (
                <p className="text-red-600 text-xs my-2">
                  {step1Errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-bold my-2"
                htmlFor="interest"
              >
                Interest
              </label>
              <Select
                onValueChange={(value) => {
                  setStep1Value("interest", value);
                  step1Trigger("interest");
                }}
                defaultValue={interestValue}
                {...registerStep1("interest", {
                  required: "Please select an interest",
                })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Interest" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="Cars">Cars</SelectItem>
                  <SelectItem value="Music">Music</SelectItem>
                  <SelectItem value="Sport">Sport</SelectItem>
                </SelectContent>
              </Select>
              {step1Errors.interest && (
                <p className="text-red-600 text-xs my-2">
                  {step1Errors.interest.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Next
            </Button>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={handleSubmitStep2(onSubmitStep2)}
            className="space-y-4"
          >
            <div className="flex items-center">
              <Checkbox
                {...registerStep2("termsAccepted", {
                  required: "You must accept terms and conditions",
                })}
                checked={isChecked} // Controlled component
                onCheckedChange={handleCheckChanged}
              />
              <label htmlFor="terms" className="ml-2 text-sm font-bold">
                I accept the terms and conditions
              </label>
            </div>
            {step2Errors.termsAccepted && (
              <p className="text-red-600 text-xs">
                {step2Errors.termsAccepted.message}
              </p>
            )}

            <div>
              <label className="block text-sm font-bold mt-8 mb-2">{getDropdownOptionsLabel()}</label>
              <Select
                onValueChange={(value) => {
                  setStep2Value("favoriteInterest", value);
                  step2Trigger("favoriteInterest");
                }}
                defaultValue=""
                {...registerStep2("favoriteInterest", {
                  required: `Please Select Favorite ${step1Data?.interest}`,
                })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={`Select Favorite ${step1Data?.interest}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {getDropdownOptions().map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {step2Errors.favoriteInterest && (
                <p className="text-red-600 text-xs my-2">
                  {step2Errors.favoriteInterest.message}
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                onClick={handleBack}
                variant={"secondary"}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
