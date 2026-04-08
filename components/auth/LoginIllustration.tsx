import Image from "next/image";
import logoImg from "@/public/assets/login/logo.png";
import coverImg from "@/public/assets/login/coverImg.png";

export default function LoginIllustration() {
  return (
    <div className="flex flex-col justify-between items-center p-8 text-white w-full">
      <div>
        <Image src={logoImg} alt="NexLearn" width={200} height={70} />
      </div>

      <div className="flex justify-center">
        <Image
          src={coverImg}
          alt="Learning Illustration"
          width={300}
          height={300}
          loading="eager"
          className="object-contain"
        />
      </div>
    </div>
  );
}
