"use client"
import { motion, useMotionValue, MotionValue } from "framer-motion";
import { GoogleGeminiEffect } from "./ui/Google";


function HeroSection() {
  // Create motion values for pathLengths
  const pathLengths: MotionValue<number>[] = [
    useMotionValue(1),
    useMotionValue(2),
    useMotionValue(3),
  ];
  

  return (
    <div className="mt-20">
      <GoogleGeminiEffect pathLengths={pathLengths} title="Empowering the Future with AI "
      description="Harness the power of AI to revolutionize 
      the way you work, learn, and create. Our cutting-edge solutions leverage machine learning" className="text-4xl " />
    </div>
  );
}

export default HeroSection;
