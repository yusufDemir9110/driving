import { collection, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import db from '../firebase/firebase';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import '../styles/LessonPage.css'

function ExercisePage() {
    const [exercises, setExercises] = useState([])
    const [current, setCurrent] = useState(0)
    const length = exercises.length
    let topicName = useLocation()

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }


    useEffect(() => {
        onSnapshot(collection(db, 'exercises-data-' + topicName.state.state), snapshot =>
            setExercises(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )

        )
        console.log(topicName.state.state)
    }, [])

    return (
        <div>
            <h1>HomeEnglish</h1>
            <h2>{topicName.state.state}</h2>
            <div>
                <div className='mainSlide'>
                    <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
                    <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
                    {
                        exercises.map(({ id, data },index) => (
                            <div className={index===current?'data active':'data'} key={id}>
                                {
                                    index===current && 
                                    <div className='slide' >
                                        {data.head} 
                                        <img src={data.image}></img> 
                                        {data.description}
                                    </div>}
                                
                            </div>

                        ))
                    }
                </div>
            </div>
        </div>
    )
}


export default ExercisePage;