import React from 'react'
import tasksCSS from '../CSS/task.module.css'


const Task = ({key, checked, onChange, description, button1, button2}) => {
    return (    
    <div id="showNotesContainer" key={key} className={tasksCSS.showTaskContainer}>
        <div className={tasksCSS.checkbox}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        </div>
        <div className={tasksCSS.description}>
        <p>{description}</p>
        </div>
        <div className={tasksCSS.editContainer}>
            <button>{button1}</button>
            <button>{button2}</button>
        </div>
    </div>);
    }
 
export default Task;