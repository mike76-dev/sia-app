import { useState, useEffect } from "react";

// Components
import { Button } from "@/components/ui/button";

// Assets
import SiaLogo from "@/assets/sia-logo.png";
import DiscordIcon from "@/components/icons/discord";
import GithubIcon from "@/components/icons/github";
import TwitterIcon from "@/components/icons/twitter";

export default function HomeHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed w-screen bg-background z-50 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-sm shadow-sm top-0" : "top-7"}`}
    >
      <div className="flex items-center justify-between w-full p-2.5 max-w-[1660px] mx-auto">
        <div>
          <img src={SiaLogo} alt="Sia Logo" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6">
            <a href="">
              <DiscordIcon />
            </a>
            <a href="">
              <GithubIcon />
            </a>
            <a href="">
              <TwitterIcon />
            </a>
          </div>
          <Button
            variant={"outline"}
            className="h-14 border-primary hover:bg-primary hover:text-black px-8 font-medium text-xl text-primary"
            asChild
          >
            <a href="/auth/login">Get Started</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
