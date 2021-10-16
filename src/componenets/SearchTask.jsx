import React from 'react'
import tasksCSS from '../CSS/tasksList.module.css'


function SearchTask(props) {
  const {
      searchTask,
      setSearchTask,
      setOptionSearchTask,
      optionSearchTask, 
      getTasksToScreen
    
  } = props


  const inputChange = (e) => setSearchTask(e.target.value);
  const selectChange =(e) => setOptionSearchTask(e.target.value)


    return (
     <div className={tasksCSS.search}>
        <select id="optionSearch" name="options" value={optionSearchTask} onChange={selectChange}>
          <option value="bodyOption">Cuerpo de la nota</option>
        </select>
        <input type="text" placeholder="Buscar mi nota"  
            value={searchTask} onChange={inputChange} onKeyUp={getTasksToScreen}/>    
        <button type="button"><i className="fas fa-search"></i></button>
      </div>

    );
  }

  export default SearchTask
