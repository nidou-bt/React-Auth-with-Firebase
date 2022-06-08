import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Account() {
  const { currentUser, logout } = useContext(UserContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!!error) {
      window.alert(error);
    }

    return setError("");
  }, [error]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto my-16 p-4">
      <h1 className="text-2xl font-bold py-4">Account</h1>
      <p>User Email: {currentUser.email}</p>
      <button onClick={handleLogout} >
        Logout
      </button>
    </div>
  );
}

export default Account;
