import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import db, { storage } from '../../../firebase/firebase'

function Exercises({ language }) {

    const [exercise, setExercise] = useState({
        topic: '',
        head: '',
        question: '',
        image: '',
        rightOption: '',
        wrongOptions: ''
    })
    const [disabled, setDisabled] = useState(true)
    const [progres, setProgres] = useState(0)
    const [imageUrl, setImageUrl] = useState('')

    function handleChange(e) {
        exercise[e.target.id] = e.target.value
        setExercise({ ...exercise, exercise })

        if (imageUrl !== '' && exercise.question !== '' && exercise.head !== '') {
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
        const storageRefLes = ref(storage, `/lesAndEx/${image.name}`)
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
        const newExercise = exercise.topic
      
        switch (language) {
            case 'English':

                await addDoc(collection(db, 'exercises-data-' + newExercise), {
                    head: exercise.head,
                    image: imageUrl,
                    question: exercise.question,
                    rightOption: exercise.rightOption,
                    wrongOptions: exercise.wrongOptions
                })

                break
            case 'Dutch':

                await addDoc(collection(db, 'exercises-data-Dutch-' + newExercise), {
                    head: exercise.head,
                    image: imageUrl,
                    question: exercise.question,
                    rightOption: exercise.rightOption,
                    wrongOptions: exercise.wrongOptions
                })


                break
            case 'Turkish':

                await addDoc(collection(db, 'exercises-data-Turkish-' + newExercise), {
                    head: exercise.head,
                    image: imageUrl,
                    question: exercise.question,
                    rightOption: exercise.rightOption,
                    wrongOptions: exercise.wrongOptions
                })

                break
        }
        setExercise({
            topic: '',
            head: '',
            image: '',
            question: '',
            rightOption: '',
            wrongOptions: ''
        })
        setImageUrl('')
        setDisabled(true)
        setProgres(0)
    }

    return (
        <div>
            <h1>exercises</h1>
            <h2>{language}</h2>


            <div>
                <div>
                    <form onSubmit={imageHandler}>
                        <input type='file'></input>
                        <button type='submit'>Upload</button>
                    </form>
                    <h2>Uploaded {progres} %</h2>
                </div>
                <input required type='text' id='topic' value={exercise.topic} onChange={handleChange}></input>
                <input required type='text' id='head' value={exercise.head} onChange={handleChange}></input>
                <input required disabled type='url' id='image' value={imageUrl} onChange={handleChange}></input>
                <input required type='textarea' id='question' value={exercise.question} onChange={handleChange}></input>
                <input required type='text' id='rightOption' value={exercise.rightOption} onChange={handleChange}></input>
                <input required type='text' id='wrongOptions' value={exercise.wrongOptions} onChange={handleChange}></input>
                
                <button disabled={disabled} onClick={add}>ekle</button>
            </div>
        </div>
    )
}

export default Exercises
