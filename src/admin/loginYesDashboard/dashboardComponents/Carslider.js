import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import db, { storage } from '../../../firebase/firebase'

function Carslider({ language }) {

    const [slideItem, setSlideItem] = useState({
        altText: '',
        image: '',
        caption:''
    })
    const [disabled, setDisabled] = useState(true)
    const [progres, setProgres] = useState(0)
    const [imageUrl, setImageUrl] = useState('')

    function handleChange(e) {
        slideItem[e.target.id] = e.target.value
        setSlideItem({ ...slideItem, slideItem })

        if (imageUrl !== '' && slideItem.altText !== '' && slideItem.caption !== '') {
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
        const storageRefLes = ref(storage, `/carslider/${image.name}`)
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
        switch (language) {
            case 'English':

                await addDoc(collection(db, 'Carslider-data'), {
                    altText: slideItem.altText,
                    image: imageUrl,
                    caption: slideItem.caption
                })

                break
            case 'Dutch':

                await addDoc(collection(db, 'Carslider-data-Dutch'), {
                    altText: slideItem.altText,
                    image: imageUrl,
                    caption: slideItem.caption
                })


                break
            case 'Turkish':

                await addDoc(collection(db, 'Carslider-data-Turkish'), {
                    altText: slideItem.altText,
                    image: imageUrl,
                    caption: slideItem.caption
                })

                break
        }
        setSlideItem({
            altText: '',
            caption: '',
            image: ''
        })
        setImageUrl('')
        setDisabled(true)
        setProgres(0)
    }

    return (
        <div className='bigContainer'>
            <h1>Carslider</h1>
            <h2>{language}</h2>


            <div>
                <div>
                    <form onSubmit={imageHandler}>
                        <input type='file'></input>
                        <button type='submit'>Upload</button>
                    </form>
                    <h2>Uploaded {progres} %</h2>
                </div>
                <input required type='text' id='altText' value={slideItem.altText} onChange={handleChange} placeholder='altText'></input>
                <input required disabled type='url' id='image' value={imageUrl} onChange={handleChange}></input>
                <input required type='text' id='caption' value={slideItem.caption} onChange={handleChange} placeholder='caption'></input>
                
                
                <button disabled={disabled} onClick={add}>ekle</button>
            </div>
        </div>
    )
}

export default Carslider
