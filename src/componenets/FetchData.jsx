import React from 'react';
import { useState, useEffect } from 'react';


function CatFacts({setItems}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
      fetch("https://catfact.ninja/facts?")
        .then(res => res.json())
        .then((result) => {
          setIsLoaded(true);
          setItems(result.data);
        },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, []);
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
       <div>
         
       </div>
      );
    }
 }

  export default CatFacts