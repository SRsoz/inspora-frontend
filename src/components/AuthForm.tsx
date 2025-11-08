import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint =
        mode === "login"
          ? "http://localhost:4000/api/users/login"
          : "http://localhost:4000/api/users/register";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

     if (data.token) {
        login(data);
        navigate("/");
      }

    } catch (err: any) {
      console.error("Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-10 rounded-2xl shadow-md w-full max-w-lg">
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
            disabled={loading}
            className={`bg-blue-600 text-white py-2 rounded-md mt-2 hover:bg-blue-700 transition font-medium ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? "Loading..."
              : mode === "login"
              ? "LOGIN NOW"
              : "SIGN UP NOW"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}

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
