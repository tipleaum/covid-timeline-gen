import './App.css';
import Form from './component/Form';
import GenTimeline from './component/GenTimeline';
import { useState, useEffect } from 'react'

function App() {
  const defaultPersonal = [
    {
      gender: null,
      age: null,
      career: null,
    }
  ]
  const [personal, setPersonal] = useState(JSON.parse(localStorage.getItem('personal')));
  const [timeline, setTimeline] = useState(JSON.parse(localStorage.getItem('timeline')));

  const renderTimeline = () => {
    const [{ gender, age, career}] = personal;
    return (
    <div className='testgrid'>
    <div>
      <div className='timeline-name-container'>
        <h1 className='h1-timeline'>Timeline</h1>
      </div>
      <div className='big-container'>
        <div className='container-rounded'>
          <h2 className='h2-timeline'>ผู้ป่วย{gender} อายุ {age} ปี </h2>
          <h4 className='h4-timeline'>อาชีพ{career}</h4>
        </div>
      </div>
    </div>
    <div>
      {timeline.map((day) => {
        return <GenTimeline key={day.date} {...day} handleDeleteTimeline={handleDeleteTimeline}/>
      })}
    </div>
    </div>
    )
  }

  const renderEmptyTimeline = () => (
    <div className='testgrid'>
      <div>
        <div className='no-timeline'>
          <h1 className='h1-timeline'>กรุณากรอกข้อมูลไทม์ไลน์ของท่าน</h1>
        </div>
      </div>
    </div>
  )

  const handleDeleteTimeline = (inputDate, timer) => {
    const results = timeline.map((day) => {
      if (day.date === inputDate) {
        const resultfilter = day.information.filter((info) => info.time !== timer)
        day.information = resultfilter
      }
      return day
    })

    const result2 = results.filter((res) => res.information.length)

    setTimeline(result2);
    sorting(result2);
  }

  const sorting = (tempTimeline) => {
    const resultSortInfo = tempTimeline.map((day) => {
      const resultSort = day.information.sort((a, b) => new Date(`${day.date}T${a.time}`) - new Date(`${day.date}T${b.time}`))
      day.information = resultSort
      return day
    })
    
    const sortedActivities = resultSortInfo.sort((a, b) => new Date(a.date) - new Date(b.date))
    setTimeline(sortedActivities)
  }

  const saveLocal = () => {
    localStorage.setItem('personal', JSON.stringify(personal));
    localStorage.setItem('timeline', JSON.stringify(timeline));
  }

  const getLocal = () => {
    let a = JSON.parse(localStorage.getItem('personal'));
    let b = JSON.parse(localStorage.getItem('timeline'));

    if (a && b) {
      setPersonal(a)
      setTimeline(b)
    } else {
      setTimeline([]);
      setPersonal(defaultPersonal);
    }
  }

  useEffect(() => {
    if (personal !== defaultPersonal) {
      saveLocal();
    }
  }, [timeline, personal, defaultPersonal, saveLocal])

  useEffect(() => {
    getLocal();
  }, [])

  return (
    <div className='big'>
        <div className='head'>
          <h1 className='text2'>COVID Timeline Generator</h1>
        </div>
        <div className='grid'>
          <div>
          <Form setPersonal={setPersonal} timeline={timeline} setTimeline={setTimeline} sorting={sorting}/>
          </div>
          {timeline.length ? renderTimeline() : renderEmptyTimeline()}
        </div>
    </div>
  );
}

export default App;
