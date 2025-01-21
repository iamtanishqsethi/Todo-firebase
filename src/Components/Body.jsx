import {useEffect, useState} from "react";
import { collection, addDoc ,getDocs,deleteDoc,doc} from "firebase/firestore";
import {database} from "../Utils/firbaseConfig"
import TodoItem from "./TodoItem";

const Body=()=>{
    const [Todo,setTodo]=useState("");
    const [allTodo,setAllTodo]=useState([])


    const handleAddTodo=async (e)=>{
        e.preventDefault();
        try{
            const docRef=await addDoc(collection(database,"todos"),{
                todo:Todo,
                completed:false,
            })

            setTodo("")
            fetchPost()
        }
        catch (error){
            console.error("Error adding document: ", e);
        }
    }
    const fetchPost = async () => {

        const querySnapshot=await getDocs(collection(database, "todos"))
        const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id:doc.id
        }));
        setAllTodo(newData);


    }
    const handleDelete = async (id)=>{
        await deleteDoc(doc(database,'todos',id))
        setAllTodo(prev => prev.filter(todo => todo.id !== id));

    }


    useEffect(() => {
        fetchPost()
    }, []);


    // console.log(allTodo)
    return(
        <div className={'flex flex-col justify-center items-center h-screen'}>
            <div className={'flex items-center justify-center'}>
                <input type="text" placeholder={"enter todo "} className={'border-2 border-zinc-600 p-1'} onChange={(e) => setTodo(e.target.value)}
                    value={Todo}
                />
                <button className={'bg-blue-700 p-1 m-2 text-white rounded'} onClick={handleAddTodo}>Add Todo</button>
            </div>

            <div className={'overflow-y-auto'}>
                {allTodo.map((todo)=>(
                    <TodoItem todo={todo} key={todo.id}
                    onDelete={handleDelete}/>
                ))}
            </div>
        </div>
    )
}
export default Body;