import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const navigate = useNavigate()
  const params = useParams()

  const onSubmit = handleSubmit(async (data) => {
    if(params.id){
      await updateTask(params.id,data );
      toast.success('Task has been Updated',{
        position: "bottom-right",
        style:{
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createTask(data);
      toast.success('Task has been Created',{
        position: "bottom-right",
        style:{
          background: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/tasks");
  });
  useEffect(()=>{
    async function loadTask(){
      if(params.id){
        const response = await getTask(params.id);
        setValue('title', response.data.title);
        setValue('description',response.data.description);
      }
    }
    loadTask();
  },[])
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <span>Title is required</span>}
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <span>Description is required</span>}
        <button>Save</button>
      </form>
      {params.id && <button onClick={async()=>{
        const accepted = window.confirm('Are u Sure?');
        if (accepted){
          await deleteTask(params.id);
          toast.success('Task Deleted',{
            position: "bottom-right",
            style:{
              background: "#101010",
              color: "#fff",
            },
          });
          navigate("/tasks");
        }
      }}>Delete</button>}
    </div>
  );
}
