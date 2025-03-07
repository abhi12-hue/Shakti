import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Quiz from "../_component/Quize";


export default function MockInterviewPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col mt-12">
        <Link href="/interview" className="flex items-center gap-2 text-blue-600 hover:underline">
          <ArrowLeft className="h-5 w-5 " />
          <span className="text-lg font-medium">Back to Interview Preparation</span>
        </Link>

        <div>
          <h1 className="text-5xl font-bold text-white mt-6">Mock Interview</h1>
          <p className="text-gray-600">
            Test your knowledge with industry-specific questions
          </p>
        </div>
      </div>

      <Quiz/>
    </div>
  );
}
