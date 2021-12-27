
import React, { useState } from 'react'

import Lessons from '../dashboardComponents/Lessons'
import TopAndEx from '../dashboardComponents/TopAndEx'
import Exercises from '../dashboardComponents/Exercises'


function Dashboard() {
    
    const [language, setLanguage] = useState('English')
    
    function chooseLangTopic(e) {
        const selectedLang = e.target.value
        setLanguage(selectedLang)

    }
    

    return (
        <div>
            <div>
                <select id="languages" size="3" onChange={(e) => chooseLangTopic(e)} value={language}>
                    <option id="English" value="English">English</option>
                    <option id="Dutch" value="Dutch">Dutch</option>
                    <option id="Turkish" value="Turkish">Turkish</option>
                </select>
            </div>
            <h3>chosen language {language}</h3 >
            <TopAndEx language={language}/>
            <Lessons language={language}/>
            <Exercises language={language}/>

        </div>
    )
}

export default Dashboard
