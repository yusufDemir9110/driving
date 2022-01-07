
import React, { useState } from 'react'

import Lessons from '../dashboardComponents/Lessons'
import TopAndEx from '../dashboardComponents/TopAndEx'
import Exercises from '../dashboardComponents/Exercises'
import Carslider from '../dashboardComponents/Carslider'
import '../../../styles/Admin.css'

function Dashboard() {
    
    const [language, setLanguage] = useState('English')
    
    function chooseLangTopic(e) {
        const selectedLang = e.target.value
        setLanguage(selectedLang)

    }
    

    return (
        <div>
            <div className='selectLanguage'>
                <select id="languages" size="3" onChange={(e) => chooseLangTopic(e)} value={language}>
                    <option id="English" value="English">English</option>
                    <option id="Dutch" value="Dutch">Dutch</option>
                    <option id="Turkish" value="Turkish">Turkish</option>
                </select>
                <h3>chosen language<strong> {language}</strong></h3 >
            </div>
            
            <TopAndEx language={language}/>
            <Lessons language={language}/>
            <Exercises language={language}/>
            <Carslider language={language}/>
        </div>
    )
}

export default Dashboard
