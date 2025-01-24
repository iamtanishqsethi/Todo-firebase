import {useEffect, useState} from "react";
import { collection, addDoc ,getDocs,deleteDoc,doc,query,where} from "firebase/firestore";
import {database} from "../Utils/firbaseConfig"
import TodoItem from "./TodoItem";
import { useUser } from "../Utils/userContext";
import Header from "./Header";

const Body=()=>{
    const [Todo,setTodo]=useState("");
    const [allTodo,setAllTodo]=useState([])
    const {data}=useUser();
    console.log(data)

    const handleAddTodo=async (e)=>{
        e.preventDefault();
        try{
            await addDoc(collection(database,data),{
                todo:Todo,
                completed:false,
                userId:data,
            })

            setTodo("")
            fetchPost()
        }
        catch (error){
            console.error("Error adding document: ", e);
        }
    }
    const fetchPost = async () => {
        const todosQuery=query(collection(database,data))
        const querySnapshot=await getDocs(todosQuery)
        const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id:doc.id
        }));
        setAllTodo(newData);


    }
    const handleDelete = async (id)=>{
        await deleteDoc(doc(database,data,id))
        setAllTodo(prev => prev.filter(todo => todo.id !== id));

    }


    useEffect(() => {
        if(data){
         fetchPost()
        }
    }, [data]);


    // console.log(allTodo)
    return(
        <>
            <Header/>
            <div className={'flex flex-col justify-center items-center h-screen'}>
                <div className={'flex items-center justify-center'}>
                    <input type="text" placeholder={"enter todo "} className={'border-2 border-zinc-600 p-1'}
                           onChange={(e) => setTodo(e.target.value)}
                           value={Todo}
                    />
                    <button className={'bg-blue-700 p-1 m-2 text-white rounded'} onClick={handleAddTodo}>Add Todo
                    </button>
                </div>

                <div className={'overflow-y-auto'}>
                    {allTodo.map((todo) => (
                        <TodoItem todo={todo} key={todo.id}
                                  onDelete={handleDelete}/>
                    ))}
                </div>
            </div>
        </>

    )
}
export default Body;