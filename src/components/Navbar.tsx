import React, { useState, useEffect } from "react";
import Button from "./Button";

type NavbarProps = {
  isLoggedIn?: boolean;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onSignOut?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn = false,
  onSignIn,
  onSignUp,
  onSignOut,
}) => {
  const [scrolled, setScrolled] = useState(false);

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

   const navClasses = `
    fixed top-0 left-0 w-full
    h-[5rem]
    flex items-center justify-between
    px-[2rem]
    transition-all duration-300 ease-in-out
    z-50
    ${scrolled ? "bg-white/80 backdrop-blur-sm" : "bg-white"}
  `;

  return (
   <nav className={navClasses}>
      <img src="/logo.svg" alt="Logo"/>

      <div className="flex items-center gap-[1rem]">
        {!isLoggedIn ? (
          <>
            <Button variant="primary" text="Sign In" onClick={onSignIn} />
            <Button variant="secondary" text="Sign Up" onClick={onSignUp} />
          </>
        ) : (
          <>
            <img src="/account.svg" alt="Account" className="h-[2.5rem] w-[2.5rem] cursor-pointer" />
            <Button variant="third" text="Sign Out" onClick={onSignOut} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
