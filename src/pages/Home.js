import { collection,onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import db from '../firebase/firebase';
import {Link, useParams} from 'react-router-dom'

function Home (){
    
    const[topics,setTopics] = useState([])
    const[exercises,setExercises] = useState([])
    useEffect(()=>{
        onSnapshot(collection(db,'topics-data'),snapshot=>
            setTopics(
                snapshot.docs.map(doc=>({
                    id:doc.id,
                    data:doc.data()
                }))
            )            
        )
        onSnapshot(collection(db,'exercises-data'),snapshot=>
            setExercises(
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
               <h1>Lessons</h1>
               <div>
                   <ul>
                   {
                       topics.map(({id,data})=>(
                            <Link to={'/lp'} state={{state:data.name}}>
                                <li key={id}>{data.name} <img src={data.image}></img> {data.description}</li>
                            </Link>                                                                                   
                       ))
                   }
                   </ul>
               </div> 
               <h1>Exercises</h1>  
               <div>
                   <ul>
                   {
                       exercises.map(({id,data})=>(
                            <Link to={'/ep'} state={{state:data.name}}>
                                <li key={id}>{data.name} <img src={data.image}></img> {data.description}</li>
                            </Link>                                                                                   
                       ))
                   }
                   </ul>
               </div>            
            </div>
        )
    }


export default Home;