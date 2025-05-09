import { useNavigate } from "react-router-dom";

// Components
import { Button } from "@/components/ui/button";

// Assets
import BrainIcon from "@/components/icons/brain";
import DataTableIcon from "@/components/icons/data-table";
import FileIcon from "@/components/icons/file";
import InnovationIcon from "@/components/icons/innovation";
import StorageIcon from "@/components/icons/storage";
import dashboardsample from "@/assets/dashboard-sample.png";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col items-center justify-center w-full gap-3 h-screen">
      <h1 className="font-bold text-7xl">
        <span className="flex flex-row items-center justify-center">
          <BrainIcon />
          Scalable
          <FileIcon className="mx-2" />
          <span className="text-primary">Decentralized&nbsp;</span>
          Cloud
        </span>
        <span className="flex flex-row items-center justify-center">
          <StorageIcon className="mr-2" />
          <span className="text-[#00B0FF]">Storage</span>
          <DataTableIcon className="mr-2" />
          for
          <InnovationIcon className="mx-2" />
          Any Need
        </span>
      </h1>

      <p className="text-center text-3xl max-w-[1130px]">
        Empowering data-intensive workloads with decentralized storage that’s
        secure, scalable, and verifiable — from AI models to Web3 ecosystems.
      </p>

      <div className="flex flex-row items-center justify-center gap-6 mt-10">
        <Button
          variant="outline"
          className="h-14 border-primary hover:bg-primary hover:text-black px-8 font-semibold text-xl text-primary"
        >
          Learn More
        </Button>
        <Button
          className="h-14 px-8 font-semibold text-xl"
          onClick={() => navigate("/auth/login")}
        >
          Launch App
        </Button>
      </div>
      <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full">
        <img src={dashboardsample} alt="sia-dashboard" />
      </div>
    </div>
  );
}
