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
    const [optionSearchTask, setOptionSearchTask] = useState("bodyOption")
 
    // se valida si el input checkbox esta activo o no
    const handleChange = () => {setChecked(!checked)};


    const addTaskCollection = async (notesObj) => { await createTasks(notesObj)}

    const filterNote = async(objNote, searchNote, option) => {
        if(optionSearchTask === option){
          const notaFiltradaByBody = await objNote.filter(nota => nota.body.toLowerCase().includes(searchNote.toLowerCase()))
          setTask(notaFiltradaByBody)
        }
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
                filterNote(myTask, searchTask, optionSearchTask)
              }
           
        });      
    };
    useEffect(() => {
    getTasksToScreen() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); 

    return(
    <>
     <SearchTask
        searchTask = {searchTask}
        setSearchTask = {setSearchTask}
        optionSearchTask = {optionSearchTask}
        setOptionSearchTask = {setOptionSearchTask}
        getTasksToScreen = {getTasksToScreen}
        />

      <FormTask
      addTaskCollection = {addTaskCollection}
      existId ={existId}
      />
      <div>
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
    </>
    )
}

export default TaskList