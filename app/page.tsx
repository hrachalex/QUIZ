'use client'
import { useState, useEffect } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const quizData: Question[] = [
  {
    question: "What is Node.js primarily used for?",
    options: [
      "A. Desktop applications",
      "B. Data analysis",
      "C. Backend server applications",
      "D. Video editing",
    ],
    answer: "C. Backend server applications",
  },
  {
    question: "Which module in Node.js is used to work with the file system?",
    options: ["A. http", "B. fs", "C. path", "D. url"],
    answer: "B. fs",
  },
  {
    question: "Which command installs a package globally in Node.js?",
    options: [
      "A. npm install <package>",
      "B. npm install -g <package>",
      "C. npm init <package>",
      "D. npm run <package>",
    ],
    answer: "B. npm install -g <package>",
  },
  {
    question: "Which of these is the default port for running a Node.js application?",
    options: ["A. 8080", "B. 3000", "C. 80", "D. 5000"],
    answer: "B. 3000",
  },
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Total time for the quiz in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowScore(true); // End quiz when time runs out
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer); // Clean up the timer
  }, [timeLeft]);

  const handleAnswerOptionClick = (selectedOption: string) => {
    setUserAnswers([...userAnswers, selectedOption]);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const getAnswerResult = (userAnswer: string, correctAnswer: string) => {
    return userAnswer === correctAnswer ? "Correct" : "Wrong";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-800 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800">Quiz App</h1>
        {showScore ? (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 text-center">
              Quiz Results
            </h2>
            <ul className="mt-6 space-y-4">
              {quizData.map((question, index) => (
                <li
                  key={index}
                  className="p-4 border rounded-lg shadow-sm bg-gray-100"
                >
                  <h3 className="font-medium text-gray-800">{question.question}</h3>
                  <p
                    className={`mt-2 font-semibold ${
                      getAnswerResult(userAnswers[index] || "No Answer", question.answer) ===
                      "Correct"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Your Answer: {userAnswers[index] || "No Answer"} -{" "}
                    {getAnswerResult(userAnswers[index] || "No Answer", question.answer)}
                  </p>
                  <p className="text-gray-600">Correct Answer: {question.answer}</p>
                </li>
              ))}
            </ul>
            <div className="text-center mt-6">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => {
                  setCurrentQuestion(0);
                  setUserAnswers([]);
                  setShowScore(false);
                  setTimeLeft(60); // Reset timer
                }}
              >
                Restart Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              {quizData[currentQuestion].question}
            </h3>
            <div className="grid gap-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(option)}
                  className="w-full py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300"
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Time Remaining: {Math.floor(timeLeft / 60)}:
                {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
