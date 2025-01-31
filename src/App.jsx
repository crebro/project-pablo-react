import { Link } from 'react-router'
import './App.css'

function App() {
  return (
    <>
      <div>
        <div className='text-7xl font-bold' >
          Choose an Interface
        </div>

        <Link to={'/blockprogramming'}> Begin Block Programming </Link>
      </div>
    </>
  )
}

export default App
