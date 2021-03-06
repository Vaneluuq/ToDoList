import React from 'react'
import Form from './FormLogin'
import { useState, useEffect } from 'react';
import {loginUser, authListener, loginWithGoogle} from './firebaseAuth';
import { Redirect } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("")
    const [nameUser, setNameUser] = useState(false)


    //Se limpia data contenida en inputs
    const clearInput= () => {
        setEmail('');
        setPassword('');
    }

    // Se borran errores mostrados en pantalla
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }


    // funcion ingresar con errores generados por email incorrecto, no encontrado.... 
    const handleLogin = () => {
    clearErrors()

    loginUser(email, password)
    .catch(err => {
        switch (err.code) {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":  
                setEmailError(err.message);
                break;
            case "auth/wrong-password":
                setPasswordError(err.message)
                break;
            default:  
                setEmailError(err.message);
            
        }
    })
}

const handleGoogle = () => {
    loginWithGoogle().then(res => {
            setUser(res.user)
        })
        .catch(err => { console.log(err) })
      }

    const listenerAuth = () => {
        authListener((user) => {
            if(user){
                clearInput();
                setUser(user);
            } else {
                setUser("");
            }
        })
    }

    useEffect(() => {
        listenerAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return ( 
       <div>  
          { user ? (
           <Redirect to ="/home"></Redirect>
            ) : (
            <Form
            greeting = "Ingresa a tu cuenta"
            btnLabel = "Ingresar"
            email={email}
            setEmail={setEmail} 
            password={password} 
            setPassword={setPassword} 
            handleOption = {handleLogin}
            emailError = {emailError}
            passwordError = {passwordError}
            nameUser = {nameUser}
            setNameUser = {setNameUser}
            handleGoogle = {handleGoogle}
            />  
          )
         }
       </div>
    ) 
}
 
export default Login;