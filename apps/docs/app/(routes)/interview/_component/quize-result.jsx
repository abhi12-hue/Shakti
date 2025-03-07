"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";

export default function QuizResult({ result, hideStartNew = false, onStartNew }) {
  if (!result) return null;

  return (
    <div className="mx-auto p-6 bg-[#09090B] shadow-md rounded-lg">
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <div className="space-y-6 mt-4">
        {/* Score Overview */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">{result.quizScore.toFixed(1)}%</h3>
          <div className="w-full bg-gray-200 h-3 rounded-lg">
            <div
              className="h-3 bg-blue-600 rounded-lg"
              style={{ width: `${result.quizScore}%` }}
            ></div>
          </div>
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="text-gray-700 p-4 rounded-lg">
            <p className="font-medium">Improvement Tip:</p>
            <p className="text-white">{result.improvementTip}</p>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-4">
          <h3 className="font-medium text-white">Question Review</h3>
          {result.questions.map((q, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-white">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-gray-600">
                <p>Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
              </div>
              <div className="text-sm bg-gray-100 p-2 rounded">
                <p className="font-medium">Explanation:</p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!hideStartNew && (
        <div className="mt-6">
          <button
            onClick={onStartNew}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Start New Quiz
          </button>
        </div>
      )}
    </div>
  );
}
