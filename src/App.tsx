import React, { useEffect, useState } from 'react';
import './App.css'
function App() {
  const [status, setStatus] = useState<1 | 0 | 2>(2)

  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setStatus(1)
        } else {
          setStatus(0)
        }
      })
      .catch(e => {
        setStatus(0)
        console.log(e)
      })
  })

  return (
    <div className='container'>
      <h1>Приложение "Менеджер задач" запущено!</h1>
     <div className='flex'>
     <p>Статус сервера:</p>
      {
        !status ? <div className='error'></div> :
          status === 1 ? <div className='ok'></div> :
            <div className='panding'></div>
      }
     </div>
    </div>
  );
}

export default App;
