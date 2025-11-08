import { useSearchParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get("mode");

  const mode = modeParam === "register" ? "register" : "login";

  return <AuthForm mode={mode} />;
}
