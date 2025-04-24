import { SignIn } from "@clerk/clerk-react";
import React from "react";

const Login: React.FC = () => {
    
    return (
        <div className="flex item-center justify-center">
            <SignIn />
        </div>
    )
}

export default Login
