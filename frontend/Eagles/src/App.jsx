// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import eagle_logo from './assets/images/eagle_logo.png';
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="#" target="_blank">
          <img src={eagle_logo} className="logo" alt="Eagle logo" />
        </a>

      </div>
      <h1>BU Academic Navigator</h1>
      <h1>It is BUAN chatbot</h1>
      <p className="read-the-docs">Your own chat buddy</p>
    </>
  )
}

export default App
