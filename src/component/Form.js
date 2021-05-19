import React, { useState } from "react";
import "bulma/css/bulma.css";
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import "./Form.css";

function Form({ setPersonal, timeline, setTimeline, sorting }) {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [career, setCareer] = useState("");
  const [detail, setDetail] = useState("");
  const [datetime, setDatetime] = useState("");
  

  const handleSubmit = (inputDate, timer) => {
    let personalInformation = [
        {
            gender: gender,
            age: age,
            career: career
        }
    ];

    setPersonal(personalInformation);

    if (timeline.length) {
        const [filter] = timeline.filter((day) => day.date === inputDate);
        
        if (filter) {
            const results = timeline.map((day) => {
                if (day.date === inputDate) {
                    const [filter2] = day.information.filter((info) => info.time === timer)
                    if (filter2) {
                        const result2 = day.information.map((info) => {
                            if (info.time === timer) {
                                info.detail = detail;
                            }
                            return info;
                        })
                        day.information = result2;
                    } else {
                        day.information = [...day.information, { time: timer, detail: detail }]
                    }
                }
                return day;
            })
            sorting(results)
        } else {
            console.log('เข้ามาทำก้อนนี้')
            const tempTimeline = [...timeline];
            tempTimeline.push({
                date: inputDate,
                information: [
                    {
                        time: timer,
                        detail: detail,
                    },
                ]
            })
            sorting(tempTimeline)
        }
    } else {
        let data = [
            {
                date: inputDate,
                information: [
                    {
                        time: timer,
                        detail: detail
                    },
                ]
            }
        ]; 
        setTimeline(data)
        console.log(timeline);
    }
  }
  

  return (
    <div>
      <div className="container2">
        <div className="container3">
          <div>
            <h2 className="h2">ข้อมูลผู้ป่วย</h2>
          </div>
          <div className="container5">
              <div>
                <div>
                <h3 className="h3">เพศ</h3>
                </div>
                <div className="select is-primary">
                <select onChange={(value) => setGender(value.target.value)}>
                    <option defaultValue="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                    <option value="ไม่ระบุ">ไม่ระบุ</option>
                </select>
                </div>
              </div>
              <div>
                <div>
                <h3 className="h3">อายุ</h3>
                </div>
                <div className="control">
                <input
                    className="input"
                    type="numeric"
                    placeholder="อายุ"
                    onChange={(value) => setAge(value.target.value)}
                />
                </div>
              </div>
          </div>

          <div>
            <h3 className="h3">อาชีพ</h3>
          </div>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="อาชีพ"
              onChange={(value) => setCareer(value.target.value)}
            />
          </div>
        </div>

        <div className="container4">
          <div>
            <h2 className="h2">ข้อมูลไทม์ไลน์</h2>
          </div>
          <div>
            <h3 className="h3">วันเวลา</h3>
          </div>
          <div className="control">
            <input
              className="input"
              type="datetime-local"
              onChange={(value) => setDatetime(value.target.value)}
            />
          </div>
          <div>
            <h3 className="h3">รายละเอียด</h3>
          </div>
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                placeholder="รายละเอียด"
                onChange={(value) => setDetail(value.target.value)}
              ></textarea>
            </div>
          </div>
          <div>
            <button className="button is-warning" onClick={() => handleSubmit(datetime.slice(0, 10),
            datetime.slice(11, 16))}>+ เพิ่มข้อมูล</button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
