import React from 'react';
import SignIn from '../components/auth/SignIn';

interface AuthProps { }

const Auth = (props: AuthProps) => {
    return (
        <>
            <SignIn></SignIn>
        </>
    )
}

export default Auth;