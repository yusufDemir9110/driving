import React from 'react'
import { auth, provider } from '../../firebase/firebase'
import { signInWithPopup} from 'firebase/auth';

function LoginNo() {
    const login = ()=>{
        signInWithPopup(auth,provider).catch((error)=>alert(error.message))
    }
    return (
        <div className='login'>
            <div className='container'>
                <button onClick={login}>Google ile giris</button>
            </div>    
        </div>
    )
}

export default LoginNo