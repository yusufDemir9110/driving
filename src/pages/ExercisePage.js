import { collection, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import db from '../firebase/firebase';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import '../styles/ExercisePage.css'
import { useNavigate } from 'react-router-dom'
import $ from 'jquery'

function ExercisePage() {
    const [exercises, setExercises] = useState([])
    const [current, setCurrent] = useState(0)
    const [userAnswers, setUserAnswers] = useState([])
    
    const length = exercises.length
    let topicName = useLocation()
    let newTopicName = topicName.state.state
    const navigate = useNavigate()

    const nextSlide = (e) => {
        e.preventDefault()
        setCurrent(current === length - 1 ? 0 : current + 1)

    }
    const prevSlide = (e) => {
        e.preventDefault()
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
    }, [])
    const handleClickAnswer = (e, index) => {        
        userAnswers[index] = e.target.textContent
        setUserAnswers([...userAnswers])
        
    }
    const changeAnswer = (e,index)=>{
        userAnswers[index]=''
        setUserAnswers([...userAnswers])
    }
    const finishExam = () => {

        let answer = window.confirm('are you sure?')
        if (answer) {
            navigate('/finalscore', { state: { userAnswers, newTopicName } })
        }
    }
    return (
        <div className='slideBody'>

            <div className='mainSlide'>
                <FaArrowAltCircleLeft className='left-arrow' onClick={(e) => prevSlide(e)} />
                <FaArrowAltCircleRight className='right-arrow' onClick={(e) => nextSlide(e)} />
                {
                    exercises.map(({ id, data }, index) => (
                        <div className={index === current ? 'data active' : 'data'} key={id}>
                            {
                                index === current &&
                                <div className='slide' >
                                    <div className='dataHead'><div>{data.head}</div> <div>soru {index + 1}</div></div>
                                    <div className='dataImage'><img src={data.image}></img></div>
                                    <div className='dataQue'>{data.question}</div>
                                    <div>
                                        {
                                            userAnswers[index]?
                                            <div><div className='options'>{userAnswers[index]}</div>
                                            <button onClick={(e) => changeAnswer(e,index)}>Change Answer</button>
                                            </div>
                                                :
                                            (data.rightOption + ',' + data.wrongOptions).split(',').sort(()=>0.5-Math.random()).map((option) =>
                                                (
                                                    <div
                                                        key={id}
                                                        className='options'
                                                        id={option}
                                                        onClick={(e) => handleClickAnswer(e, index)}
                                                    >
                                                        {option}                                                       
                                                    </div>
                                                    
                                                ))                                                                                      
                                        }
                                        
                                    </div>
                                </div>}
                        </div>
                    ))
                }
            </div>
            <div className='finishExamContainer'>
                <button className='finishExam' onClick={finishExam}>Finish Exam</button>
            </div>

        </div>
    )
}


export default ExercisePage;