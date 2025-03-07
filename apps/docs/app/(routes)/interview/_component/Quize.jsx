"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import QuizResult from "../_component/quize-result";
import useFetch from "hooks/use-fetch";
import { BarLoader } from "react-spinners";
import {generateQuiz , saveQuizResult} from "../../../../action/interview"
export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const { loading: generatingQuiz, fn: generateQuizFn, data: quizData } = 
  useFetch(generateQuiz);
  const { loading: savingResult, fn: saveQuizResultFn, data: resultData, setData: setResultData } = 
  useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="border p-4 rounded-md shadow-md mt-5">
        <h2 className="text-lg font-semibold text-white">Ready to test your knowledge?</h2>
        <p className="text-gray-600 mt-2">This quiz contains 10 questions specific to your industry and skills.</p>
        <button onClick={generateQuizFn} className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Start Quiz</button>
      </div>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <div className="border p-4 rounded-md shadow-md mx-2 mt-9">
      <h2 className="text-lg font-bold text-white">Question {currentQuestion + 1} of {quizData.length}</h2>
      <p className="text-lg mt-4 text-white">{question.question}</p>
      <div className="mt-4 space-y-2">
        {question.options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2 text-white">
            <input 
              type="radio" 
              name="quiz-option" 
              value={option} 
              checked={answers[currentQuestion] === option} 
              onChange={() => handleAnswer(option)} 
              className="cursor-pointer"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      {showExplanation && (
        <div className="mt-4 p-4 bg-[#282829] rounded-md ">
          <p className="font-bold text-white ">Explanation:</p>
          <p className="text-gray-600 mt-3">{question.explanation}</p>
        </div>
      )}

      <div className="flex justify-between mt-4">
        {!showExplanation && (
          <button onClick={() => setShowExplanation(true)} className="px-4 py-2 
          border rounded-md text-white" disabled={!answers[currentQuestion]}>Show Explanation</button>
        )}
        <button 
          onClick={handleNext} 
          disabled={!answers[currentQuestion] || savingResult} 
          className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {savingResult ? "Saving..." : currentQuestion < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
        </button>
      </div>
    </div>
  );
}
