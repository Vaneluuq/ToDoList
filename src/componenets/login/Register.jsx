import React from 'react'
import Form from './FormLogin';
import { useState , useEffect} from 'react';
import { createUser , authListener, loginWithGoogle} from './firebaseAuth';
import { Redirect } from 'react-router-dom';


const Register = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [nameUser, setNameUser] = useState(false)


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
      .then((userCredential) => {
        let user = userCredential.user;
        console.log(user)
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

    const handleGoogle = () => {
      loginWithGoogle()
      .then(res => {
          setUser(res.user)
          setDisplayName(res.user.displayName)
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

  return(
    <div>
    { user ? 
        ( 
        <Redirect to ="/home"> </Redirect>
      ) : ( 
    <Form
      greeting = "Crea tu cuenta ToDo helper"
      btnLabel = "Registrarse"
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
      handleGoogle = {handleGoogle}
      setNameUser = {setNameUser}
      />   
     )}
    </div>
  )
}
 
export default Register;


