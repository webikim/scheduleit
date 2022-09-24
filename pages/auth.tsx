import React, { useState } from 'react';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';

interface AuthProps { }

const Auth = (props: AuthProps) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            { isLogin ? <SignIn setLogin={setIsLogin} /> : <SignUp setLogin={setIsLogin} />}
        </>
    )
}

export default Auth;