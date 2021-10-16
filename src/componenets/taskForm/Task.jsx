import React from 'react'
import tasksCSS from './task.module.css'

// componente que renderiza el formato de las tareas en pantalla
const Task = ({key, description, button1, button2, onClick, onClick2}) => {
    return (    
    <div id="showNotesContainer" key={key} className={tasksCSS.showTaskContainer}>
        <div className={tasksCSS.description}>
        <p>{description}</p>
        </div>
        <div className={tasksCSS.editContainer}>
            <button onClick= {onClick}>{button1}</button>
            <button onClick= {onClick2}>{button2}</button>
        </div>
    </div>);
    }
 
export default Task;