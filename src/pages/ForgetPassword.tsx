import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  forgotPassword,
  resendResetLink,
  verifyResetToken,
  changePassword,
} from "@/store/actions/authAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import forgetBackground from "@/assets/forget.png";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resetPasswordSchema } from "@/lib/schemas/AuthSchema";
import { Form, FormField } from "@/components/ui/form";
export default function ForgetPassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [email, setEmail] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
      dispatch(verifyResetToken({ token: urlToken }))
        .unwrap()
        .then(() => {
          toast.success("Token verified. Please set a new password.", {
            id: "token-verified",
          });
        })
        .catch(() => {
          toast.error("Invalid or expired token.", { id: "token-verified" });
          navigate("/error");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(forgotPassword({ email: email! }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          setSuccess(true);
          toast.success("Reset link sent to your email");
          setIsLoading(false);
        }
        setIsLoading(false);
        toast.error(res.message);
      });
  };

  const handleResendLink = () => {
    setIsLoading(true);
    dispatch(resendResetLink({ email: email! }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success("Reset link resent to your email");
          setIsLoading(false);
        }
        setIsLoading(false);
        toast.error(res.message);
      });
  };

  const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(changePassword({ password: form.getValues("password") }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success("Password changed successfully. Please log in.");
          navigate("/auth/login");
        }
        toast.error(res.message);
      })
      .catch(() => toast.error("Failed to change password."))
      .finally(() => setIsLoading(false));
  };

  const handleBack = () => {
    if (success) {
      setSuccess(false);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-row w-full items-center h-screen">
      <div className="w-2/3 flex flex-col items-center justify-center">
        <img src={forgetBackground} alt="Sia Authentication" />
      </div>
      <div className="w-1/3 bg-[#27282D] h-full">
        <div className="flex flex-col items-center justify-center h-full relative">
          <div className="absolute top-4 left-4 z-10">
            <Button
              variant={"outline"}
              className="w-fit h-fit bg-transparent text-primary text-sm font-medium hover:bg-transparent border-none hover:text-primary/80"
              onClick={handleBack}
              size={"icon"}
            >
              <ArrowLeftIcon className="w-6 h-6" />
              Back
            </Button>
          </div>

          {token ? (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-primary">
                Set New Password
              </h2>
              <Form {...form}>
                <form
                  onSubmit={handlePasswordReset}
                  className="w-full mt-12 flex flex-col items-center gap-4"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <Input
                        type="password"
                        placeholder="New Password"
                        className="bg-[#1E2024] h-14 text-foreground border-none"
                        {...field}
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <Input
                        type="password"
                        placeholder="Confirm New Password"
                        className="bg-[#1E2024] h-14 text-foreground border-none"
                        {...field}
                      />
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full h-14 text-base font-semibold mt-8"
                    disabled={isLoading}
                  >
                    Change Password
                  </Button>
                </form>
              </Form>
            </div>
          ) : !success ? (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-primary">
                Forgot Password
              </h2>
              <p className="text-2xl text-foreground mt-12">
                Enter registered email address
              </p>
              <form
                onSubmit={handleEmailSubmit}
                className="w-full mt-12 flex flex-col items-center"
              >
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-[#1E2024] h-14 text-foreground border-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  className="w-full h-14 text-base font-semibold mt-8"
                  disabled={isLoading}
                >
                  Reset Password
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-3xl font-bold text-primary">Link Sent to</h2>
              <p className="text-2xl text-foreground mt-12">{email}</p>
              <p className="text-sm text-foreground mt-4">
                Check your email for the reset link. If you don't see it, please
                check your spam folder.
              </p>
              <Button
                type="button"
                className="w-fit h-fit mt-4 bg-transparent text-primary text-sm font-medium hover:bg-transparent border-none hover:text-primary/80"
                size={"icon"}
                onClick={handleResendLink}
                disabled={isLoading}
              >
                Resend Link
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
