"use client";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { Card } from "./ui/card";
import axios from "axios";
import { useEffect } from "react";
import { baseurl } from "@/app/config";
import Question_card from "./question_card";

export function QuizPreview() {
  const [question, setQuestion] = useState(null);
  const [index, setIndex] = useState(0);
  const fetchPbulicData = async () => {
    const { data } = await axios.get(
      `${baseurl}/userquestions/get-three-questions`
    );
    setQuestion(data);
  };

  useEffect(() => {
    fetchPbulicData();
  }, []);

  const [selected, setSelected] = useState(null);

  const options = [
    { id: 1, text: "Paris", isCorrect: true },
    { id: 2, text: "London", isCorrect: false },
    { id: 3, text: "Berlin", isCorrect: false },
    { id: 4, text: "Madrid", isCorrect: false },
  ];

  return (
    <Card className="p-2 md:p-6 bg-card shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 hover:border-cyan-500/30">
      {question !== null && index == 0 && (
        <Question_card myQuestion={question[index]} setIndex={setIndex} />
      )}
      {question !== null && index == 1 && (
        <Question_card myQuestion={question[index]} setIndex={setIndex} />
      )}
      {question !== null && index == 2 && (
        <Question_card myQuestion={question[index]} setIndex={setIndex} />
      )}

      {question === null && (
        <div className="bg-white p-4 blur-sm animate-pulse">
          <div className="flex justify-between">
            <div className="text">Question added by rafiqual islam</div>
            <div className="bg-gray-200 border w-10 h-10 rounded-full"></div>
          </div>
          <div className="flex gap-2">
            <h2>Bangladeshi bishay</h2>/ <h2>Our country</h2>
          </div>
          <div className="font-bold">What is the name of our country?</div>
          <h2 className="py-2 px-5 border bg-gray-300 rounded-md mb-2">(A) India</h2>
          <h2 className="py-2 px-5 border bg-gray-300 rounded-md mb-2">(B) Bangladesh</h2>
          <h2 className="py-2 px-5 border bg-gray-300 rounded-md mb-2">(C) Nepal</h2>
          <h2 className="py-2 px-5 border bg-gray-300 rounded-md">(D) Indonasia</h2>
        </div>
      )}
    </Card>
  );
}
