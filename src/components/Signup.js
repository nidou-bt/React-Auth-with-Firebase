import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Signup() {
  const { register } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  useEffect(() => {
    if (!!error) {
      window.alert(error);
    }
  
    return setError('');
  }, [error]);
  
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    return setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    return setPassword(e.target.value);
  };

  const handleForm = () => {
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!handleForm()) {
      return setError('Passwords do not match');
    }
    try {
      await register({ email: email, password: password });
      navigate('/account');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
      <div>
        <h1 className='text-2xl font-bold py-2'>Sign up for a free account</h1>
        <p className='py-2'>
          Already have an account yet?
          <Link to='/' className='underline'>
            Sign in.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Email Address</label>
          <input
            className='border p-3'
            type='email'
            onChange={handleChangeEmail}
          />
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Password</label>
          <input
            className='border p-3'
            type='password'
            onChange={handleChangePassword}
            ref={passwordRef}
          />
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Password Confirmation</label>
          <input
            className='border p-3'
            type='password'
            ref={passwordConfirmRef}
          />
        </div>
        <button type='submit' className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
