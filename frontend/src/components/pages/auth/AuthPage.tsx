import { LoginForm } from '@/components/organisms/form/LoginForm';
import { RegisterForm } from '@/components/organisms/form/RegisterForm';
import { useState } from 'react';

function AuthPage() {
  const [Register, setRegister] = useState(false);
  return (
    <div className="absolute w-full h-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {Register ? (
          <RegisterForm setRegister={() => setRegister(false)} />
        ) : (
          <LoginForm setRegister={() => setRegister(true)} />
        )}
      </div>
    </div>
  );
}

export default AuthPage;
