import Link from "next/link";

export default function InstructionsPage() {
  const instructions = [
    "You have 100 minutes to complete the test.",
    "Test consists of 100 multiple-choice q's.",
    "You are allowed 2 retest attempts if you do not pass on the first try.",
    "Each incorrect answer will incur a negative mark of -1/4.",
    "Ensure you are in a quiet environment and have a stable internet connection.",
    "Keep an eye on the timer, and try to answer all questions within the given time.",
    "Do not use any external resources such as dictionaries, websites, or assistance.",
    "Complete the test honestly to accurately assess your proficiency level.",
    "Check answers before submitting.",
    "Your test results will be displayed immediately after submission, indicating whether you have passed or need to retake the test.",
  ];

  return (
    <div className="min-h-screen bg-[#f1f7fe] flex flex-col">
      

      <main
        className="flex-1 flex flex-col items-center 
      py-6 md:py-10 px-4 max-w-4xl mx-auto w-full"
      >
        <h1
          className="text-xl md:text-3xl 
         text-[#1e2d3d] mb-6 md:mb-8 text-center"
        >
          Ancient Indian History MCQ
        </h1>

        <div
          className="w-full max-w-2xl bg-[#1C3141] rounded-lg 
        p-4 md:p-6 flex justify-around items-center border-[3px] border-[#3b82f6] shadow-xl mb-8 md:mb-10 text-white"
        >
          <div className="text-center flex-1">
            <p
              className="text-[8px] md:text-[10px] uppercase tracking-wider
             text-white mb-1 opacity-90"
            >
              Total MCQ's:
            </p>
            <p className="text-xl sm:text-2xl md:text-4xl ">100</p>
          </div>

          <div className="h-10 md:h-16 w-[1px] bg-white"></div>

          <div className="text-center flex-1">
            <p
              className="text-[8px] md:text-[10px] uppercase tracking-wider
             text-white mb-1 opacity-90"
            >
              Total marks:
            </p>
            <p className="text-xl sm:text-2xl md:text-4xl ">100</p>
          </div>

          <div className="h-10 md:h-16 w-[1px] bg-white"></div>

          <div className="text-center flex-1">
            <p
              className="text-[8px] md:text-[10px] uppercase 
            tracking-wider text-white mb-1 opacity-90"
            >
              Total time:
            </p>
            <p
              className="text-xl sm:text-2xl 
            md:text-4xl  tracking-tighter"
            >
              90:00
            </p>
          </div>
        </div>

        <div className="w-full max-w-2xl space-y-4 text-left px-2">
          <h3 className="font-bold text-gray-800 text-lg">Instructions:</h3>
          <ol className="space-y-3">
            {instructions.map((item, index) => (
              <li
                key={index}
                className="flex gap-3 text-[13px] md:text-sm
               text-gray-600 leading-relaxed"
              >
                <span className="font-semibold text-[#1e2d3d] min-w-[20px]">
                  {index + 1}.
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 md:mt-12 w-full flex justify-center pb-10">
          <Link
            href={"/mcq"}
            className="w-full sm:w-auto text-center bg-[#1e2d3d] text-white px-16 py-3.5 
            rounded-lg font-semibold text-lg hover:bg-black transition-all shadow-md active:scale-95"
          >
            Start Test
          </Link>
        </div>
      </main>
    </div>
  );
}
