import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Calculator from './components/Calculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>JavaScript Calculator</h1>
      <Calculator />
    </div>
  )
}

export default App
