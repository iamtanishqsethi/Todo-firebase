import {useRef, useState} from "react";
import {checkValidData} from "../Utils/validate";
import {useNavigate} from "react-router-dom";
import {auth} from "../Utils/firbaseConfig";
import { useUser } from "../Utils/userContext";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword ,updateProfile} from "firebase/auth";


const Login=()=>{
    const navigate = useNavigate();
    const {addUser}=useUser();
    const [isSigninForm, setIsSigninForm] = useState(true);
    const [errorMessage,setErrorMessage]=useState(null);

    const email=useRef(null)
    const password=useRef(null)
    const name=useRef(null)

    const handleClick=(e)=>{
        e.preventDefault();
        const message =checkValidData(email.current.value,password.current.value)
        setErrorMessage(message)

        if(message) return;
        console.log('VALID')

        if(isSigninForm){//sign in existing user
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    const {uid} = auth.currentUser;
                    addUser(uid);
                    navigate('/home')
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + errorMessage)
                });

        }
        else{
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    console.log(user)
                    updateProfile(user, {
                        displayName: name.current.value
                    }).then(()=>{
                        const {uid} = auth.currentUser;
                        addUser(uid);
                        navigate('/home')
                    })


                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + errorMessage)
                });
        }




    }

    return (
        <div className={'flex flex-col items-center justify-center h-screen'}>
            <div className={'h-[60%] w-[30%] p-6 bg-gray-200 flex flex-col '}>
                <form>
                    <h1 className={'text-2xl m-2'}>{isSigninForm ? ('Sign In') : ('Sign Up')}</h1>
                    {!isSigninForm && <label className={'flex items-center justify-between'}>
                        Enter your Name
                        <input ref={name} type="text" placeholder={'Name'} className={'p-2 m-2'}/>
                    </label>}
                    <label className={'flex items-center justify-between'}>
                        Enter your email address
                        <input ref={email} type="email" placeholder={'Email'} className={'p-2 m-2'}/>
                    </label>
                    <label className={'flex items-center justify-between'}>
                        Enter your password
                        <input ref={password} type="password" placeholder={'Password'} className={'p-2 m-2'}/>
                    </label>
                    <p className={"text-red-500 font-bold py-2 "}>{errorMessage}</p>
                    <button
                        className={'p-2 m-2 bg-blue-700 text-white '}
                        onClick={handleClick}
                    >{isSigninForm ? ('Sign In') : ('Sign Up')}</button>
                    <p
                        className={'text-gray-700 font-bold cursor-pointer'}
                        onClick={() => setIsSigninForm(!isSigninForm)}
                    >{isSigninForm ? ('New User ? Sign Up') : ('Already a User ? Sign In')}</p>

                </form>

            </div>
        </div>
    )
}
export default Login;