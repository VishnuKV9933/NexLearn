'use client'
import React, { useState, useEffect } from "react";
import LoginIllustration from "./LoginIllustration";
import MobileInput from "./MobileInput";
import OTPInput from "./OTPInput";
import ProfileForm from "./ProfileForm"; 

export default function LoginCard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [mobile, setMobile] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="w-[836px] h-[500px] max-w-[95%] bg-[linear-gradient(180deg,#1C3141_28.73%,#487EA7_233.43%)] 
    rounded-2xl shadow-2xl flex overflow-hidden p-2 font-sans">
      
  
      <div className="w-1/2 hidden md:flex">
        <LoginIllustration />
      </div>


      <div className="w-full md:w-1/2 bg-white p-8 rounded-xl relative overflow-y-auto">
        {step === 1 && (
          <MobileInput mobile={mobile} setMobile={setMobile} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <OTPInput 
            mobile={mobile} 
            onBack={() => setStep(1)} 
            onRegister={() => setStep(3)} 
          />
        )}
        {step === 3 && (
          <ProfileForm mobile={mobile} />
        )}
      </div>
    </div>
  );
}