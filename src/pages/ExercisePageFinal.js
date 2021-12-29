import React, { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../firebase/firebase';
import { useLocation } from 'react-router-dom'
import { Col, ListGroup, ListGroupItem,Row } from 'reactstrap';


function ExercisePageFinal() {
    const { state } = useLocation()
    const [results, setResults] = useState([])
    const [score,setScore]=useState(0)

    
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
    
    const calculateScore=()=>{
        
        let newScore=0
        for(let i=0;i<results.length;i++){         
            if(state.userAnswers[i]==results[i].data.rightOption){
                newScore=newScore+1
            }
        }
        setScore(newScore)
    }
 
    return (
        <div>
            
            <Row>
            <Col xs='6'>
            <h1>Your Answers</h1>
            <ListGroup>
            {
                state.userAnswers.map((userAnswer,index) => (
                   
                        
                            <ListGroupItem key={index}>
                                {userAnswer}
                                
                                
                                
                            </ListGroupItem> 
                            

                                           
                ))
               
            }
            
             </ListGroup>
            </Col>
                <Col xs='6'>
                    <h1>Correct Answers</h1>
                <ListGroup>
            {
                results.map(({ id, data }) => {
                    return(
                   
                        
                            <ListGroupItem key={id}>
                                
                                {data.rightOption}
                                
                                
                            </ListGroupItem> 
                            

                                           
                )})
               
            }
            
             </ListGroup>
                </Col>
            
             
            </Row>
            
            
            <button onClick={calculateScore}>goster</button>
             {score}
             
        </div>
    )
}

export default ExercisePageFinal
