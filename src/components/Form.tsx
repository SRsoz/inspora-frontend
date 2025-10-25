import React, { useState } from "react";

type FormProps = {
  mode: "signin" | "signup";
};

const Form: React.FC<FormProps> = ({ mode }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = mode === "signin" ? { username, password } : { username, email, password };
   const endpoint = mode === "signin" ? "/api/users/login" : "/api/users/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || `${mode} failed`);
        return;
      }

      if (mode === "signin") {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } 
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-poppins">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 font-playfair">
          {mode === "signin" ? "Sign in to your account" : "Sign up to Inspora"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="text-left">
            <label className="block text-sm text-gray-600 mb-1">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className={inputClass} />
          </div>

          {mode === "signup" && (
            <div className="text-left">
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputClass} />
            </div>
          )}

          <div className="text-left">
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className={`${inputClass} pr-10`}
              />
              <img
                src={showPassword ? "/eye-off.svg" : "/eye.svg"}
                alt={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 w-5 h-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
          <a href={mode === "signin" ? "/signup" : "/signin"} className="text-blue-600 font-bold hover:underline">
            {mode === "signin" ? "Sign Up!" : "Sign In"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Form;