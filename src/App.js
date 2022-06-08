import { Navigate, Route, Routes } from "react-router";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Account from "./components/Account";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">
        Firebase Auth & Context
      </h1>
      <Routes>
        <Route path="/" element={!currentUser ? <Signin /> : <Navigate to='/account' replace={true} />} />
        <Route path="/signup" element={!currentUser ? <Signup /> : <Navigate to='/account' replace={true} />} />
        <Route path="/account" element={!!currentUser ? <Account /> : <Navigate to='/' replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
