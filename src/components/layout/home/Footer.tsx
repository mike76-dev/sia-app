import GithubIcon from "@/components/icons/github";
import TwitterIcon from "@/components/icons/twitter";
import DiscordIcon from "@/components/icons/discord";

import builtWithSia from "@/assets/built-with-sia.png";

export default function Footer() {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-[#0D0D13] py-2.5">
      <div className="flex flex-col items-center gap-3">
        <a href="">
          <img src={builtWithSia} alt="Built with Sia" />
        </a>
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
        <div className="flex items-center gap-6">
          <a href="">About</a>
          <a href="">Privacy</a>
          <a href="">Terms of Service</a>
          <a href="">Fees</a>
          <a href="">Help</a>
          <a href="">
            <span className="text-primary">Sia Satellite</span> Source Code
          </a>
          <a href="" className="text-primary">
            Contact @SiaSatellite.app
          </a>
        </div>
      </div>
    </div>
  );
}
