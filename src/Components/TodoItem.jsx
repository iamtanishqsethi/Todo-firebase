import { doc,updateDoc} from "firebase/firestore";
import {database} from "../Utils/firbaseConfig";
import {useState} from "react";
import {useUser} from "../Utils/userContext";

const TodoItem=({todo,onDelete})=>{
    const [editable,setEditable]=useState(false);
    const [todoMessage,setTodoMessage]=useState(todo.todo);
    const [completed,setCompleted]=useState(todo.completed);
    const {data}=useUser();

    const handleUpdate=async ()=>{
        await updateDoc(doc(database,data,todo.id),{
            todo:todoMessage,
        })
        setEditable(false)
    }
    const handleCompleted=async ()=>{
        await updateDoc(doc(database,data,todo.id),{
            completed:!completed,
        })
        setCompleted(!completed);
    }
    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}>
            <input type="checkbox"
                   checked={completed}
                   onChange={handleCompleted}
            />
            <input type="text"
                   className={`border outline-none w-full bg-transparent rounded-lg ${editable ? "border-black/10 px-2" : "border-transparent"} ${completed?'line-through':''}`}
                   value={todoMessage} onChange={(e) => setTodoMessage(e.target.value)}
                   readOnly={!editable}/>

            <button
                className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
                onClick={() => {
                    if (completed) {
                        return
                    }
                    if (editable) {
                        handleUpdate()
                    } else {
                        setEditable(prev => !prev);
                    }
                }}
                disabled={completed}
            >{editable ? "📁" : "📝"}
            </button>
            <button
                className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0'
                onClick={() => onDelete(todo.id)}
            >❌
            </button>
        </div>
    )
}
export default TodoItem