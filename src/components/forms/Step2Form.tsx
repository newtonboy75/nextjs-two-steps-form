import { Step2FormValues } from "@/app/types/formTypes";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmitHandler, UseFormRegister } from "react-hook-form";

export default function Step2Form({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isChecked,
  handleCheckChanged,
  setStep2Value,
  step2Trigger,
  dropdownOptions,
  dropdownLabel,
  handleBack,
  isSubmitting,
}: {
  register: UseFormRegister<Step2FormValues>;
  handleSubmit: any;
  onSubmit: SubmitHandler<Step2FormValues>;
  errors: any;
  isChecked: boolean;
  handleCheckChanged: (checked: boolean) => void;
  setStep2Value: (field: keyof Step2FormValues, value: string) => void;
  step2Trigger: (field: keyof Step2FormValues) => void;
  dropdownOptions: string[] | null;
  dropdownLabel: string | null;
  handleBack: () => void;
  isSubmitting: boolean;
}) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Terms Checkbox */}
      <div className="flex items-center">
        <Checkbox {...register("termsAccepted", { required: "You must accept terms and conditions" })} checked={isChecked} onCheckedChange={handleCheckChanged} />
        <label htmlFor="terms" className="ml-2 text-sm font-bold">I accept the terms and conditions</label>
      </div>
      {errors.termsAccepted && <p className="text-red-600 text-xs">{errors.termsAccepted.message}</p>}

      {/* Favorite Interest Select */}
      <div>
        <label className="block text-sm font-bold mt-8 mb-2">{dropdownLabel}</label>
        <Select
          onValueChange={(value) => {
            setStep2Value("favoriteInterest", value);
            step2Trigger("favoriteInterest");
          }}
          defaultValue=""
          {...register("favoriteInterest", { required: `Please select ${dropdownLabel}` })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={`Select ${dropdownLabel?.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {dropdownOptions?.map((option, index) => (
              <SelectItem key={index} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.favoriteInterest && <p className="text-red-600 text-xs my-2">{errors.favoriteInterest.message}</p>}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button onClick={handleBack} variant="secondary" disabled={isSubmitting}>Back</Button>
        <Button type="submit" disabled={isSubmitting}>Submit</Button>
      </div>
    </form>
  );
}
