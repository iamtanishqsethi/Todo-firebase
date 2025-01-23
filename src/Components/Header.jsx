import {useNavigate} from "react-router-dom";
import {auth} from "../Utils/firbaseConfig";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {useEffect} from "react";
import {useUser} from "../Utils/userContext";
const Header=()=>{
    const navigate= useNavigate()
    const {data,addUser,removeUser}=useUser();
    const handleSignOut=()=>{
        signOut(auth)
    }


    useEffect(() => {
        const unSubscribe=onAuthStateChanged(auth,(user)=>{
            if(user){
                const {uid} = auth.currentUser;
                addUser(uid);
                navigate('/home')
            }
            else {
                removeUser();
                navigate('/')
            }
        });
        return ()=> unSubscribe()
    },[])


    return(
        <div className={'flex items-center justify-center w-full bg-gray-500 sticky-top z-10 h-20'}>
            {data && (<button className={'bg-red-600 p-2 text-white'} onClick={handleSignOut}>Sign Out</button>)}
        </div>
    )
}
export default Header;