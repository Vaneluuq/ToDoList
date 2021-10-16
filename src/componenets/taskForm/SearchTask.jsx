import React from 'react'
import tasksCSS from './task.module.css'


function SearchTask(props) {
  const {
      searchTask,
      setSearchTask,
      getTasksToScreen
    
  } = props


  const inputChange = (e) => setSearchTask(e.target.value);
 

    return (
     <div className={tasksCSS.search}>
        <input type="text" placeholder="Buscar mi nota"  
            value={searchTask} onChange={inputChange} onKeyUp={getTasksToScreen}/>    
      </div>

    );
  }

  export default SearchTask
