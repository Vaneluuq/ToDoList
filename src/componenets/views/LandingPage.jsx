import React from 'react'
import styles from './landingPage.module.css'
import Login from '../login/Login'
import Register from '../login/Register';
import { useState } from 'react';

// componente que renderiza el inicio de sesion o registro de usuario
const LandingPage = () => {
    const [hasAccount, setHasAccount] = useState(false);
    return (  
        <div className={styles.container}>
          <div className={styles.containerLogin}>
            <div className={styles.title}>
              <h1>ToDo Helper</h1>
                { hasAccount ? (
                  <>
                    <Login></Login>
                    <div className={styles.account}>
                      <p>Aun no tengo cuenta</p>
                      <button onClick={()=> setHasAccount(!hasAccount)}>Registrarse</button>
                    </div>
                  </>
                    ):(
                  <>
                    <Register></Register>
                    <div className={styles.account}>
                      <p>Ya tengo cuenta</p>
                      <button onClick={()=> setHasAccount(!hasAccount)}> Ingresar</button>
                    </div>
                  </>)
                }
            </div>
          </div>
       </div>
    );
}
 
export default LandingPage;
