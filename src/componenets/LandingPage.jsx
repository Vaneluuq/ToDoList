import React from 'react'
import styles from '../CSS/landingPage.module.css'
import Login from './Login'
import Register from './Register';
import { useState } from 'react';

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