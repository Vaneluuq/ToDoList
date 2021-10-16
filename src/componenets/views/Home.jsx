import React, { useState, useEffect} from 'react' 
import { createTasks, editingTask, getTasks, deleteTask} from '../login/firebaseAuth';
import FormTask from '../taskForm/FormTask'
import Task from '../taskForm/Task';
import SearchTask from '../taskForm/SearchTask';
import CatFacts from '../FetchData';
import swal from 'sweetalert'
import tasksCSS from '../taskForm/task.module.css'



const TaskList = () => {
    const [tasks, setTask] = useState([]);
    const [existId, setExistId] = useState("");
    const [searchTask, setSearchTask] = useState("");
    const [num, setNum] = React.useState(1);
  
    const numberFacts = (e) => setNum(e.target.value);
    console.log(num)

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
        <div className= {tasksCSS.numbersFacts}>
          <label for="frases">Numero de frases aleatorias a traer(1-10):</label>
          <input type="number" id="tentacles" name="tentacles" min="1" max="10" value={num}  onChange={numberFacts}/>
          <button>Generar</button>

        </div>
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

      <CatFacts></CatFacts>
      </div>

    </div>
    )
}

export default TaskList