import React from 'react'
import taskCSS from '../CSS/task.module.css'
import { useState, useEffect} from 'react';
import {getIdTask} from './firebaseAuth'

const FormTask= (props) => {
    const {
     addTaskCollection, 
     descriptionTask, 
     existId, 
     checked
     
    } = props

    
    const initialData = {
        descriptionTask: '',
    }

    const [data, setData] = useState(initialData)   

    // se leen los cambios de input descriptionTask
    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    // se guardan los datos del input checkbox y descriptiontask en la base de datos de firebase
    const handleSubmit = e => {
        e.preventDefault();
          addTaskCollection({...data}) 
          setData({...initialData});  
      }


      const getTaskById  = async (id) => {
        const doc = await getIdTask(id);
            setData({...doc.data()})
    }

    useEffect(() =>{
        if (existId === "") {
            setData({...initialData });
        } else {
            getTaskById(existId);
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[existId]);


    return ( 
     <form className ={taskCSS.notesMain} onSubmit={handleSubmit}>
     
        <input id="descriptionTask" 
                placeholder="Escribe tu nota aqui"
                value={descriptionTask}
                name="descriptionTask"
                onChange={handleInputChange}
                required/>
      <button type="submit" className="btn-guardar"> Guardar</button>
     </form>
    );
}

export default FormTask;