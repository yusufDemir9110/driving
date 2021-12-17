import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import db from '../firebase/firebase'
function Topics() {
    const [topic, setTopic] = useState({
        name: '',
        image: '',
        description: ''
    })
    const [language, setLanguage] = useState('English')
    function handleChange(e) {
        topic[e.target.id] = e.target.value
        setTopic({ ...topic, topic })
    }
    function chooseLangTopic(e){
        const selectedLang=e.target.value
        setLanguage(selectedLang)
        
    }
    const add = async (event) => {
        event.preventDefault()
        switch(language){
            case 'English':
                await addDoc(collection(db, 'topics-data'), {
                    name: topic.name,
                    image: topic.image,
                    description: topic.description
                })
                break
            case 'Dutch':
                await addDoc(collection(db, 'topics-data-Dutch'), {
                    name: topic.name,
                    image: topic.image,
                    description: topic.description
                })
                break
            case 'Turkish':
                await addDoc(collection(db, 'topics-data-Turkish'), {
                    name: topic.name,
                    image: topic.image,
                    description: topic.description
                })
                break
        }
        
        setTopic({
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
               
                <input type='text' id='name' value={topic.name} onChange={handleChange}></input>
                <input type='url' id='image' value={topic.image} onChange={handleChange}></input>
                <input type='textarea' id='description' value={topic.description} onChange={handleChange}></input>
                <button onClick={add}>ekle</button>
            </div>
            


        </div>
    )
}

export default Topics
