import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField"; // 👈 importera komponenten

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(mode === "login" ? "Login:" : "Register:", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 rounded-2xl shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 font-playfair">
          {mode === "login" ? "Login to your account" : "Create an account"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-poppins">
          <InputField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {mode === "register" && (
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          )}
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md mt-2 hover:bg-blue-700 transition font-medium"
          >
            {mode === "login" ? "LOGIN NOW" : "SIGN UP NOW"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 font-poppins">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-600 font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/auth?mode=register")}
              >
                Sign Up!
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/auth?mode=login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
