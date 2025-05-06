import BrainIcon from "../icons/brain";
import DataTableIcon from "../icons/data-table";
import FileIcon from "../icons/file";
import InnovationIcon from "../icons/innovation";
import StorageIcon from "../icons/storage";
import dashboardsample from "@/assets/dashboard-sample.png"
import { Button } from "../ui/button";

export default function Hero () {
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
                Empowering data-intensive workloads with decentralized storage that’s secure, scalable, and verifiable — from AI models to Web3 ecosystems.
            </p>

            <div className="flex flex-row items-center justify-center gap-6 mt-10">
                <Button variant="outline" className="h-14 border-primary hover:bg-primary hover:text-black px-8 font-semibold text-xl text-primary">Learn More</Button>
                <Button className="h-14 px-8 font-semibold text-xl">Launch App</Button>
            </div>
            <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full">
                <img src={dashboardsample} alt="sia-dashboard" />
            </div>
        </div>
    )
}