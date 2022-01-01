import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import db, { storage } from '../../../firebase/firebase'

function TopAndEx({ language }) {

    const [topic, setTopic] = useState({
        name: '',
        image: '',
        description1: '',
        description2: '',
        description3: '',
        description4: ''
    })
    const [topOrEx, setTopOrEx] = useState('topic')
    const [progres, setProgres] = useState(0)
    const [imageUrl, setImageUrl] = useState('')
    const [disabled, setDisabled] = useState(true)

    function handleChange(e) {
        topic[e.target.id] = e.target.value
        setTopic({ ...topic, topic })
        if (topic.name !== '' && imageUrl !== '' && topic.description1 !== '') {
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
        
        const storageRef = ref(storage, `/topAndEx/${file.name}`)
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
                        description1: topic.description1,
                        description2: topic.description2,
                        description3: topic.description3,
                        description4: topic.description4
                    })
                } else {
                    await addDoc(collection(db, 'exercises-data'), {
                        name: topic.name,
                        image: imageUrl,
                        description1: topic.description1,
                        description2: topic.description2,
                        description3: topic.description3,
                        description4: topic.description4
                    })
                }
                break
            case 'Dutch':
                if (topOrEx === 'topic') {
                    await addDoc(collection(db, 'topics-data-Dutch'), {
                        name: topic.name,
                        image: imageUrl,
                        description1: topic.description1,
                        description2: topic.description2,
                        description3: topic.description3,
                        description4: topic.description4
                    })
                } else {
                    await addDoc(collection(db, 'exercises-data-Dutch'), {
                        name: topic.name,
                        image: imageUrl,
                        description1: topic.description1,
                        description2: topic.description2,
                        description3: topic.description3,
                        description4: topic.description4
                    })
                }
                break
            case 'Turkish':
                if (topOrEx === 'topic') {
                    await addDoc(collection(db, 'topics-data-Turkish'), {
                        name: topic.name,
                        image: imageUrl,
                        description1: topic.description1,
                        description2: topic.description2,
                        description3: topic.description3,
                        description4: topic.description4
                    })
                } else {
                    await addDoc(collection(db, 'exercises-data-Turkish'), {
                        name: topic.name,
                        image: imageUrl,
                        description1: topic.description1,
                        description2: topic.description2,
                        description3: topic.description3,
                        description4: topic.description4
                    })
                }
                break
        }
        setTopic({
            name: '',
            image: '',
            description1: '',
            description2: '',
            description3: '',
            description4: ''
        })
        setImageUrl('')
        setDisabled(true)
        setProgres(0)
    }
    return (
        <div>
            
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
                <input required type='textarea' id='description1' value={topic.description1} onChange={handleChange}></input>
                <input required type='textarea' id='description2' value={topic.description2} onChange={handleChange}></input>
                <input required type='textarea' id='description3' value={topic.description3} onChange={handleChange}></input>
                <input required type='textarea' id='description4' value={topic.description4} onChange={handleChange}></input>
                <button disabled={disabled} onClick={add}>ekle</button>
            </div>
        </div>
    )
}

export default TopAndEx
