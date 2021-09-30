import React, {useState, useEffect} from 'react';

export const ExamplePage = ()=> {

  const [data, setData] = useState([])

  // fetching data from Flask endpoint /api
  useEffect(()=> {
    fetch('/api').then(response => {
      if(response.ok){
        return response.json()
      }
    }).then(data => console.log(data))
  }, [])

  return(
    <>
      <h1> hi </h1>
    </>
  )
}
