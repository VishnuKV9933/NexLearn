"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { resetExam } from "@/lib/redux/slice/examSlice";
import Header from "@/components/Header/Header";
import { useRouter } from "next/navigation";
import Image from "next/image";
import cross from "@/public/assets/mcq/cross.svg";
import tick from "@/public/assets/mcq/tick.svg";
import question from "@/public/assets/mcq/question.svg";

export default function ResultPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const reduxResult = useAppSelector((state) => state.exam.lastResult);
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    if (reduxResult) {
      setResultData(reduxResult);
    } else {
      const savedResult = localStorage.getItem("last_result");
      if (savedResult) {
        setResultData(JSON.parse(savedResult));
      } else {
        router.push("/");
      }
    }
  }, [reduxResult, router]);

  if (!resultData) return null;

  const totalQuestions =
    resultData.correct + resultData.wrong + resultData.not_attended;
  const formatNum = (num: number) => String(num).padStart(3, "0");

  const handleDone = () => {
    localStorage.removeItem("last_result");
    dispatch(resetExam());
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F1F7FE] flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-[350px]">
          <div className="bg-[linear-gradient(307.95deg,#1C3141_2.54%,#177A9C_79.7%)] rounded-2xl p-5 text-center shadow-xl mb-5 border border-white/10">
            <p className="text-white/70  text-lg mb-2">Marks Obtained:</p>
            <h1 className="text-white text-4xl md:text-5xl  tracking-tight">
              {resultData.score} / {totalQuestions}
            </h1>
          </div>

          <div className="space-y-6 mb-12 px-2">
            <StatRow
              icon="bg-[#EAB308]"
              label="Total Questions:"
              image={question}
              value={formatNum(totalQuestions)}
            />
            <StatRow
              icon="bg-[#4CAF50]"
              label="Correct Answers:"
              image={tick}
              value={formatNum(resultData.correct)}
            />
            <StatRow
              icon="bg-[#F44336]"
              label="Incorrect Answers:"
              image={cross}
              value={formatNum(resultData.wrong)}
            />
            <StatRow
              icon="bg-[#6B7280]"
              label="Not Attended Questions:"
              image={question}
              value={formatNum(resultData.not_attended)}
            />
          </div>

          <button
            onClick={handleDone}
            className="w-full h-[50px] bg-[#1C3141] text-white py-1 rounded-xl font-bold 
            text-lg shadow-lg hover:bg-black transition-all active:scale-[0.95]"
          >
            Done
          </button>
        </div>
      </main>
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
  image,
}: {
  icon: string;
  label: string;
  value: string;
  image: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className={`w-8 h-8 ${icon} rounded flex items-center justify-center text-white shadow-sm`}
        >
          <Image src={image} alt="Icon" width={13} height={11} />
        </div>
        <span className="text-gray-600 font-semibold text-lg">{label}</span>
      </div>
      <span className="text-xl font-bold text-[#1C3141]">{value}</span>
    </div>
  );
}
