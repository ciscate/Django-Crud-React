import { useEffect, useState } from "react"
import { getAllTasks } from "../api/tasks.api"
import { TaskCard } from "./TaskCard";

export function TasksList(){

    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        async function loadTasks(){
            const response = await getAllTasks();
            setTasks(response.data);
        }
        loadTasks();
    },[]);

    return <div>
        {tasks.map(task =>(
            <TaskCard key={task.id} task={task} />
    ))}
    </div>;
    
}