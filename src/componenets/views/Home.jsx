import React, { useState, useEffect} from 'react' 
import FormTask from '../taskForm/FormTask'
import { createTasks, editingTask, getTasks, deleteTask} from '../login/firebaseAuth';
import tasksCSS from '../taskForm/task.module.css'
import Task from '../taskForm/Task';
import SearchTask from '../taskForm/SearchTask';
import swal from 'sweetalert'



const TaskList = () => {
    const [tasks, setTask] = useState([]);
    const [existId, setExistId] = useState("");
    const [searchTask, setSearchTask] = useState("");

    const addTaskCollection = async (notesObj) => { 
      if(existId ===""){   
        await createTasks(notesObj);
        }else{
          await editingTask(existId, notesObj)
          setExistId("")
      }  
    }


    const filterNote = async(objNote, searchNote) => {
          const filterByBody = await objNote.filter(task => task.descriptionTask.toLowerCase().includes(searchNote.toLowerCase()))
          setTask(filterByBody)
      };

    const getTasksToScreen = async () => {
        getTasks((querySnapshot) => {
            const myTask = [];
            querySnapshot.forEach(doc => {
            myTask.push({...doc.data(), id:doc.id});
            });
            if(searchTask ===""){
                setTask(myTask);
              }else{
                filterNote(myTask, searchTask)
              }
        });      
    };
    
    useEffect(() => {
    getTasksToScreen() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); 


    const deleteTasks = (id) => {
      swal({
        title: "Se eliminará tu nota",
        text: "Quieres continuar?",
        icon: "warning",
        buttons: ["No", "Si"]
        }).then(respuesta => {
        if(respuesta){
          deleteTask(id);
        }
      })
    }

    return(
    <div className= {tasksCSS.containerTaskList}>
      <div className= {tasksCSS.searchTask}>
        <SearchTask
            searchTask = {searchTask}
            setSearchTask = {setSearchTask}
            getTasksToScreen = {getTasksToScreen}
            />
      </div>
      <div className= {tasksCSS.addTask}>
        <FormTask
        addTaskCollection = {addTaskCollection}
        existId ={existId}
        />
      </div>
      <div className= {tasksCSS.containerTasks}>
        {(
          tasks.map((task)=>( 
            <Task
            key={task.id} 
            description = {task.descriptionTask}
            button1 = {"Borrar"}
            onClick={() => deleteTasks(task.id)}
            button2 = {"Editar"}
            onClick2 = {() => setExistId(task.id)}
            />
           ))
        )}
      </div>

    </div>
    )
}

export default TaskList