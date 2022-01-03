import React, { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../firebase/firebase';
import { useLocation } from 'react-router-dom'
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import Navi from '../components/Navi'
import '../styles/ExercisePageFinal.css'
import $ from 'jquery'

function ExercisePageFinal() {
    const { state } = useLocation()
    const [results, setResults] = useState([])
    const [score, setScore] = useState(0)
    const [analysis, setAnalysis] = useState(false)
    const [situation,setSituation] = useState(false)

    useEffect(() => {
        onSnapshot(collection(db, 'exercises-data-' + state.newTopicName), snapshot =>
            setResults(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )

        )


    }, [])

    const calculateScore = () => {

        let newScore = 0
        for (let i = 0; i < results.length; i++) {
            if (state.userAnswers[i] == results[i].data.rightOption) {
                newScore = newScore + 1
            }
        }
        setScore(newScore)
    }
    const showAnalysis = () => {
        setAnalysis(true)
        
    }

    return (
        <div>
            <Navi />
            <main className='main'>
                <div className='scoreContainer'>
                    <button className='calculate' onClick={calculateScore}>Calculate Score</button>
                    <div className='score'>{score}</div>
                </div>
               
                <div className='scoreContainer'>
                    <button className='calculate' onClick={showAnalysis}>Analysis</button>
                </div>
                {analysis === true ?
                    <Row>
                        <Col xs='12'>
                            <div>
                                {
                                    results.map(({ id, data }, index) => {
                                        return (
                                            <div className='queContainer' key={id}>
                                                <div className='que'>{data.question}</div>
                                                <div>
                                                    <Row>
                                                        <Col xs='6'>
                                                            <div>
                                                            
                                                                <span className='answerHead'>Your Answer</span>
                                                                <div className='answer'>
                                                                {
                                                                    (state.userAnswers[index] === results[index].data.rightOption)?<div className='templateCorrect'></div>:<div className='templateWrong'></div>
                                                                }
                                                                    {state.userAnswers[index]}</div>
                                                                
                                                            </div>
                                                        </Col>
                                                        <Col xs='6'>
                                                            <div>
                                                                <span className='answerHead'>Correct Answer</span>
                                                                <div className='answer'>{data.rightOption}</div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                
                                            </div>
                                            
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                    : null}
            </main>




        </div>
    )
}

export default ExercisePageFinal
