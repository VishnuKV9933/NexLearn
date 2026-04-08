import LoginCard from "@/components/auth/LoginCard";

export default function LoginPage() {
  return (
<div className=" relative min-h-screen  bg-[url('/assets/login/background.jpeg')] bg-cover bg-center">
  <div className="absolute inset-0 bg-black/60" />
  <div>
</div>
  <div className="relative z-10 flex items-center justify-center min-h-screen">
    <LoginCard />
  </div>
</div>
  );
}