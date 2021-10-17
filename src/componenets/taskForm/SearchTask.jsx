import React from 'react'
import tasksCSS from './task.module.css'


// componente de barra de busqueda de tareas 
function SearchTask({searchTask, setSearchTask, getTasksToScreen}) {

  const inputChange = (e) => setSearchTask(e.target.value);
 
    return (
     <div className={tasksCSS.search}>
        <input type="text" 
               placeholder="Buscar mi nota"  
               value={searchTask} 
               onChange={inputChange} 
               onKeyUp={getTasksToScreen}/>   
        <button type="button"><i className="fas fa-search"></i></button> 
      </div>
    );
  }

  export default SearchTask
