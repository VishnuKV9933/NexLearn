'use client'
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setInitialData, setCurrentIdx, selectOption, toggleMarkForReview, decrementTimer, setResult } from '@/lib/redux/slice/examSlice';
import Header from '@/components/Header/Header';
import SubmitModal from '@/components/Mcq/SubmitModal';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ParagraphModal from '@/components/Mcq/ParagraphModal';
import Image from "next/image";
import Paragraph from '@/public/assets/mcq/paragraph.svg'
import Timer from '@/public/assets/mcq/Timer.svg'
import { logout } from '@/lib/fetchClient';

export default function ExamInterface() {
  const dispatch = useAppDispatch();
  const { questions, currentIdx, userAnswers, statuses, timeLeft } = useAppSelector((state) => state.exam);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const currentQuestion = questions[currentIdx];

  const [isParagraphModalOpen, setIsParagraphModalOpen] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const answeredCount = Object.values(userAnswers).filter(val => val !== null).length;
  const markedCount = Object.values(statuses).filter(s => s === 'marked' || s === 'answered_marked').length;

  const handleFinalSubmit = async () => {
    if (isSubmitting) return; 
    setIsSubmitting(true);
    const answersArray = questions.map(q => ({
      question_id: q.question_id,
      selected_option_id: userAnswers[q.question_id] || null
    }));
    const formData = new FormData();
    formData.append('answers', JSON.stringify(answersArray));
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/answers/submit`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
        body: formData
      });
      const data = await res.json();

     if(!data.success && data.detail.message==="Invalid or expired token."){
          logout()
        }

      if (data.success) {
        dispatch(setResult(data));
        localStorage.setItem('last_result', JSON.stringify(data));
        toast.success("Exam submitted successfully!");
        router.push('/result');
      }
    } catch (error) {
      toast.error("Error submitting exam");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/question/list`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
        });
        const data = await response.json();
        if(!data.success && data.detail.message==="Invalid or expired token."){
          logout()
        }

        if (data.success) {
          dispatch(setInitialData(data));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [dispatch]);

 
  useEffect(() => {
    if (questions.length === 0) return;
    const timer = setInterval(() => dispatch(decrementTimer()), 1000);
    return () => clearInterval(timer);
  }, [questions.length, dispatch]);

  useEffect(() => {
    if (!loading && questions.length > 0 && timeLeft === 0 && !isSubmitting) {
      toast.error("Time is up! Submitting your exam automatically.", {
        duration: 5000,
        icon: '⏰',
      });
      handleFinalSubmit();
    }
  }, [timeLeft, loading, questions.length, isSubmitting]);

  const formatTime = (seconds: number) => {
     const m = Math.floor(seconds / 60);
    const s = seconds % 60;
     return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

   if (loading || !currentQuestion) return null;

   return (
    <div className="min-h-[620px] bg-[#F1F7FE] flex flex-col overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* <Header /> */}

      <div className="flex-1 flex flex-col lg:flex-row 
      px-8 py-4 gap-0 overflow-hidden">
        <SubmitModal
          isOpen={showSubmitModal}
           onClose={() => setShowSubmitModal(false)}
           onConfirm={handleFinalSubmit}
           loading={isSubmitting}
          stats={{ remainingTime: formatTime(timeLeft), totalQuestions:
             questions.length, answered: answeredCount, marked: markedCount }}
        />

         <ParagraphModal
           isOpen={isParagraphModalOpen}
             onClose={() => setIsParagraphModalOpen(false)}
           title="Comprehensive Paragraph"
          content={currentQuestion?.comprehension || ""}
        />

        {/* left section */}
        <div className="flex-[1.4] flex flex-col overflow-hidden lg:pr-8">
           <div className="flex justify-between items-center mb-4">
               <h2 className=" text-[#1C3141] text-[16px]">Ancient Indian History MCQ</h2>
              <span className="text-gray-600 font-bold bg-white px-3 py-0.5 rounded text-[11px] border border-gray-100 shadow-sm">
               {String(currentIdx + 1).padStart(2, '0')}/{questions.length}
            </span>
           </div>

          <div className="flex-1 overflow-y-auto no-scrollbar space-y-5 pr-1 pb-4">
             <div className="bg-white rounded-md border border-gray-100 p-6 shadow-sm">
               {currentQuestion.comprehension && (
                 <button
                   onClick={() => setIsParagraphModalOpen(true)}
                   className="bg-[#1C6D8C] text-white px-4 py-2
                    rounded-md text-[11px] flex items-center gap-2 mb-6"
                 >
                  <Image src={Paragraph} alt="Icon" width={15} height={13} />
                  Read Comprehensive Paragraph
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor"
                   viewBox="0 0 24 24" strokeWidth="4"><path strokeLinecap="round"
                    strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              )}

              <div className="text-[#1C3141] 
              text-[17px] leading-relaxed mb-6">
                {currentIdx + 1}. {currentQuestion.question}
              </div>

              {currentQuestion?.image && (
                <div className="relative w-full
                 max-w-2xl h-60 mb-6">
                  <Image
                    src={currentQuestion?.image}
                    alt="Question Graphic"
                    fill
                    priority 
                    className="object-contain object-left rounded-sm border-2 border-[#3B82F6] shadow-sm p-0.5"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-[12px] text-gray-500 ml-1 mb-2">Choose the answer:</p>
              {currentQuestion.options.map((opt: any, index: number) => {
                const label = String.fromCharCode(65 + index);
                const isSelected = userAnswers[currentQuestion.question_id] === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => dispatch(selectOption({ qId: currentQuestion.question_id, optId: opt.id }))}
                    className="group flex justify-between items-center px-5 py-4 bg-white border border-gray-100 rounded-md cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <span className="text-[16px] text-[#1C3141] ">
                      {label}. {opt.option}
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#1C3141]' : 'border-gray-300'}`}>
                      {isSelected && <div className="w-2.5 h-2.5 bg-[#1C3141] rounded-full" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 pt-4 pb-2 mt-auto">
            <button onClick={() => dispatch(toggleMarkForReview(currentQuestion.question_id))} className="flex-1 bg-[#800080] text-white py-4 rounded-md font-bold text-[11px] uppercase tracking-wider">Mark for review</button>
            <button disabled={currentIdx === 0} onClick={() => dispatch(setCurrentIdx(currentIdx - 1))} className="flex-1 bg-[#D1D1D1] text-[#1C3141] py-4 rounded-md font-bold text-[11px] uppercase tracking-wider disabled:opacity-50">Previous</button>
            <button onClick={() => currentIdx < questions.length - 1 ? dispatch(setCurrentIdx(currentIdx + 1)) : setShowSubmitModal(true)} className="flex-1 bg-[#1C3141] text-white py-4 rounded-md font-bold text-[11px] uppercase tracking-wider">{currentIdx === questions.length - 1 ? "Submit Test" : "Next"}</button>
          </div>
        </div>

        <div className="hidden lg:block w-[1.5px]
         bg-gray-200 self-stretch my-2"></div>

        <div className="w-full lg:w-[550px] 
        flex flex-col overflow-hidden pb-2 lg:pl-8">
           <div className="flex items-center justify-between mb-1 mt-1">
            <h3 className=" text-[13px] text-[#1C3141]">Question No. Sheet:</h3>
             <div className="flex items-center gap-3">
               <span className="text-[12px] text-[#1C3141] tracking-tight">Remaining Time:</span>
               <div className="flex items-center gap-2 bg-[#1C3141] text-white px-3 py-2 rounded-md font-mono text-sm shadow-sm leading-none">
                 <Image src={Timer} alt="Timer" width={15} height={13} />
                 {formatTime(timeLeft)}
               </div>
            </div>
           </div>

           <div className="flex-1 overflow-y-auto no-scrollbar pr-1">
            <div className="grid grid-cols-6 md:grid-cols-10 gap-2 p-1">
               {questions.map((q, idx) => {
                 const status = statuses[q.question_id];
                 let colorClasses = "bg-white text-gray-500 border-gray-200";
                 if (status === 'answered') colorClasses = "bg-[#4CAF50] text-white border-[#4CAF50]";
                  if (status === 'visited') colorClasses = "bg-[#F44336] text-white border-[#F44336]";
                 if (status === 'marked') colorClasses = "bg-[#800080] text-white border-[#800080]";
                 if (status === 'answered_marked') colorClasses = "bg-[#800080] text-white border-[#4CAF50] border-[3.5px]";

                return (
                  <button
                      key={q.question_id}
          onClick={() => dispatch(setCurrentIdx(idx))}
          className={`h-10 w-full rounded-md flex items-center justify-center text-[12px] font-bold border shadow-sm transition-all ${colorClasses} ${idx === currentIdx ? 'ring-2 ring-blue-400 ring-offset-1 z-10' : ''}`}
                            >
                     {idx + 1}
                  </button>
                 );
               })}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
             <div className="flex flex-wrap gap-x-5 gap-y-3">
               <ColourInfo color="bg-[#4CAF50]" text="Attended" />
               <ColourInfo color="bg-[#F44336]" text="Not Attended" />
                <ColourInfo color="bg-[#800080]" text="Marked For Review" />
               <ColourInfo color="bg-[#800080] border-[#4CAF50] border-2" text="Answered and Marked For Review" />
             </div>
            </div>
         </div>
       </div>
    </div>
  );
}

function ColourInfo({ color, text }: { color: string, text: string }) {
  return (
    <div className="flex items-center gap-2">
      < div className={`w-3.5 h-3.5 rounded-[3px] 
        shadow-sm flex-shrink-0 ${color}`}></div>
      <span className="text-[9px] font-bold text-gray-600 uppercase tracking-tight">{text}</span>
    </div>
  );
}