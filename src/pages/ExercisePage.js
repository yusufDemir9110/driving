import { collection, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import db from '../firebase/firebase';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import '../styles/LessonPage.css'
import {useNavigate} from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap';

function ExercisePage() {
    const [exercises, setExercises] = useState([])
    const [current, setCurrent] = useState(0)
    const [userAnswers, setUserAnswers]=useState([])
    
    const length = exercises.length
    let topicName = useLocation()
    let newTopicName=topicName.state.state
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

    const handleClickAnswer = (e,index) =>{
        
        userAnswers[index] = e.target.textContent
        setUserAnswers( [...userAnswers] )
    }

    


    const finishExam=()=>{
        
        let answer = window.confirm('are you sure?')
        if(answer){
            navigate('/finalscore', {state:{userAnswers,newTopicName}})
            
        }
        
    }

    return (
        <div>
            <h1>HomeEnglish</h1>
            <h2>{topicName.state.state}</h2>
            <div>
                <div className='mainSlide'>
                    <FaArrowAltCircleLeft className='left-arrow' onClick={(e)=>prevSlide(e)} />
                    <FaArrowAltCircleRight className='right-arrow' onClick={(e)=>nextSlide(e)} />
                    {
                        exercises.map(({ id, data },index) => (
                            <div className={index===current?'data active':'data'} key={id}>
                                {
                                    index===current && 
                                    <div className='slide' >
                                        {data.head} 
                                        <img src={data.image}></img> 
                                        {data.question}
                                        <div>
                                            {data.rightOption}
                                        </div> 
                                        <div>
                                            <ListGroup>
                                            {(data.rightOption +','+ data.wrongOptions).split(',').sort(()=>0.5-Math.random()).map((option)=>
                                            (
                                                <ListGroupItem 
                                                    
                                                    onClick={(e) => handleClickAnswer(e,index)} key={id}>{option}</ListGroupItem>
                                            ))
                                            
                                            
                                            }
                                           </ListGroup>
                                            
                                        </div> 
                                        
                                        
                                        {index+1}
                                        
                                    </div>}
                                
                            </div>

                        ))
                    }
                </div>
            </div>
            <button onClick={finishExam}>Finish Exam</button>
        </div>
    )
}


export default ExercisePage;