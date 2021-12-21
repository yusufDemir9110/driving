import { collection,onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import db from '../firebase/firebase';


function Home (){
    const[topics,setTopics] = useState([])
    useEffect(()=>{
        onSnapshot(collection(db,'topics-data'),snapshot=>
            setTopics(
                snapshot.docs.map(doc=>({
                    id:doc.id,
                    data:doc.data()
                }))
            )
            
        )
    
    },[])
   
        return (
            <div>
               <h1>HomeEnglish</h1>
               <div>
                   <ul>
                   {
                       topics.map(({id,data})=>(                          
                               <li key={id}>{data.name} <img src={data.image}></img> {data.description}</li>                          
                       ))
                   }
                   </ul>
               </div>               
            </div>
        )
    }


export default Home;