import React, { useState } from 'react'
import { addDoc, collection} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import db, { storage } from '../../../firebase/firebase'

function TopAndEx({ language }) {

    const [topic, setTopic] = useState({
        name: '',
        image: '',
        description: ''
    })
    const [topOrEx, setTopOrEx] = useState('topic')
    const [progres, setProgres] = useState(0)
    const [imageUrl, setImageUrl] = useState('')
    const [disabled, setDisabled] = useState(true)

    function handleChange(e) {
        topic[e.target.id] = e.target.value
        setTopic({ ...topic, topic })
        if (topic.name !== '' && imageUrl !== '' && topic.description !== '') {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    function chooseTopOrEx(e) {
        const selectedTopOrEx = e.target.value
        setTopOrEx(selectedTopOrEx)
    }

    const imageHandler = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        uploadFiles(file)
    }

    const uploadFiles = (file) => {
        if (!file) return
        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

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
        switch (language) {
            case 'English':
                if (topOrEx === 'topic') {
                    await addDoc(collection(db, 'topics-data'), {
                        name: topic.name,
                        image: imageUrl,
                        description: topic.description
                    })
                } else {
                    await addDoc(collection(db, 'exercises-data'), {
                        name: topic.name,
                        image: imageUrl,
                        description: topic.description
                    })
                }
                break
            case 'Dutch':
                if (topOrEx === 'topic') {
                    await addDoc(collection(db, 'topics-data-Dutch'), {
                        name: topic.name,
                        image: imageUrl,
                        description: topic.description
                    })
                } else {
                    await addDoc(collection(db, 'exercises-data-Dutch'), {
                        name: topic.name,
                        image: imageUrl,
                        description: topic.description
                    })
                }
                break
            case 'Turkish':
                if (topOrEx === 'topic') {
                    await addDoc(collection(db, 'topics-data-Turkish'), {
                        name: topic.name,
                        image: imageUrl,
                        description: topic.description
                    })
                } else {
                    await addDoc(collection(db, 'exercises-data-Turkish'), {
                        name: topic.name,
                        image: imageUrl,
                        description: topic.description
                    })
                }
                break
        }
        setTopic({
            name: '',
            image: '',
            description: ''
        })
        setImageUrl('')
        setDisabled(true)
        setProgres(0)
    }
    return (
        <div>
            <h1>language {language}</h1>
            <div>
                <select id="toporex" size="2" onChange={(e) => chooseTopOrEx(e)} value={topOrEx}>
                    <option id="topic" value="topic">Topic</option>
                    <option id="exercise" value="exercise">Exercise</option>

                </select>
            </div>
            <h3>topic or exercise {topOrEx}</h3 >
            <div>
                <div>
                    <form onSubmit={imageHandler}>
                        <input type='file'></input>
                        <button type='submit'>Upload</button>
                    </form>
                    <h2>Uploaded {progres} %</h2>
                </div>
                <input required type='text' id='name' value={topic.name} onChange={handleChange}></input>
                <input required disabled type='url' id='image' value={imageUrl} onChange={handleChange}></input>
                <input required type='textarea' id='description' value={topic.description} onChange={handleChange}></input>
                <button disabled={disabled} onClick={add}>ekle</button>
            </div>
        </div>
    )
}

export default TopAndEx
