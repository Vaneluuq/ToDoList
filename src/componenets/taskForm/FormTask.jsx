import React from 'react'
import taskCSS from './task.module.css'
import { useState, useEffect, useRef} from 'react';
import {getIdTask} from '../login/firebaseAuth'
import { fb } from '../initializers/firebase';

// componente formato principal para la creacion de tareas 
const FormTask= ({addTaskCollection, descriptionTask, existId}) => {
    
    const user = fb.auth().currentUser;

    const [data, setData] = useState({
        descriptionTask: ""
    });   

    // se leen los cambios de input descriptionTask
    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    };

    // se guardan los datos del input checkbox y descriptiontask en la base de datos de firebase
    const handleSubmit = e => {
        e.preventDefault();
          addTaskCollection({...data, email: user.email, lastModified: time});
          e.target.reset();
      };


    const getTaskById  = async (id) => {
        const doc = await getIdTask(id);
            setData({...doc.data()});
    }

    useEffect(() =>{
        if (existId === "") {
            setData({descriptionTask:""});
        } else {
            getTaskById(existId);
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[existId]);

    
    const time = new Date().toLocaleDateString('en-GB',{
        hour: "2-digit",
        minute: "2-digit",
        day: 'numeric',
        month: 'long',
        year: 'numeric'
       })


    return ( 
     <form className ={taskCSS.taskMainList} onSubmit={handleSubmit}>
        <input id="descriptionTask" 
                placeholder="Escribe tu tarea aqui"
                value={existId === "" ? descriptionTask : data.descriptionTask}
                name="descriptionTask"
                onChange={handleInputChange}
                type="text"
                required/>
        <input type="submit" value={existId === "" ? "Guardar" : "Actualizar"}/>
     </form>
    );
}

export default FormTask;