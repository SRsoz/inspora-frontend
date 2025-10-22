import './App.css'
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        onSignIn={() => setIsLoggedIn(true)}
        onSignUp={() => setIsLoggedIn(true)}
        onSignOut={() => setIsLoggedIn(false)}
      />
    </div>
  );
}

export default App
