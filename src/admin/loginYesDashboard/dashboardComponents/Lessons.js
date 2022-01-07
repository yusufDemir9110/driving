import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import db, { storage } from '../../../firebase/firebase'
import '../../../styles/Admin.css'


function Lessons({ language }) {

    const [lesson, setLesson] = useState({
        topic: '',
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
        const newTopic = lesson.topic
        switch (language) {
            case 'English':

                await addDoc(collection(db, 'lessons-data-' + newTopic), {
                    head: lesson.head,
                    image: imageUrl,
                    description: lesson.description
                })

                break
            case 'Dutch':

                await addDoc(collection(db, 'lessons-data-Dutch-' + newTopic), {
                    head: lesson.head,
                    image: imageUrl,
                    description: lesson.description
                })


                break
            case 'Turkish':

                await addDoc(collection(db, 'lessons-data-Turkish-' + newTopic), {
                    head: lesson.head,
                    image: imageUrl,
                    description: lesson.description
                })

                break
        }
        setLesson({
            topic: '',
            head: '',
            image: '',
            description: ''
        })
        setImageUrl('')
        setDisabled(true)
        setProgres(0)
    }

    return (
        <div className='bigContainer'>
            <h1>Lessons</h1>
            <h2>Language: {language}</h2>


            <div>
                <div className='topicImageLoader'>
                    <form onSubmit={imageHandler}>
                        <input type='file'></input>
                        <button type='submit'>Upload</button>
                    </form>
                    <h2>Uploaded {progres} %</h2>
                </div>
                <div className='topAndExLabels'>
                    <div>
                        <label for='topic'>Lesson Topic
                            <input required type='text' id='topic' value={lesson.topic} onChange={handleChange} placeholder='Write exactly'></input>
                        </label>
                        <label for='image'>Lesson Image
                            <input required disabled type='url' id='image' value={imageUrl} onChange={handleChange} placeholder='imageUrl'></input>
                        </label>
                    </div>
                    <div>
                        <label for='head'>Lesson Head
                            <input required type='text' id='head' value={lesson.head} onChange={handleChange} placeholder='head'></input>
                        </label>

                        <div>
                        <div className='textAreaArea'>Description</div>
                            <textarea className='textAreaArea' required rows='8' id='description' value={lesson.description} onChange={handleChange} placeholder='lesson'></textarea>
                        
                        </div>
                        
                    </div>

                </div>

                <div className='topAddButtonCont'>
                    <button disabled={disabled} onClick={add}>ekle</button>
                </div>
            </div>

        </div>
    )
}

export default Lessons
