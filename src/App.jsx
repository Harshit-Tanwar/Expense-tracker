import React, { useState } from 'react'
import Nav from './Components/Nav'
import Dashboard from './Components/Dashboard';
import LoginForm from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm';

const App = () => {
  const [user, setUser] = useState(null); // Store logged-in user info
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register
  const [showLoginForm, setShowLoginForm] = useState(false); // Control login form visibility

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setShowLoginForm(false); // Hide login form after successful login
  };

  const handleLogout = () => {
    setUser(null);
  };
  return (
    <div className="App h-screen">
      <Nav
        user={user}
        onLoginClick={() => {
          setIsRegistering(false); // Ensure login form is displayed
          setShowLoginForm(true);
        }}
        onLogout={handleLogout}
      />
      <div className="flex justify-center items-center h-full bg-[url(https://fsnb.net/wp-content/uploads/2023/05/income-and-expenses-spot.jpg)] bg-cover bg-center">
        {user ? (
          <Dashboard user={user} onLogout={handleLogout} />
        ) : (
          showLoginForm && (
            <div className="bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10 w-full h-full p-4">
              <div className="bg-zinc-300 h-auto w-full max-w-md relative rounded-lg p-6 shadow-lg">
                {isRegistering ? (
                  <RegistrationForm />
                ) : (
                  <LoginForm onLogin={handleLogin} />
                )}
                <div className="flex justify-center">
                  <button
                    className="bg-zinc-900 rounded-md px-8  text-white text-lg hover:bg-white hover:text-black transition-colors"
                    onClick={() => setIsRegistering(!isRegistering)}
                  >
                    {isRegistering ? "Go to Login" : "Register"}
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default App