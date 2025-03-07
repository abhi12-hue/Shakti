"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import QuizResult from "./quize-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <div className=" shadow-md rounded-lg p-6 mt-15 ">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl md:text-4xl font-bold
           text-white">
              Recent Quizzes
            </h2>
            <p className="text-gray-600">Review your past quiz performance</p>
          </div>
          <button
            onClick={() => router.push("/interview/mock")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Start New Quiz
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {assessments?.map((assessment, i) => (
            <div
              key={assessment.id}
              className="p-4 border rounded-lg cursor-pointer"
              onClick={() => setSelectedQuiz(assessment)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  Quiz {i + 1}
                </h3>
                <p className="text-gray-500 text-sm">
                  {format(new Date(assessment.createdAt), "MMMM dd, yyyy HH:mm")}
                </p>
              </div>
              <p className="text-gray-700 mt-2">Score: {assessment.quizScore.toFixed(1)}%</p>
              {assessment.improvementTip && (
                <p className="text-sm text-gray-500 mt-1">{assessment.improvementTip}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedQuiz && (
        <div className="  bg-[#15151a] fixed inset-0 flex items-center justify-center mt-14
">
          <div className=" rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center  ">
              <button
                onClick={() => setSelectedQuiz(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
            </div>

            <QuizResult
              result={selectedQuiz}
              hideStartNew
              onStartNew={() => router.push("/interview/mock")}
            />
          </div>
        </div>
      )}
    </>
  );
}
