import React from 'react';
import { useState, useEffect } from 'react';


function CatFacts() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
      fetch("https://catfact.ninja/facts?limit=${bred}")
        .then(res => res.json())
        .then((result) => {
          setIsLoaded(true);
          setItems(result.data);
           },
          (error) => {
            console.log(error)
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])

    console.log(items)
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
      <div>
         {items.map(item => (
              <div key={item.id}>
                 <p>{item.fact}</p>
              </div>
            ))}
      </div>
      );
    }
 }

  export default CatFacts