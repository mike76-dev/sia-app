import { useNavigate } from "react-router-dom";

// Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Assets
import ArrowIcon from "@/components/icons/arrow";
import CurrencyIcon from "@/components/icons/currency";
import DataIcon from "@/components/icons/data";
import Flexible from "@/components/icons/flexible";
import MaintenanceIcon from "@/components/icons/maintenance";
import PreserveIcon from "@/components/icons/preserve";
import PrivacyIcon from "@/components/icons/privacy";
import SecurityIcon from "@/components/icons/security";
import world from "@/assets/world.png";
import particle from "@/assets/particle.png";

export default function Features() {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col items-center justify-center w-full mt-96 overflow-hidden pb-52">
      <div>
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-5xl font-bold">
            <span className="text-primary">Sia-Satelite</span> Unique{" "}
            <span className="text-primary">Value</span> Proposition
          </h2>
          <p className="max-w-[1130px] text-center text-3xl">
            Sia Satellite allows renting decentralized storage even without
            owning crypto-currency. You can pay with your credit card and enjoy
            the benefits of using decentralized storage - privacy, reliability,
            and full control of your data.
          </p>
        </div>
        <div className="flex flex-col items-center gap-12 mt-[54px]">
          <div className="flex flex-row items-center justify-center gap-5">
            <Card className="w-100 h-100 border-2 border-[#A7A3FF] bg-[#27282D] text-foreground">
              <CardContent>
                <div className="flex flex-col items-center gap-3 px-7 mt-8">
                  <CurrencyIcon />
                  <h3 className="text-3xl font-semibold">No Crypto Currency</h3>
                  <p className="text-base">
                    No need to buy crypto currency: pay with credit card
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-100 h-100 border-2 border-[#FFB8B8] bg-[#27282D] text-foreground">
              <CardContent>
                <div className="flex flex-col items-center gap-3 px-7 mt-8">
                  <MaintenanceIcon />
                  <h3 className="text-3xl font-semibold">
                    Better Contract Maintenance{" "}
                  </h3>
                  <p className="text-base">
                    No need to have your renting software running 24/7: your
                    contracts are maintained even without you.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-100 h-100 border-2 border-[#00B0FF] bg-[#27282D] text-foreground">
              <CardContent>
                <div className="flex flex-col items-center gap-3 px-7 mt-8">
                  <DataIcon />
                  <h3 className="text-3xl font-semibold">Better Data Safety</h3>
                  <p className="text-base">
                    Your data will stay safe even if you go offline: the
                    Satellite will handle that for you.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-100 h-100 border-2 border-[#1ED660]/20 bg-[#27282D] text-foreground">
              <CardContent>
                <div className="flex flex-col items-center gap-3 px-7 mt-8">
                  <Flexible />
                  <h3 className="text-3xl font-semibold">Flexible Rates</h3>
                  <p className="text-base">
                    Pay as you go with the monthly invoicing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-row items-center justify-center gap-6">
            <Button
              variant={"outline"}
              className="h-14 border-primary hover:bg-primary hover:text-black px-8 font-semibold text-xl text-primary"
            >
              Read the Docs
            </Button>
            <Button
              className="h-14 px-8 font-semibold text-xl"
              onClick={() => navigate("/auth/login")}
            >
              Launch App
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <div className="flex flex-col items-center gap-3 relative w-fit mx-auto">
          <h2 className="text-5xl font-bold">
            <span className="text-primary">Decentralized &nbsp;</span>{" "}
            Storage,&nbsp;Simplified.
          </h2>
          <ArrowIcon className="absolute right-0 -bottom-5" />
        </div>
        <div className="flex flex-row items-center justify-center gap-5 mt-10">
          <Card className="w-100 h-100 border-2 border-[#1ED660]/20 bg-[#27282D] text-foreground">
            <CardContent>
              <div className="flex flex-col items-center gap-3 px-7 mt-8">
                <PrivacyIcon />
                <h3 className="text-3xl font-semibold">
                  Inherent Data Privacy
                </h3>
                <p className="text-base">
                  Your data is encrypted and split into multiple pieces before
                  uploading to the network.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-100 h-100 border-2 border-[#1ED660]/20 bg-[#27282D] text-foreground">
            <CardContent>
              <div className="flex flex-col items-center gap-3 px-7 mt-8">
                <PreserveIcon />
                <h3 className="text-3xl font-semibold">
                  Inherent Data Preservation
                </h3>
                <p className="text-base">
                  Your data is uploaded to multiple hosts in a redundant manner,
                  preventing it from getting lost.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-100 h-100 border-2 border-[#1ED660]/20 bg-[#27282D] text-foreground">
            <CardContent>
              <div className="flex flex-col items-center gap-3 px-7 mt-8">
                <SecurityIcon />
                <h3 className="text-3xl font-semibold">
                  Cryptographic Security
                </h3>
                <p className="text-base">
                  Your data is cryptographically secured by the Sia blockchain.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="border max-w-[1660px] mx-auto border-primary w-full bg-primary/10 mt-16 py-[78px] px-[59px] rounded-md flex flex-row items-center justify-between">
        <div>
          <img src={world} alt="Sia Satellite World" />
        </div>
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-6xl font-bold text-primary">
            Get Started Today!
          </h2>
          <p className="text-4xl">Start renting decentralized storage.</p>
          <div className="flex flex-row items-center justify-center gap-6 mt-5">
            <Button
              className="h-14 px-8 font-semibold text-xl"
              onClick={() => navigate("/auth/login")}
            >
              Launch App
            </Button>
            <Button
              variant={"outline"}
              className="h-14 border-primary bg-transparent hover:bg-primary hover:text-black px-8 font-semibold text-xl text-primary"
            >
              Read the Docs
            </Button>
          </div>
        </div>
        <div>
          <img src={world} alt="Sia Satellite World" />
        </div>
      </div>
      <div className="absolute -top-1/12 -right-[120px] -z-10">
        <img src={particle} alt="Sia Satellite World" />
      </div>
    </div>
  );
}
