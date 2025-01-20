import {useEffect, useState} from "react";
import { collection, addDoc ,getDocs} from "firebase/firestore";
import {database} from "../Utils/firbaseConfig"

const Body=()=>{
    const [Todo,setTodo]=useState("");
    const [allTodo,setAllTodo]=useState([])
    const [added,setAdded]=useState(false)

    const handleAddTodo=async (e)=>{
        e.preventDefault();
        try{
            const docRef=await addDoc(collection(database,"todos"),{
                todo:Todo,
            })
            console.log("Document written with ID: ", docRef.id);
            setAdded(!added);
        }
        catch (error){
            console.error("Error adding document: ", e);
        }
    }
    const fetchPost = async () => {

        await getDocs(collection(database, "todos"))
            .then((querySnapshot)=>{
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setAllTodo(newData);
            })

    }
    useEffect(() => {
        fetchPost()
    }, [added]);


    console.log(allTodo)
    return(
        <div className={'flex flex-col justify-center items-center h-screen'}>
            <div className={'flex items-center justify-center'}>
                <input type="text" placeholder={"enter todo "} className={'border-2 border-zinc-600'} onChange={(e) => setTodo(e.target.value)}/>
                <button className={'bg-blue-700 p-2 m-2 text-white'} onClick={handleAddTodo}>Add Todo</button>
            </div>

            <div>
                {allTodo.map((todo)=>(
                    <p className={'border-2 p-2 m-2'}>{todo.todo}</p>
                ))}
            </div>
        </div>
    )
}
export default Body;