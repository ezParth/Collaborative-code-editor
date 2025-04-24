import { SignIn } from "@clerk/clerk-react";
import React from "react";

const Login: React.FC = () => {

    return (
        <div className="flex items-center justify-center h-screen">
            <SignIn />
        </div>
    )
}

export default Login