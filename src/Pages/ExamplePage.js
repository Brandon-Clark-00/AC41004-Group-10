import React, { Component, useState, useEffect } from 'react'

export default class ExamplePage extends Component{ 
  constructor(props){
  super(props);
  // this.getUsers()
  }
render(){
return(
  <div></div>
)
}
}
//   const [data, setData] = useState([])

//   // fetching data from Flask endpoint /api
//   useEffect(()=> {
//     fetch('/api').then(response => {
//       if(response.ok){
//         return response.json()
//       }
//     }).then(data => console.log(data))
//   }, [])

//   return(
//         <div>
//           <ul>
//             {this.getUsers(item => (
//               <li key={item}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       )
//     }



// }


// render() {
//   return(
//     <div>
//       <ul>
//         {this.getUsers(item => (
//           <li key={item}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }
// }

  // getUsers(){
  // console.log("fetching data");
  // const reqData = {
  //   method: 'GET', 
  //   headers: { 'Content-Type': 'application/json'},
  // };
  // fetch('/api', reqData).then(response=> {
  //   response.json().then(json=> {
  //     if(json == "Unable to fetch data") {
  //       console.log("No such data");
  //     } else {
  //       console.log(json);
  //       this.setState({ data: json})
  //       return json
  //     }
  //   });
  // });
// export const ExamplePage = ()=> {



//   // useEffect(() => {
//   //   fetch('/api').then(response => 
//   //     response.json().then(data => {
//   //        setData(data);
//   //       })
//   //       );
//   // }, []);

//   return(
//     <>
//       {console.log(data)}
//     </>
//   )
  
//   }
