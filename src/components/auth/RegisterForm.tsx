import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";

// Store
import { signupUser } from "@/store/actions/authAction";

// Assets
import sialogo from "@/assets/sia-logo.png";

// Schemas
import { signupSchema } from "@/lib/schemas/AuthSchema";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    console.log(data);
    dispatch(signupUser(data));
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
          <Button className="w-full h-14 text-base font-semibold" type="submit">
            Create account
          </Button>
          </form>
        </Form>
        <p className="text-base font-medium">
          By clicking the “Sign up” button, you are creating a Sia Satelite
          account and therefore you agree to Sia Satelite{" "}
          <span className="text-primary underline">Terms</span> of Use and{" "}
          <span className="text-primary underline">Policies</span>
        </p>
        <div className="h-[2px] bg-primary rounded-full w-full"></div>
        <div className="flex flex-row items-center gap-2 text-xl font-medium justify-center">
          <p className="text-foreground/50">Already have an account?</p>
          <a href="/auth/login" className="text-primary hover:text-primary/80">
            <p>Login</p>
          </a>
        </div>
      </div>
    </>
  );
}
