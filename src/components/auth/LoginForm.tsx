import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Assets
import sialogo from "@/assets/sia-logo.png";

// Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
// Store
import { loginUser } from "@/store/actions/authAction";

// Schemas
import { loginSchema } from "@/lib/schemas/AuthSchema";

// Toast
import { toast } from "sonner";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success("Login successful");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2 relative w-full">
        <div className="flex flex-row items-center">
          <div>
            <img src={sialogo} alt="Sia Logo" />
          </div>
          <h2 className="text-primary font-semibold text-4xl">SIA Satelite</h2>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-primary rounded-full"></div>
      </div>
      <div className="flex flex-col items-center gap-6 mt-20 w-full max-w-[464px] relative">
        <h3 className="text-3xl font-semibold">Log in</h3>
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
                  <FormLabel className="text-2xl font-medium">Email</FormLabel>
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
            <a
              href="/forgot-password"
              className="text-primary hover:text-primary/80 w-full text-left"
            >
              <p>Forgot password?</p>
            </a>
            <Button
              className="w-full h-14 text-base font-semibold"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </Form>
        <div className="h-[2px] bg-primary rounded-full w-full"></div>
        <div className="flex flex-row items-center gap-2 text-xl font-medium justify-center">
          <p className="text-foreground/50">Don&apos;t you have an account?</p>
          <a
            href="/auth/register"
            className="text-primary hover:text-primary/80"
          >
            Register
          </a>
        </div>
      </div>
    </>
  );
}
