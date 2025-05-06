import HomeHeader from "@/components/layout/home/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Footer from "@/components/layout/home/Footer";

export default function Home() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen">
            <HomeHeader />
            <Hero />
            <Features />
            <Footer />
        </div>
    )
}