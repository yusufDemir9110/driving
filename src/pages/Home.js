import { collection, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import db from '../firebase/firebase';
import { Link } from 'react-router-dom'
import '../styles/HomePage.css'
import { Col, Row } from 'reactstrap'
import Navi from '../components/Navi'
import Footer from '../components/Footer';

function Home() {

    const [topics, setTopics] = useState([])
    const [exercises, setExercises] = useState([])
    useEffect(() => {
        onSnapshot(collection(db, 'topics-data'), snapshot =>
            setTopics(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        )
        onSnapshot(collection(db, 'exercises-data'), snapshot =>
            setExercises(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        )

    }, [])

    return (
        <div>
            <Navi />
            <h1>HomeEnglish</h1>
            <h1>Lessons</h1>
            <div className='topic_section'>
                <Row>

                    {
                        topics.map(({ id, data }) => (
                            <Col xs='12' sm='4' md='3' lg='2'>
                                <Link to={'/lp'} state={{ state: data.name }}>
                                    
                                    <div key={id} className='topic' style={{ backgroundImage: 'url(' + data.image + ')' }}>
                                        
                                        <div className='topic_name'>{data.name}</div>
                                        <div className='topic_desc_bg'>
                                            <div className='topic_desc' id='topic_desc_1'>{data.description1}</div>
                                            <div className='topic_desc' id='topic_desc_2'>{data.description2}</div>
                                            <div className='topic_desc' id='topic_desc_3'>{data.description3}</div>
                                            <div className='topic_desc' id='topic_desc_4'>{data.description4}</div>
                                        </div>


                                    </div>


                                </Link>

                            </Col>
                        ))

                    }

                </Row>

            </div>
            <h1>Exercises</h1>
            <div className='topic_section'>
                <Row>

                    {
                        exercises.map(({ id, data }) => (
                            <Col xs='12' sm='4' md='3' lg='2'>
                                <Link to={'/ep'} state={{ state: data.name }}>
                                    
                                    <div key={id} className='topic' style={{ backgroundImage: 'url(' + data.image + ')' }}>
                                        
                                        <div className='topic_name'>{data.name}</div>
                                        <div className='topic_desc_bg'>
                                            <div className='topic_desc' id='topic_desc_1'>{data.description1}</div>
                                            <div className='topic_desc' id='topic_desc_2'>{data.description2}</div>
                                            <div className='topic_desc' id='topic_desc_3'>{data.description3}</div>
                                            <div className='topic_desc' id='topic_desc_4'>{data.description4}</div>
                                        </div>


                                    </div>


                                </Link>

                            </Col>
                        ))

                    }

                </Row>

            </div>
            <Footer/>
        </div>
    )
}


export default Home;