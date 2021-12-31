import React, { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../firebase/firebase';
import { useLocation } from 'react-router-dom'
import { Col, ListGroup, ListGroupItem,Row } from 'reactstrap';


function ExercisePageFinal() {
    const { state } = useLocation()
    const [results, setResults] = useState([])
    const [score,setScore]=useState(0)
    const [analysis, setAnalysis]=useState(false)

    
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
    const showAnalysis = ()=>{
        setAnalysis(true)
    }
 
    return (
        <div>
            <h1>finalPage</h1>
            <button onClick={calculateScore}>Calculate Score</button>
             {score}
             <button onClick={showAnalysis}>Analysis</button>
             {analysis===true? 
            <Row>
            
                <Col xs='12'>
                    <h1>Correct Answers</h1>
                <ListGroup>
            {
                results.map(({ id, data },index) => {
                    return(
                   
                        
                            <ListGroupItem key={id}>
                                <div>{data.question}</div>
                                <div>
                                    <Row>
                                    <Col xs='6'>
                                    <div>
                                        <div>Your Answer</div>
                                        <div>{state.userAnswers[index]}</div>
                                    </div>
                                    </Col>
                                    <Col xs='6'>
                                    <div>
                                        <div>Correct Answer</div>
                                        <div>{data.rightOption}</div>
                                    </div>
                                    </Col>
                                    </Row>                             
                                </div>                               
                            </ListGroupItem> 
                            

                                           
                )})
               
            }
            
             </ListGroup>
                </Col>
            
             
            </Row>
:null}
            
            
             
        </div>
    )
}

export default ExercisePageFinal
