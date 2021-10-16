import React, { useState, useEffect} from 'react' 
import FormTask from './FormTask'
import { createTasks, editingTask, getTasks} from './firebaseAuth';
import tasksCSS from '../CSS/tasksList.module.css'
import Task from './Task';
import SearchTask from './SearchTask';



const TaskList = () => {
    const [tasks, setTask] = useState([]);
    const [existId, setExistId] = useState("");
    const [checked, setChecked] = useState(false);
    const [searchTask, setSearchTask] = useState("");
    // const [optionSearchTask, setOptionSearchTask] = useState("bodyOption")
 
    // se valida si el input checkbox esta activo o no
    const handleChange = () => {setChecked(!checked)};


    const addTaskCollection = async (notesObj) => { await createTasks(notesObj)}


    const filterNote = async(objNote, searchNote) => {
          const filterByBody = await objNote.filter(nota => nota.body.toLowerCase().includes(searchNote.toLowerCase()))
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
            checked={checked}
            onChange={handleChange}
            description = {task.descriptionTask}
            button1 = {"Borrar"}
            button2 = {"Editar"}
            />
           ))
        )}
      </div>

    </div>
    )
}

export default TaskList