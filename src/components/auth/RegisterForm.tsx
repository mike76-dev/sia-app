import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

// Actions
import { signupUser, verifyOtp, resendOTP } from "@/store/actions/authAction";

// Assets
import sialogo from "@/assets/sia-logo.png";

// Schemas
import { signupSchema, otpSchema } from "@/lib/schemas/AuthSchema";

// Toast
import { toast } from "sonner";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState<boolean>(false);
  const { loading } = useAppSelector((state) => state.auth);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
      email: form.watch("email"),
    },
  });

  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    dispatch(signupUser(data))
      .unwrap()
      .then(() => {
        setSuccess(true);
        toast.success("OTP sent to your email");
      })
      .catch((err) => toast.error(err));
  };

  const onOtpSubmit = (data: z.infer<typeof otpSchema>) => {
    dispatch(verifyOtp({ code: data.otp, email: form.watch("email") }))
      .unwrap()
      .then(() => {
        toast.success("OTP verified");
        navigate("/dashboard");
      })
      .catch((err) => toast.error(err));
  };

  const handleOtpChange = (value: string) => {
    otpForm.setValue("otp", value, { shouldValidate: true });
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otpForm.getValues("otp");
    onOtpSubmit({ otp: otpValue, email: form.watch("email") });
  };

  const resendOtp = () => {
    dispatch(resendOTP({ email: form.watch("email") }))
      .unwrap()
      .then(() =>
        toast.success("OTP sent to your email " + form.watch("email")),
      )
      .catch((err) => toast.error(err));
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2 relative w-full">
        <div className="flex flex-row items-center">
          <img src={sialogo} alt="Sia Logo" />
          <h2 className="text-primary font-semibold text-4xl ml-2">
            SIA Satellite
          </h2>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-primary rounded-full"></div>
      </div>
      {!success ? (
        <div className="flex flex-col items-center gap-6 mt-20 w-full max-w-[464px] relative">
          <h3 className="text-3xl font-semibold">Create an account</h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-3 w-full mt-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 w-full">
                    <FormLabel className="text-2xl font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="bg-[#1E2024] h-14 text-foreground border-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 w-full">
                    <FormLabel className="text-2xl font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className="bg-[#1E2024] h-14 text-foreground border-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 w-full">
                    <FormLabel className="text-2xl font-medium">
                      Retype Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm your password"
                        className="bg-[#1E2024] h-14 text-foreground border-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="w-full h-14 text-base font-semibold"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </Form>
          <p className="text-base font-medium text-center">
            By clicking the "Sign up" button, you agree to SIA Satellite{" "}
            <span className="text-primary underline">Terms</span> of Use and{" "}
            <span className="text-primary underline">Policies</span>.
          </p>
          <div className="h-[2px] bg-primary rounded-full w-full"></div>
          <div className="flex flex-row items-center gap-2 text-xl font-medium justify-center">
            <p className="text-foreground/50">Already have an account?</p>
            <a
              href="/auth/login"
              className="text-primary hover:text-primary/80"
            >
              Login
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 mt-20 w-full max-w-[464px] relative">
          <h3 className="text-3xl font-semibold">Enter the OTP</h3>
          <p className="text-base font-medium text-center">
            Please check your email for the OTP code to verify your account.
          </p>
          <Form {...otpForm}>
            <form
              onSubmit={handleOtpSubmit}
              className="flex flex-col items-center gap-4 w-full"
            >
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={handleOtpChange}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className="bg-[#1E2024] h-14 w-14 text-foreground"
                          />
                          <InputOTPSlot
                            index={1}
                            className="bg-[#1E2024] h-14 w-14 text-foreground"
                          />
                          <InputOTPSlot
                            index={2}
                            className="bg-[#1E2024] h-14 w-14 text-foreground"
                          />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={3}
                            className="bg-[#1E2024] h-14 w-14 text-foreground"
                          />
                          <InputOTPSlot
                            index={4}
                            className="bg-[#1E2024] h-14 w-14 text-foreground"
                          />
                          <InputOTPSlot
                            index={5}
                            className="bg-[#1E2024] h-14 w-14 text-foreground"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-14 text-base font-semibold"
              >
                Submit
              </Button>
              <p className="text-base font-medium text-center">
                Didn't receive the OTP?{" "}
                <span
                  className="text-primary underline ml-1 cursor-pointer"
                  onClick={resendOtp}
                >
                  Resend
                </span>
              </p>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
