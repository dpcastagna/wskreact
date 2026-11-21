import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useState} from 'react';

const Login = () => {
  const [displayLogin, setDisplayLogin] = useState(true);
  return (
    <>
      {displayLogin ? (
        <LoginForm />
      ) : (
        <RegisterForm setDisplayLogin={setDisplayLogin} />
      )}
      <button onClick={() => setDisplayLogin(!displayLogin)}>
        {displayLogin ? 'Not registered yet?' : 'I have an account already!'}
      </button>
    </>
  );
};

export default Login;
