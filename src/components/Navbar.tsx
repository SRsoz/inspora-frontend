import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 0);
        timeoutId = null;
      }, 100);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleSignIn = () => navigate("/auth?mode=login");
  const handleSignUp = () => navigate("/auth?mode=register");

  return (
  
   <nav className={`
    fixed w-full
    h-20
    flex items-center justify-center
    
    transition-all duration-300 ease-in-out
    z-50
    ${scrolled ? "bg-white/80 backdrop-blur-sm" : "bg-white"}
  `}>
      <div className="flex items-center justify-between max-w-4xl w-full">
        <img src="/logo.svg" alt="Logo"/>

        <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <Button variant="primary" text="Sign In" onClick={handleSignIn} />
            <Button variant="secondary" text="Sign Up" onClick={handleSignUp} />
          </>
        ) : (
          <>
          {user?.role === 'admin' && (
                <Button variant="primary" text="Admin" onClick={() => navigate("/admin")} />
              )}
            <img src="/account.svg" alt="Account" className="h-10 w-10 cursor-pointer" />
            <Button variant="third" text="Sign Out" onClick={logout} />
          </>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
