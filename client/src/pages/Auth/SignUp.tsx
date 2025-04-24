import React from 'react'
import { SignUp } from '@clerk/clerk-react'

const Signup: React.FC = () => {
    return (
        <div className='flex items-center justify-center h-screen'>
            <SignUp />
        </div>
    )
}

export default Signup
