import React from 'react'
import Form from './FormLogin';
import { useState , useEffect} from 'react';
import { createUser , authListener } from './firebaseAuth';
import { Redirect } from 'react-router-dom';
import { fb } from '../initializers/firebase';


const Register = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [nameUser, setNameUser] = useState(true)


  const clearInput= () => {
        setEmail('');
        setPassword('');
    }
  
  const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }


  const handleSignup = () => {
        clearErrors();
      createUser(email, password)
      .then(() => {
        let user = fb.auth().currentUser;
        user.updateProfile({
            displayName: displayName})
            .then(() => {
            console.log("registrado")
            setDisplayName("")
        }, function(error) {
            console.log(error)
        });        
      }) 
     .catch(err => {
        switch (err.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(err.message);
              break;
            case "auth/weak-password":
              setPasswordError(err.message)
              break;
            default:  
              setEmailError(err.message);
        }
      })
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

  return(
    <div>
    { user ? 
        ( 
        <Redirect to ="/home"> </Redirect>
      ) : ( 
    <Form
      greeting = "Crea tu cuenta ToDo helper"
      btnLabel = "Registrarse"
      // image = {img}
      email={email}
      setEmail={setEmail} 
      password={password} 
      setPassword={setPassword} 
      handleOption={handleSignup} 
      emailError = {emailError}
      passwordError = {passwordError}
      setDisplayName = {setDisplayName}
      displayName = {displayName}
      nameUser = {nameUser}
      />   
     )}
    </div>
  )
}
 
export default Register;


