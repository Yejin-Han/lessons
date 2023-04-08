import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

const App = () => {
  const auth = authService.currentUser;
  const [isLoggedIn, setIsLoggedIn] = useState(auth);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
};

export default App;
