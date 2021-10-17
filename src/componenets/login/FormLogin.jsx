import React from 'react'
import LoginCSS from './signUpAndLogin.module.css'


// componente base para la estructura principal de inicio de sesion o registro
const Form = (props) => {
   const {
    email,
    setEmail,
    password,
    setPassword,
    handleOption,
    emailError,
    passwordError, 
    btnLabel,
    greeting,
    displayName, 
    setDisplayName, 
    nameUser, 
    handleGoogle
} = props

// Se escuchan los cambios ocurridos en inputs
 const emailChange = (e) => setEmail(e.target.value);
 const passwordChange = (e) => setPassword(e.target.value);
 const submitData = (e) =>e.preventDefault();
 const userChange = (e) => setDisplayName(e.target.value);


    return (
            <section className={LoginCSS.containerForm}>
               <h2>{greeting}</h2>
                <form className={LoginCSS.itemsForm} onSubmit={submitData}>
                    <input type="text" placeholder="Email" autoFocus required 
                            value={email} onChange={emailChange}/>
                    <p className={LoginCSS.errorMsg}>{emailError}</p>
                    <input type="password" placeholder="Password" required
                            value={password} onChange={passwordChange}/>
                    <p className={LoginCSS.errorMsg}>{passwordError}</p> 

                     { nameUser ? 
                        (
                        <>
                        <input type="text" placeholder="Nombre de Usuario"
                            value={displayName} onChange={userChange}/>
                            <br />
                        </>
                        ):(
                            <>  </>
                        )}

                    <button type = "submit" onClick = {handleOption} > {btnLabel}</button> <br />
                       { !nameUser ? (
                           <a href="/login">Olvide mi contraseña</a>
                        ):(
                          <> </>
                        )}
                </form> 
                <div className={LoginCSS.providers}>
                    <p>Ó Continuar con</p>
                    <button onClick = { handleGoogle }>  <i className="fab fa-google fa-2x"></i> </button>
                </div> 
        </section>
    );
};


export default Form;