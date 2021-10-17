import React, { useState, useEffect} from 'react' 
import { createTasks, editingTask, getTasks, deleteTask, handleLogout} from '../login/firebaseAuth';
import FormTask from '../taskForm/FormTask'
import Task from '../taskForm/Task';
import SearchTask from '../taskForm/SearchTask';
import CatFacts from '../FetchData';
import swal from 'sweetalert'
import tasksCSS from '../taskForm/task.module.css'
import nextId from "react-id-generator";
import { Link} from 'react-router-dom';


// componente que renderiza los diversos componentes que conforman el home 

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
    // se guardan frases en firebase 
    const [userPhrases, setUserPhrases] = useState([]);
    // const [phasesToScreen, setPhasesToScreen] = useState([]);


    const logout = () => {
      console.log("nada")
      handleLogout().then(() => {  
        console.log("hola")     
      }).catch(function(error) {
        console.log(error)
      });
    }

    // se identifica el valor del input num (numero de frases seleccionadas por el usuario)
    const numberFacts = (e) => setNum(e.target.value);

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
    const filterTask = async(objNote, searchNote) => {
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
                filterTask(myTask, searchTask)
              }
        });      
    };

        // funcion que relaciona input num y api frases
        let phrasesSelect =() => {
          let phrasesFromItems = []
           for (let i = 0; i < items.length; i++) {
             phrasesFromItems.push(items[i].fact)
            }
          let numberOfPhrases = phrasesFromItems.splice(0, num);
 
           let phrasesToShow =[]
            numberOfPhrases.forEach(frase => 
             phrasesToShow.push({frasesUsuario: frase, id:nextId()})
             )
            setUserPhrases(phrasesToShow);
        };


       //  let random = Math.floor(Math.random() * item.length)

      useEffect(() => {
        getTasksToScreen();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []); 


   // se borran las tareas 
    const deleteTasks = (id) => {
      swal({
        title: "Se eliminará tu tarea",
        text: "Quieres continuar?",
        icon: "warning",
        buttons: ["No", "Si"]
        }).then(respuesta => {
        if(respuesta){
          deleteTask(id);
        }
      })
    }

    // se borran las frases
    const deletePhrase = id => {
      const removeArray = [...userPhrases].filter(phrase => phrase.id !== id)
      swal({
        title: "Se eliminará tu tarea",
        text: "Quieres continuar?",
        icon: "warning",
        buttons: ["No", "Si"]
        }).then(respuesta => {
        if(respuesta){
      setUserPhrases(removeArray)
        }
     })
  }


  const [showLogout, setShowLogout] = useState(false)

  function openModal() {
    setShowLogout(true);
 }

 // Se cierra modal que crea o edita nota
 const closeModal = () => {
   setShowLogout(false);
 }


    return(
    <div className= {tasksCSS.containerTaskList}>
     {
      showLogout ? (
        <div className= {tasksCSS.logout}>
         <button onClick= {closeModal}><i class="fas fa-window-close"></i></button>
          <Link to="/">
                <button onClick= {handleLogout}><i class="fas fa-sign-out-alt">LogOut</i></button>
          </Link>
        </div>

      ): (
        <div className= {tasksCSS.showLogout}>
           <button onClick= {openModal}>Ver más</button>
        </div>
      )
    } 
      <div className= {tasksCSS.searchTask}>
        <h2>To-Do-Helper</h2>
        <SearchTask
            searchTask = {searchTask}
            setSearchTask = {setSearchTask}
            getTasksToScreen = {getTasksToScreen}
            />
      </div>
      <div className= {tasksCSS.addTask}>
        <div className= {tasksCSS.numbersFacts}>
          <label for="frases">Numero de frases aleatorias a traer(1-10):</label>
          <div className= {tasksCSS.inputs}>
           <input type="number" id="frases" name="frases" min="1" max="10" value={num}  onChange={numberFacts}/>
           <button onClick = {() => phrasesSelect()} >Generar</button>
          </div>
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
          {(
          userPhrases.map((item) => (
           <Task
            key={item.id} 
            description = {item.frasesUsuario}
            button1 = {"Borrar"}
            onClick={() => {deletePhrase(item.id)}}
            button2 = {"Editar"}
            onClick2 = {() => setExistId(item.id)}
            />
        ))
      )}
      </div>
      <CatFacts
      items = {items}
      setItems = {setItems}/>
    </div>
    )
}

export default TaskList