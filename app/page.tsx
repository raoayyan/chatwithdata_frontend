// import AboutSectionOne from "@/components/About/AboutSectionOne";
// import AboutSectionTwo from "@/components/About/AboutSectionTwo";

import ScrollUp from "@/components/Common/ScrollUp";
// import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import Video from "@/components/Video";
// import { Inter } from "next/font";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Footer />

      {/* <AboutSectionOne />
      <AboutSectionTwo /> */}

      {/* <Contact /> */}
    </>
  );
}
