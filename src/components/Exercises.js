import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import db from '../firebase/firebase'
function Exercises() {
    const [exercise, setExercise] = useState({
        name: '',
        image: '',
        description: ''
    })
    const [language, setLanguage] = useState('English')
    function handleChange(e) {
        exercise[e.target.id] = e.target.value
        setExercise({ ...exercise, exercise })
    }
    function chooseLangTopic(e){
        const selectedLang=e.target.value
        setLanguage(selectedLang)
        
    }
    const add = async (event) => {
        event.preventDefault()
        switch(language){
            case 'English':
                await addDoc(collection(db, 'exercises-data'), {
                    name: exercise.name,
                    image: exercise.image,
                    description: exercise.description
                })
                break
            case 'Dutch':
                await addDoc(collection(db, 'exercises-data-Dutch'), {
                    name: exercise.name,
                    image: exercise.image,
                    description: exercise.description
                })
                break
            case 'Turkish':
                await addDoc(collection(db, 'topics-data-Turkish'), {
                    name: exercise.name,
                    image: exercise.image,
                    description: exercise.description
                })
                break
        }
        
        setExercise({
            name: '',
            image: '',
            description: ''
        })
    }
    
    return (
        <div>
            <div>
                <select id="languages" size="3" onChange={(e)=>chooseLangTopic(e)} value={language}>
                    <option id="English" value="English">English</option>
                    <option id="Dutch" value="Dutch">Dutch</option>
                    <option id="Turkish" value="Turkish">Turkish</option>
                    
                </select>
               
            </div>
            <h3>chosen language {language}</h3 >
            <div>
               
                <input type='text' id='name' value={exercise.name} onChange={handleChange}></input>
                <input type='url' id='image' value={exercise.image} onChange={handleChange}></input>
                <input type='textarea' id='description' value={exercise.description} onChange={handleChange}></input>
                <button onClick={add}>ekle</button>
            </div>
            


        </div>
    )
}

export default Exercises
