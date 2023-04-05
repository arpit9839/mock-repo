import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [apidata, setApiData] = useState([]);
  const [currentIdIndex, setCurrentIdIndex] = useState(0);

  const fetchApi = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) {
      throw new Error("data not found");
    } else {
      return res.json();
    }
  };

  useEffect(() => {
    const interval = setTimeout(() => {

      const id = currentIdIndex +1 ;
      
      console.log(currentIdIndex)
      fetchApi(id)
        .then((data) => {
          setApiData([ data]);
          setCurrentIdIndex((id));
          console.log("arpit"+currentIdIndex )
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
    return () => clearTimeout(interval);
  }, [currentIdIndex]);

  return (
    <div>
      {apidata.length > 0 ? (
        <ul>
          {apidata.map((data) => (
            <li key={data.id}>
              <p><b>name:</b>{data.name}</p>
              <p><b>email:</b>{data.email}</p>
              <p><b>address:</b>{apidata.address.map((ad)=>{
                return(
                       <>
                          <h1>
                          street:{ad.street}
                          </h1>
                        
                        </>     
                      )
                         
              
            
                               }) }</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;