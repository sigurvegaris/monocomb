import Close from "@/components/Close";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Nav from "@/components/Nav";
import Paths from "@/components/Paths";
import Receipts from "@/components/Receipts";
import Strands from "@/components/Strands";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <HowItWorks />
      <Paths />
      <Strands />
      <Receipts />
      <Close />
      <footer className="wrap">© Monocomb. Web design, development and automation.</footer>
    </>
  );
}
