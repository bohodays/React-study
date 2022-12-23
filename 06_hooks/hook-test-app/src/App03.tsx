import React, { useState } from 'react'
import Clock from './Clock'

const App = () => {
  const [formatString, setFormatString] = useState<string>("HH:mm:ss");
  const [clockVisible, setClockVisible] = useState<boolean>(false);

  return (
    <div className='boxStyle'>
      <h2>간단한 시계</h2>
      <button onClick={() => setClockVisible(!clockVisible)}>
        시계 토글하기
      </button>
      <hr />
      {clockVisible ? <Clock formatString={formatString} /> : ""}
    </div>
  )
}

export default App