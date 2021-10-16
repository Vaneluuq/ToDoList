import React from 'react'
import taskCSS from './task.module.css'
import { useState, useEffect} from 'react';
import {getIdTask} from '../login/firebaseAuth'

const FormTask= (props) => {
    const {
     addTaskCollection, 
     descriptionTask, 
     existId
     
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
     <form className ={taskCSS.taskMainList} onSubmit={handleSubmit}>
        <input id="descriptionTask" 
                placeholder="Escribe tu tarea aqui"
                value={existId === "" ? descriptionTask : data.descriptionTask}
                name="descriptionTask"
                onChange={handleInputChange}
                required/>
      <button type="submit" className="btn-guardar">  {existId === "" ? "Guardar" : "Actualizar"}</button>
     </form>
    );
}

export default FormTask;