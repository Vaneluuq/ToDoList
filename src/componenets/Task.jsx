import React from 'react'
import tasksCSS from '../CSS/tasksList.module.css'


const Task = ({key, checked, onChange, description, button1, button2}) => {
    return (    
    <div id="showNotesContainer" key={key} className={tasksCSS.showNotesContainer}>
        <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <p className={tasksCSS.body}>{description}</p>
        </label>
        <div  className={tasksCSS.editContainer}>
        <button>{button1}</button>
        <button>{button2}</button>
    </div>
    </div>);
    }
 
export default Task;