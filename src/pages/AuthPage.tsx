import { useSearchParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get("mode");

  const mode = modeParam === "register" ? "register" : "login";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <AuthForm mode={mode} />
    </div>
  );
}
