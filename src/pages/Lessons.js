import React, {useState} from 'react'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import db, { storage } from '../firebase/firebase'


function Lessons({language}) {
    const [lesson,setLesson] = useState({
        description:'',
        image:''
    })
    
    const [disabled,setDisabled]=useState(true)
    return (
        <div>
            <h1>Lessons</h1>
            <h2>{language}</h2>
            {/* <div>
            <div>
                    <form onSubmit={imageHandler}>
                        <input type='file'></input>
                        <button type='submit'>Upload</button>
                    </form>
                    <h2>Uploaded {progres} %</h2>
                </div>
                <input required disabled type='url' id='image' value={imageUrl} onChange={handleChange}></input>
                <input required type='textarea' id='description' value={topic.description} onChange={handleChange}></input>
                <button disabled={disabled} onClick={add}>ekle</button>
            </div> */}
        </div>
    )
}

export default Lessons
