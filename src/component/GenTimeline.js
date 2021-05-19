import React from 'react'
import 'bulma/css/bulma.css'
import './GenTimeline.css'
import Activity from './Activity'

function GenTimeline({ date, information, handleDeleteTimeline }) {
    
    const changeDateFormat = () => {
        const dd = date.slice(8, 10);
        const mm = date.slice(5, 7);
        const yyyy = date.slice(0, 4);
        return `${dd}/${mm}/${yyyy}`;
    }

    return (
        <div className='grid-container'>
            <div className='container-date'>
                <p className="text">{changeDateFormat()}</p>
            </div>
            <div className='info'>
            {information.map((info) => {
                return <Activity key={info.time} {...info} date={date} handleDeleteTimeline={handleDeleteTimeline} />
            })}
            </div>
        </div>
        
    )
}

export default GenTimeline
