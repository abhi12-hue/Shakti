import HeroSection from "@/components/HeroSection";
import { HeroParallax } from "@/components/ui/Parrell";
import { Timeline } from "@/components/ui/timeLine";
import { HoverEffect } from "@/components/ui/hover";
import { AnimatedTestimonials } from "@/components/ui/test";
import { WobbleCard } from "@/components/ui/wobble";
import { BackgroundBeamsWithCollision } from "@/components/ui/type";
import { CodeBlock } from "@/components/ui/code";

export default function Home() {
  const products = [
    { title: "Next JS Course", link: "/product1", thumbnail: "https://tse4.mm.bing.net/th?id=OIP.SZnfjYW9pC_TuyQTrjcouAAAAA&pid=Api&P=0&h=220" },
    { title: "React JS Course", link: "/product2", thumbnail: "https://tse1.mm.bing.net/th?id=OIP.-X6et0ip7-Mhzf6tgt1QEgHaEK&pid=Api&P=0&h=220" },
    { title: "Node JS Course", link: "/product3", thumbnail: "https://tse2.mm.bing.net/th?id=OIP.TeYxSOro3ybMOS8ilWvpmAHaEK&pid=Api&P=0&h=220" },
    { title: "Machine Learning", link: "/product4", thumbnail: "https://tse2.mm.bing.net/th?id=OIP.wXlOEhGhXmXi2S0jBj-jygHaEK&pid=Api&P=0&h=220" },
  ];

  // what we provide

  interface Service {
    title: string;
    description: string;
    features: string[];
    benefits: string[];
  } 
  const services: Service[] = [
    {
      title: "Regular Industry Updates",
      description:
        "Stay informed with the latest trends, innovations, and updates in various industries, including tech, finance, and healthcare.",
      features: [
        "Weekly newsletter with top industry insights",
        "Market trend analysis and forecasts",
        "Expert opinions and case studies",
        "Emerging technologies and their impact",
      ],
      benefits: [
        "Stay ahead of industry trends",
        "Enhance career opportunities",
        "Better decision-making with insights",
      ],
    },
    {
      title: "ATS Checker",
      description:
        "Analyze and optimize your resume to ensure it passes through Applicant Tracking Systems (ATS) used by recruiters.",
      features: [
        "ATS-friendly resume formatting",
        "Keyword optimization based on job descriptions",
        "Scoring system for resume effectiveness",
        "Detailed improvement suggestions",
      ],
      benefits: [
        "Increase chances of getting shortlisted",
        "Avoid common ATS rejection issues",
        "Optimize resume based on industry standards",
      ],
    },
    {
      title: "Interview Preparation",
      description:
        "Get expert guidance, mock interviews, and practice questions to prepare for technical and behavioral interviews.",
      features: [
        "Mock interviews with industry experts",
        "Common interview questions and answers",
        "Soft skills and communication training",
        "Real-time feedback and improvement suggestions",
      ],
      benefits: [
        "Boost confidence in interviews",
        "Understand recruiter expectations",
        "Get tailored feedback for improvement",
      ],
    },
    {
      title: "AI Cover Letter Generator",
      description:
        "Generate personalized and professional cover letters using AI to enhance your job application process.",
      features: [
        "AI-powered tailored cover letters",
        "Industry-specific templates",
        "Customizable content based on job descriptions",
        "Grammar and formatting enhancements",
      ],
      benefits: [
        "Save time with automated writing",
        "Improve chances of getting noticed",
        "Professional and well-structured letters",
      ],
    },
  ];

  return (
    <div className="pt-20" >
      <div>
        <HeroSection />
      </div>
      <div className="mt-40 sm:mt-60 md:mt-80 lg:mt-96">

        <div className="mt-20 ">
          <HeroParallax products={products} />
        </div>
      </div>

      <div>
        <BackgroundBeamsWithCollision className="bg-[#09090B]">

          <div className="flex flex-col items-center justify-center h-screen bg-[#09090B] text-center px-4">
            {/* Heading */}
            <h1 className="text-white text-4xl sm:text-4xl font-bold leading-snug">
              Start your Success Journey in Tech
              <br className="mt-2" />
              <span className="text-blue-400">From here! Click below to get started.</span>
            </h1>

            {/* Pass the required props to CodeBlock */}
            <div className="mt-8">
              <CodeBlock
                language="javascript"
                filename="example.js"
                code={
                  `import { useState } from "react";
              export default function Counter() {
                const [count, setCount] = useState(0);
                return (
                <div>
                  <p>Count: {count}</p>
                  <button onClick={() => setCount(count + 1)}>Increment</button>
                </div>
              );
            }
          `} />
            </div>


            {/* Buttons Section */}
            <div className="flex items-center justify-center gap-10 mt-6">
              <button className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95">
                Explore Courses
                <span className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-10 rounded-lg"></span>
              </button>

              <button className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95">
                Check IDE Editor
                <span className="absolute top-0 left-0 w-full h-full bg-green-900 opacity-10 rounded-lg"></span>
              </button>
            </div>

          </div>


        </BackgroundBeamsWithCollision>
      </div>

      {/* what we offer */}
      <div className=" mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-[#09090B] min-h-screen">
  {services.map((data, i) => (
    <div
      key={i}
      className="bg-[#1A1A1D] shadow-lg rounded-lg p-6 border border-gray-700 text-white 
      hover:shadow-2xl hover:scale-105 transition-all duration-500 ease-in-out 
      transform hover:bg-[#222226] relative overflow-hidden"
    >
      {/* Animated Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2D2D31] to-transparent opacity-0 hover:opacity-20 transition-all duration-500"></div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-[#4FC3F7] mb-2 animate-fadeIn">
        {data.title}
      </h1>

      {/* Description */}
      <h2 className="text-lg text-gray-300 mb-4 animate-fadeIn delay-100">
        {data.description}
      </h2>

      {/* Features List */}
      <ul className="list-disc list-inside text-gray-400 animate-fadeIn delay-200">
        {data.features.map((feature, index) => (
          <li key={index} className="text-sm">{feature}</li>
        ))}
      </ul>
    </div>
  ))}
</div>



    </div>
  );
}
