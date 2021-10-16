import React, { useState, useEffect} from 'react' 
import { createTasks, editingTask, getTasks, deleteTask} from '../login/firebaseAuth';
import FormTask from '../taskForm/FormTask'
import Task from '../taskForm/Task';
import SearchTask from '../taskForm/SearchTask';
import CatFacts from '../FetchData';
import swal from 'sweetalert'
import tasksCSS from '../taskForm/task.module.css'



const TaskList = () => {
    // se guardan las tareas 
    const [tasks, setTask] = useState([]);
    // Se guarda id de las tareas en firebase
    const [existId, setExistId] = useState("");
    // se guarda valor del input search para filtar por descripcion 
    const [searchTask, setSearchTask] = useState("");
    // se guarda numero seleccionado por el usuario
    const [num, setNum] = useState(1);
    //se guardan frases de la api de gatos 
    const [items, setItems] = useState([]);
    // se guardan frases con filtro 
    const [userItems, setUserItems] = useState([]);

    // se identifica el valor del input num (numero de frases seleccionadas por el usuario)
    const numberFacts = (e) => setNum(e.target.value);



    // funcion que relaciona input num y api frases
      const frasesSelect =() => {
        let frases;
        for (let i = num; i < items.length; i++) {
         frases += items[i].fact + "----------"
        }
        setUserItems(frases);
   }


    // Se crea o edita una tarea
    const addTaskCollection = async (notesObj) => { 
      if(existId ===""){   
        await createTasks(notesObj);
        }else{
          await editingTask(existId, notesObj)
          setExistId("")
      }  
    }

   // se filtran las tareas por texto de descripcion 
    const filterNote = async(objNote, searchNote) => {
          const filterByBody = await objNote.filter(task => task.descriptionTask.toLowerCase().includes(searchNote.toLowerCase()))
          setTask(filterByBody)
      };


    // se obtienen las tareas de firebase y se muestran en pantalla
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


   // se borran las tareas 
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
          <input type="number" id="frases" name="frases" min="1" max="10" value={num}  onChange={numberFacts}/>
          <button onClick = {() => frasesSelect()} >Generar</button>

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

      <CatFacts
      items = {items}
      setItems = {setItems}/>
      </div>
      <p>{userItems}</p>

    </div>
    )
}

export default TaskList