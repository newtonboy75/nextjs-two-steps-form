import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Step1FormValues } from "@/app/types/formTypes";
import { SubmitHandler, UseFormRegister } from "react-hook-form";

export default function Step1Form({
  register,
  handleSubmit,
  onSubmit,
  errors,
  setStep1Value,
  step1Trigger,
  interestValue,
}: {
  register: UseFormRegister<Step1FormValues>;
  errors: any;
  handleSubmit: any;
  onSubmit: SubmitHandler<Step1FormValues>;

  setStep1Value: (field: keyof Step1FormValues, value: string) => void;
  step1Trigger: (field: keyof Step1FormValues) => void;
  interestValue: string;
}) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-bold my-2">
          Email
        </label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email",
            },
          })}
          className="w-full"
        />
        {errors.email && (
          <p className="text-red-600 block text-xs my-2">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* First Name Input */}
      <div>
        <label htmlFor="firstName" className="block text-sm font-bold my-2">
          First Name
        </label>
        <Input
          type="text"
          id="firstName"
          placeholder="First Name"
          {...register("firstName", { required: "First name is required" })}
          className="w-full"
        />
        {errors.firstName && (
          <p className="text-red-600 block text-xs my-2">
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name Input */}
      <div>
        <label htmlFor="firstName" className="block text-sm font-bold my-2">
          Last Name
        </label>
        <Input
          type="text"
          id="lastName"
          placeholder="Last Name"
          {...register("lastName", { required: "Last name is required" })}
          className="w-full"
        />
        {errors.lastName && (
          <p className="text-red-600 block text-xs my-2">
            {errors.lastName.message}
          </p>
        )}
      </div>

      {/* Interest Select */}
      <div>
        <label htmlFor="interest" className="block text-sm font-bold my-2">
          Interest
        </label>
        <Select
          onValueChange={(value) => {
            setStep1Value("interest", value);
            step1Trigger("interest");
          }}
          defaultValue={interestValue}
          {...register("interest", { required: "Please select an interest" })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Interest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Cars">Cars</SelectItem>
            <SelectItem value="Music">Music</SelectItem>
            <SelectItem value="Sport">Sport</SelectItem>
          </SelectContent>
        </Select>
        {errors.interest && (
          <p className="text-red-600 text-xs my-2">{errors.interest.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Next
      </Button>
    </form>
  );
}
