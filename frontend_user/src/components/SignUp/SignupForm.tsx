import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import FormStepper from "./FormStepper";
import { toast } from "@/hooks/use-toast";
import { signup } from "../../api";

const STEPS = ["Personal Info", "Contact", "Identity", "Security"] as const;
const NATIONALITIES = ["Ethiopian", "American", "Australian", "British", "Canadian", "Chinese", "French", "German", "Indian", "Italian", "Japanese", "Mexican", "Spanish", "Other"] as const;

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  gender: z.string({
    required_error: "Please select your gender.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  nationality: z.string({
    required_error: "Please select your nationality.",
  }),
  dateOfBirth: z.date({
    required_error: "Please select your date of birth.",
  }),
  idType: z.string({
    required_error: "Please select an identification type.",
  }),
  idNumber: z.string().min(5, {
    message: "ID number must be at least 5 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const SignupForm: React.FC = () => {
  const navigate = useNavigate(); 
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      address: "",
      nationality: "",
      idType: "",
      idNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { control, handleSubmit, formState: { errors }, setValue, trigger, getValues } = form;

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      
      const apiData = {
        firstName: data.firstName,
        lastName: data.lastName,
        identificationType: data.idType,
        identificationNumber: data.idNumber,
        address: data.address,
        email: data.email,
        password: data.password,
        nationality: data.nationality,
        dateOfBirth: data.dateOfBirth.toISOString(),
        gender: data.gender,
        phone: data.phone,
        role: "user",
        picture: "https://example.com/default-avatar.jpg"
      };
  
      await signup(apiData);
    
      // Show success toast
      toast({
        title: "Account created!",
        description: "You have successfully created your account.",
      });
      
      // Navigate to login
      navigate('/login');
      
    } catch (error: any) {  // Explicitly type error as any to access message
      // Show error toast
      toast({
        title: "Signup Error",
        description: error?.response?.data?.message || 
                    error?.message || 
                    "An error occurred while creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    
    switch (step) {
      case 0:
        fieldsToValidate = ["firstName", "lastName", "gender", "dateOfBirth"];
        break;
      case 1:
        fieldsToValidate = ["email", "phone", "address", "nationality"];
        break;
      case 2:
        fieldsToValidate = ["idType", "idNumber"];
        break;
      case 3:
        fieldsToValidate = ["password", "confirmPassword"];
        break;
      default:
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      if (step === 3) {
        await onSubmit(getValues());
      } else {
        setStep((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="w-full animate-fade-in">
      <FormStepper steps={STEPS} currentStep={step} />
      
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          {...field}
                          className="rounded-xl shadow-form-input h-12"
                          data-testid="firstname-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          {...field}
                          className="rounded-xl shadow-form-input h-12"
                          data-testid="lastname-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      data-testid="gender-select"
                    >
                      <FormControl>
                        <SelectTrigger 
                          className="rounded-xl shadow-form-input h-12" 
                          data-testid="gender-trigger"
                          aria-invalid={!!form.formState.errors.gender}
                        >
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Male" data-testid="gender-male">Male</SelectItem>
                        <SelectItem value="Female" data-testid="gender-female">Female</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage data-testid="gender-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal rounded-xl shadow-form-input h-12",
                              !field.value && "text-muted-foreground",
                              form.formState.errors.dateOfBirth && "border-destructive"
                            )}
                            data-testid="date-trigger"
                            aria-invalid={!!form.formState.errors.dateOfBirth}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start" data-testid="date-picker">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          captionLayout="dropdown-buttons"
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      You must be at least 18 years old to register.
                    </FormDescription>
                    <FormMessage data-testid="dob-error" />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="john.doe@example.com"
                          type="email"
                          {...field}
                          className="rounded-xl shadow-form-input h-12"
                          data-testid="email-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1 234 567 8900"
                          type="tel"
                          {...field}
                          className="rounded-xl shadow-form-input h-12"
                          data-testid="phone-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your full address"
                        {...field}
                        className="rounded-xl shadow-form-input min-h-[100px]"
                        data-testid="address-textarea"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      data-testid="nationality-select"
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-xl shadow-form-input h-12" data-testid="nationality-trigger">
                          <SelectValue placeholder="Select your nationality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl max-h-[200px]">
                        {NATIONALITIES.map((nationality) => (
                          <SelectItem 
                            key={nationality} 
                            value={nationality}
                            data-testid={`nationality-${nationality.toLowerCase().replace(' ', '-')}`}
                          >
                            {nationality}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="idType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identification Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      data-testid="idtype-select"
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-xl shadow-form-input h-12" data-testid="idtype-trigger">
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Passport" data-testid="idtype-passport">Passport</SelectItem>
                        <SelectItem value="National ID" data-testid="idtype-national">National ID</SelectItem>
                        <SelectItem value="Driver License" data-testid="idtype-driver">Driver License</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identification Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your ID number"
                        {...field}
                        className="rounded-xl shadow-form-input h-12"
                        data-testid="idnumber-input"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the number exactly as it appears on your ID document.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 3 && (
            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Create a secure password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="rounded-xl shadow-form-input h-12 pr-10"
                          data-testid="password-input"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          data-testid="password-toggle"
                        >
                          {showPassword ? (
                            <EyeOff size={20} className="text-gray-400" />
                          ) : (
                            <Eye size={20} className="text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters and include uppercase, lowercase, 
                      number, and special character.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Confirm your password"
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                          className="rounded-xl shadow-form-input h-12 pr-10"
                          data-testid="confirm-password-input"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                          data-testid="confirm-password-toggle"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} className="text-gray-400" />
                          ) : (
                            <Eye size={20} className="text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex justify-between pt-4">
            {step > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="rounded-xl px-6"
                disabled={isLoading}
                data-testid="back-button"
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              type="button"
              onClick={nextStep}
              className="rounded-xl px-8 py-6 text-base font-medium"
              disabled={isLoading}
              data-testid="continue-button"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {step === 3 ? "Creating Account..." : "Continuing..."}
                </span>
              ) : (
                step === 3 ? "Create Account" : "Continue"
              )}
            </Button>
          </div>
        </form>
      </Form>
      
      <div className="text-center text-gray-600 text-sm">
        Already have an account?{' '}
        <Link 
          to="/Login" 
          className="text-primary hover:text-primary/80 font-medium"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;