import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import db, { storage } from '../../../firebase/firebase'

function Lessons({ language }) {
   
    const [lesson, setLesson] = useState({
        topic:'',
        head: '',
        description: '',
        image: ''
    })
    const [disabled, setDisabled] = useState(true)   
    const [progres, setProgres] = useState(0)
    const [imageUrl, setImageUrl] = useState('')

    function handleChange(e) {
        lesson[e.target.id] = e.target.value
        setLesson({ ...lesson, lesson })
        
        if (imageUrl !== '' && lesson.description !== '' && lesson.head !== '') {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
        
    }
    

    const imageHandler = (e) => {
        e.preventDefault()
        const image = e.target[0].files[0]
        uploadImages(image)
    }

    const uploadImages = (image) => {
        const storageRefLes = ref(storage, `/images/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRefLes, image)
        uploadTask.on('state_changed', (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setProgres(prog)
        }, (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => setImageUrl(url, imageUrl))
            }

        )
    }

    const add = async (event) => {
        event.preventDefault()
        const newTopic=lesson.topic
        switch (language) {
            case 'English':

                await addDoc(collection(db, 'lessons-data-'+newTopic), {
                    head: lesson.head,
                    image: imageUrl,
                    description: lesson.description
                })

                break
            case 'Dutch':

                await addDoc(collection(db, 'lessons-data-Dutch-'+newTopic), {
                    head: lesson.head,
                    image: imageUrl,
                    description: lesson.description
                })


                break
            case 'Turkish':

                await addDoc(collection(db, 'lessons-data-Turkish-'+newTopic), {
                    head: lesson.head,
                    image: imageUrl,
                    description: lesson.description
                })

                break
        }
        setLesson({
            topic:'',
            head: '',
            image: '',
            description: ''
        })
        setImageUrl('')
        setDisabled(true)
        setProgres(0)
    }

    return (
        <div>
            <h1>Lessons</h1>
            <h2>{language}</h2>
            
            
            <div>
                <div>
                    <form onSubmit={imageHandler}>
                        <input type='file'></input>
                        <button type='submit'>Upload</button>
                    </form>
                    <h2>Uploaded {progres} %</h2>
                </div>
                <input required type='text' id='topic' value={lesson.topic} onChange={handleChange}></input>
                <input required type='text' id='head' value={lesson.head} onChange={handleChange}></input>
                <input required disabled type='url' id='image' value={imageUrl} onChange={handleChange}></input>
                <input required type='textarea' id='description' value={lesson.description} onChange={handleChange}></input>
                <button disabled={disabled} onClick={add}>ekle</button>
            </div>
        </div>
    )
}

export default Lessons
