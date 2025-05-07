import { Input } from "../ui/input";
import { Label } from "../ui/label";
import sialogo from "@/assets/sia-logo.png";
import { Button } from "../ui/button";

export default function LoginForm() {
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
        <div className="flex flex-col items-center gap-3 w-full mt-6">
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-2xl font-medium">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-[#1E2024] h-14 text-foreground border-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-2xl font-medium">Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="bg-[#1E2024] h-14 text-foreground border-none"
            />
          </div>
          <a
            href="/forgot-password"
            className="text-primary hover:text-primary/80 w-full text-left"
          >
            <p>Forgot password?</p>
          </a>
        </div>
        <Button className="w-full h-14 text-base font-semibold">Log in</Button>
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
