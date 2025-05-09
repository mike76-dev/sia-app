/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Components
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/auth/LoginForm";

// Assets
import sialogo from "@/assets/sia-logo.png";
import EmailIcon from "@/components/icons/email";
import GoogleIcon from "@/components/icons/google";

// Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";

// Store
import { googleLogin } from "@/store/actions/authAction";

// Toast
import { toast } from "sonner";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"email" | null>(null);

  const handleGoogleButtonClick = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: (response: any) => {
          const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
          const credential = response.credential;
          dispatch(googleLogin({ clientId, credential }))
            .unwrap()
            .then((res) => {
              console.log(res);
              if (res.success) {
                navigate("/dashboard");
              } else {
                toast.error(res.message);
              }
            })
            .catch((err) => {
              console.error("Google login failed:", err);
              toast.error(err);
            });
        },
      });

      window.google.accounts.id.prompt();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      {mode !== null && (
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant={"outline"}
            className="w-fit h-fit bg-transparent text-primary text-sm font-medium hover:bg-transparent border-none hover:text-primary/80"
            onClick={() => setMode(null)}
            size={"icon"}
          >
            <ArrowLeftIcon className="w-6 h-6" />
            Back
          </Button>
        </div>
      )}
      {mode === null ? (
        <>
          <div className="flex flex-col items-center gap-2 relative">
            <div className="flex flex-row items-center">
              <div>
                <img src={sialogo} alt="Sia Logo" />
              </div>
              <h2 className="text-primary font-semibold text-4xl">
                SIA Satelite
              </h2>
            </div>
            <p className="text-2xl font-medium">
              Your gateway to decentralized cloud storage.
            </p>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-primary rounded-full"></div>
          </div>
          <div className="flex flex-col items-center gap-2 mt-28 w-full max-w-[464px] relative">
            <h3 className="text-3xl font-semibold">Login</h3>
            <div className="flex flex-col items-center gap-3 w-full mt-12">
              <Button
                variant={"secondary"}
                className="w-full h-14 bg-background text-foreground text-[20px] font-medium hover:bg-background/90"
                onClick={() => handleGoogleButtonClick()}
              >
                <GoogleIcon className="w-6 h-6" />
                <p>Continue with Google</p>
              </Button>
              <Button
                variant={"secondary"}
                className="w-full h-14 bg-background text-foreground text-[20px] font-medium hover:bg-background/90"
                onClick={() => setMode("email")}
              >
                <EmailIcon className="w-6 h-6" />
                <p>Continue with Email</p>
              </Button>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-primary rounded-full"></div>
              <span className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-sm text-foreground bg-[#27282D] px-4">
                Or
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 mt-28 w-full max-w-[464px] text-xl font-medium justify-center">
            <p className="text-foreground/50">Don't have an account?</p>
            <a
              href="/auth/register"
              className="text-primary hover:text-primary/80"
            >
              <p>Register</p>
            </a>
          </div>
          <a href="/" className="text-primary/50 hover:text-primary/80 mt-2">
            Back to Home
          </a>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
